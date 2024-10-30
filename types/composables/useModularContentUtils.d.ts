declare module '~/composables/useModularContentUtils' {
    interface ComponentInfo {
        component: Component
        clientOnly: boolean
    }

    type RetrieveComponent = {
        [key: string]: {
            component: typeof KitchenSink
            clientOnly: boolean
        }
    }

    export const useModularContentUtils: () => {
        retrieveComponent: RetrieveComponent
    }
}
