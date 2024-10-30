import KitchenSink from '@blocks/KitchenSink.vue'
import type { RetrieveComponent } from '~/composables/useModularContentUtils'

export const useModularContentUtils = (): {
    retrieveComponent: RetrieveComponent
} => {
    const retrieveComponent: RetrieveComponent = {
        KitchenSink: {
            component: KitchenSink,
            clientOnly: false
        }
    }
    return {
        retrieveComponent
    }
}
