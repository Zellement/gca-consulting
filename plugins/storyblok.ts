import type { RuntimeConfig } from 'nuxt/schema'
import { storyblokInit, apiPlugin } from '@storyblok/js'

export default defineNuxtPlugin((nuxtApp) => {
    const config: RuntimeConfig = useRuntimeConfig()

    const { storyblokApi } = storyblokInit({
        accessToken: config.public.STORYBLOK_ACCESS_TOKEN as string,
        use: [apiPlugin]
    })

    nuxtApp.provide('storyblokClient', storyblokApi)
})
