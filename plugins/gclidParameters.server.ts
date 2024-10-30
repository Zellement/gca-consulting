/**
 * This plugin is used to extract GCLID parameter from the query string of the current route and set them in the marketing store.
 *
 * GCLID is a Google Click Identifier that is used to track conversions from Google Ads.
 */

import type { LocationQueryValue, RouteLocationNormalized } from 'vue-router'

export default defineNuxtPlugin(async (): Promise<void> => {
    const route: RouteLocationNormalized = useRoute()
    const marketingStore = useMarketingStore()

    //if marketingStore.gclid is already set (not null), don't do anything
    if (marketingStore.gclid) return

    //Get the gclid value from the route query
    const gclid: LocationQueryValue | LocationQueryValue[] = route.query.gclid

    //If no gclid is found, do nothing
    if (!gclid) return

    //Set the gclid in the marketing store
    marketingStore.gclid = gclid as string
})
