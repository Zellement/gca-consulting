/**
 * This event handler fetches a single story from Storyblok
 * based on the provided path in the query parameters.
 *
 * If you need to fetch multiple stories, you can prefix the
 * path with $.
 *
 * @param {H3Event} event - The event object
 * @returns {StoryData | void} The fetched story data or an error
 * @throws {Error} If the Storyblok access token is not provided
 * @throws {Error} If the Storyblok API plugin is not initialised
 * @throws {Error} If the path is not provided
 * @throws {Error} If the Storyblok API request fails
 */

import type { ISbResult } from '@storyblok/js'
import { H3Event, getQuery, sendError } from 'h3'
import type { QueryObject, QueryValue } from 'ufo'
import { useStoryblokUtils } from '~/composables/useStoryblokUtils'

export default defineEventHandler(async (event: H3Event): Promise<any> => {
    const config = useRuntimeConfig()
    const storyblokApi = useStoryblokUtils().initStoryBlokApi(config)
    const query: QueryObject = getQuery(event)

    // Extract the path from the query and remove the leading slash
    const originPath = query.path as string
    let path: string = originPath.replace(/^\//, '')

    // Parse filter_query if it is a string; helps filter the Storyblok data
    if (typeof query['filter_query'] === 'string') {
        try {
            query['filter_query'] = JSON.parse(query['filter_query'])
        } catch {
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    statusMessage: 'Invalid filter_query format',
                    fatal: true
                })
            )
        }
    }

    const options: QueryValue | QueryValue[] = Object.fromEntries(
        Object.entries(query).filter(([key]): boolean => key !== 'path')
    )

    if (!path) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'Path is required'
            })
        )
    }

    // If the path starts with '$', empty it (indicates fetching multiple stories)
    if (path.startsWith('$')) path = ''

    try {
        const response: ISbResult = await storyblokApi.get(
            `cdn/stories/${path}`,
            {
                ...options
            }
        )

        const storyData = response.data?.stories || response.data?.story

        setHeader(
            event,
            'Cache-Control',
            'public, max-age=300, stale-while-revalidate=60'
        )
        return { stories: storyData, meta: response.headers }
    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: error.status ?? 500,
                statusMessage: error.response || 'Internal Server Error',
                fatal: true
            })
        )
    }
})
