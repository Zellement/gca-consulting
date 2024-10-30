const { slugToTitle } = useStringUtils()
import type { RouteLocationNormalized, RouteParamsGeneric } from 'vue-router'

export const useGtmUtils = () => {
    const trackEvent = (options: Record<string, unknown>): void => {
        //only run on client side
        if (!import.meta.client) return

        //dont run if gtm is not defined
        if (!window.dataLayer) return

        const dataLayerArray: any[] = window.dataLayer

        //get marketing consent flag from datalayer
        const consentGiven: boolean = dataLayerArray.find(
            (item: Record<string, unknown>): boolean =>
                item.event === 'cookie_consent_marketing'
        )
        //don't run if consent is not given
        if (!consentGiven) {
            return
        }

        //push event to dataLayer
        window.dataLayer.push({
            ...options
        })
    }

    //get content group from path
    const getContentGroup = (to: RouteLocationNormalized): string => {
        const params: RouteParamsGeneric = to.params

        if (!params || to.path === '/') {
            return ''
        }

        //check if params has room key
        if (params.room) {
            return 'room'
        }

        //check if params has property key
        if (params.property) {
            return 'property'
        }

        //check if params has city key
        if (params.location) {
            return 'city'
        }

        //check if params has any other key
        if (params.slug) {
            return params.slug[0]
        }

        return String(to.name || '')
    }

    const getPageTitleFromPath = (path: string): string => {
        //check if homepage
        if (path === '/') {
            return 'Home'
        }

        //get path and split it.
        const pathArray: string[] = path.split('/')

        //remove key with empty values from pathArray
        pathArray.forEach((value: string, index: number): void => {
            if (value === '') {
                pathArray.splice(index, 1)
            }
        })

        const lastSegment: string = slugToTitle(pathArray[pathArray.length - 1])

        if (lastSegment.includes('Room ')) {
            const secondToLastSegment: string = slugToTitle(
                pathArray[pathArray.length - 2]
            )
            return `${lastSegment} | ${secondToLastSegment}`
        }

        return lastSegment
    }

    return {
        trackEvent,
        getContentGroup,
        getPageTitleFromPath
    }
}
