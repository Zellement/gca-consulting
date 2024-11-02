import { defineStore } from 'pinia'

type BooleanKeys<T> = {
    [K in keyof T]: T[K] extends boolean ? K : never
}[keyof T]

interface State {
    showMobileNav: boolean
    animationsDisabled: boolean
    pageIsLoading: boolean
    pageHasLoaded: boolean
}

export const useUiStore = defineStore('ui', {
    state: (): State => ({
        showMobileNav: false,
        animationsDisabled: false,
        pageIsLoading: true,
        pageHasLoaded: false
    }),
    actions: {
        toggleBoolean(
            propertyName: BooleanKeys<State>,
            visible?: boolean
        ): void {
            visible = visible ?? !this[propertyName]
            this[propertyName] = visible
        }
    }
})
