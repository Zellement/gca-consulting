/**
 * This plugin is used to extract UTM parameters from the query string of the current route and set them in the marketing store.
 *
 * UTM parameters are used to track the effectiveness of marketing campaigns in Google Analytics.
 *
 * TODO: change this to use the new vue-utils package, which needs implementing on the boilerplate.
 */

import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtPlugin(async (): Promise<void> => {
    const route: RouteLocationNormalized = useRoute()
    const marketingStore = useMarketingStore()

    //if marketingStore.utmParameters has any values, don't do anything
    if (marketingStore.hasUtmParameters()) return

    //Get the parameters from the route query
    const utmParameters = Object.fromEntries(
        Object.entries(route.query).filter(([key]) => key.startsWith('utm_'))
    )

    //Check if any utm parameters are found
    const utmParametersFound: boolean = Object.keys(utmParameters).length > 0

    //If no utm parameters are found, do nothing
    if (!utmParametersFound) return

    //Set the utm parameters in the marketing store
    marketingStore.utmParameters = utmParameters as UtmParameters
})
