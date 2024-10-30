import { defineStore } from 'pinia'

interface State {
    utmParameters: UtmParameters
    gclid: string | null
}

export const useMarketingStore = defineStore('marketing', {
    state: (): State => ({
        utmParameters: {},
        gclid: null
    }),
    actions: {
        hasUtmParameters(): boolean {
            return Object.keys(this.utmParameters).length > 0
        }
    }
})
