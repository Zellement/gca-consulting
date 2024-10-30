/**
 * This plugin checks if the user's browser or device is set to reduce motion or if the user agent is a bot. If either of these conditions is met, the plugin sets the animationsDisabled property in the UI store to true.
 *
 * This store property can then be used to disable animations in the application where necessary.
 */

import { useServerUtils } from '@/composables/useServerUtils'
import { useUiStore } from '@/stores/ui'

const { checkUserAgent } = useServerUtils()

export default defineNuxtPlugin((nuxtApp): void => {
    const uiStore = useUiStore()

    if (import.meta.server) {
        //Gets user agent from the server request headers
        const agent: string =
            nuxtApp.ssrContext?.event?.node.req.headers['user-agent'] || ''

        if (checkUserAgent(agent)) {
            uiStore.animationsDisabled = true
        }
    }

    if (import.meta.client || import.meta.browser) {
        const userPrefersReducedMotion: MediaQueryList = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        )

        //gets user agent from the browser
        const agent: string = navigator.userAgent

        //Checks if the user prefers reduced motion
        if (userPrefersReducedMotion.matches || checkUserAgent(agent)) {
            uiStore.animationsDisabled = true
        }
    }
})
