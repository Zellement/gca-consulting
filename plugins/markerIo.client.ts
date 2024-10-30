import type { MarkerSdk } from '@marker.io/browser'
import type { RuntimeConfig } from 'nuxt/schema'
import { useServerUtils } from '@/composables/useServerUtils'

const { checkUserAgent } = useServerUtils()

export default defineNuxtPlugin(async () => {
    if (checkUserAgent(navigator.userAgent)) {
        return
    }

    const config: RuntimeConfig = useRuntimeConfig()
    const markerWidget = ref<MarkerSdk | null>(null)
    if (
        config.public.MARKER_ENABLED &&
        config.public.MARKER_ENABLED === 'true'
    ) {
        const module = await import('@marker.io/browser')
        markerWidget.value = await module.default.loadWidget({
            destination: config.public.MARKER_ID
        })
    }
})
