import type { RuntimeConfig } from 'nuxt/schema'
import type { SbInitResult } from '@storyblok/js'
import { apiPlugin, storyblokInit } from '@storyblok/js'

interface StoryblokUtils {
    initStoryBlokApi: (config: RuntimeConfig) => any
    runTempData: () => void
    formatNavItems: (navItems: DataNavItemStoryblok[]) => NavItem[]
    getVersion: () => 'draft' | 'published'
}

export function useStoryblokUtils(): StoryblokUtils {
    /**
     * Initializes the Storyblok API client with the provided configuration.
     *
     * @param {RuntimeConfig} config - The runtime configuration containing the Storyblok access token
     * @returns {any} The initialized Storyblok API client
     * @throws {Error} If the Storyblok access token is not provided
     * @throws {Error} If the Storyblok API plugin fails to initialize
     */
    const initStoryBlokApi = (config: RuntimeConfig) => {
        const accessToken: string = config.STORYBLOK_ACCESS_TOKEN ?? ''

        if (!accessToken) {
            throw new Error('Storyblok access token is required')
        }

        // Initialize Storyblok with the API plugin
        const { storyblokApi }: SbInitResult = storyblokInit({
            accessToken: accessToken,
            use: [apiPlugin],
            apiOptions: {
                cache: {
                    type: 'memory'
                }
            }
        })

        // If the Storyblok API plugin is not initialized, throw an error
        if (!storyblokApi) {
            throw new Error(
                'Storyblok API initialisation failed. Please check your access token.'
            )
        }

        return storyblokApi
    }

    /**
     * Updates the data in the Storyblok store with the temporary data that
     * has already been fetched prior to the page transitions.
     *
     * This avoids issues with content being applied before the page fades out.
     */
    const runTempData = (): void => {
        const storyblokStore = useStoryblokStore()

        if (storyblokStore.tempCurrentStory) {
            storyblokStore.currentStory = storyblokStore.tempCurrentStory

            // Clear the temporary state ready for new data
            storyblokStore.tempCurrentStory = null
        }

        if (storyblokStore.tempUnitsCollection) {
            storyblokStore.units = storyblokStore.tempUnitsCollection[0]
            storyblokStore.totalUnits = storyblokStore.tempUnitsCollection[1]

            storyblokStore.totalPages =
                storyblokStore.totalUnits / storyblokStore.perPage

            // Clear the temporary state ready for new data
            storyblokStore.tempUnitsCollection = null
        }

        if (storyblokStore.tempJournalsCollection) {
            storyblokStore.journals = storyblokStore.tempJournalsCollection[0]
            storyblokStore.totalJournals =
                storyblokStore.tempJournalsCollection[1]

            storyblokStore.totalPages =
                storyblokStore.totalJournals / storyblokStore.perPage

            // Clear the temporary state ready for new data
            storyblokStore.tempJournalsCollection = null
        }
    }

    /**
     * Formats the navigation items from storyblok to a more usable format.
     * @param navItems
     */
    const formatNavItems = (navItems: DataNavItemStoryblok[]): NavItem[] => {
        if (!navItems || navItems.length === 0) return []

        return navItems.map((item: DataNavItemStoryblok) => ({
            label: item.name || item.text,
            url:
                item.content?.link.url ||
                item.content?.link.cached_url ||
                item.link.url ||
                item.link.cached_url,
            description: item.content?.description || '',
            target: item.content?.link.target || '_self',
            key: item.uuid || item._uid
        }))
    }

    /**
     * Gets the current version of the Storyblok content (.e.g published or draft)
     * @returns {string} The current version of the Storyblok content.
     */
    const getVersion = (): 'draft' | 'published' => {
        // Check if we're on a Storyblok-friendly link (e.g. /somepage?_storyblok=id1234)
        const { $preview } = useNuxtApp()
        const config = useRuntimeConfig()

        // Let's see what the env has too
        const envOption =
            config.public.STORYBLOK_ENV === 'published' ? 'published' : 'draft'
        // If we're on Storyblok (i.e. $preview is true), return draft, else revert to the env option
        return $preview ? 'draft' : envOption
    }

    return {
        runTempData,
        initStoryBlokApi,
        formatNavItems,
        getVersion
    }
}
