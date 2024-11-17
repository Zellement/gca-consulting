import { defineStore } from 'pinia'
import type { MetaGlobalOptionsStoryblok } from '@/types/storyblok-component-types'
import type { RuntimeConfig } from 'nuxt/schema'

// TS Interfaces & Types

type EnvType = 'published' | 'draft'

interface State {
    currentStory: AllTypes | null
    globalOptions: MetaGlobalOptionsStoryblok | null
    locations: AllTypes | null
    dataLoaded: boolean
    dataIsLoading: boolean
    firstLoad: boolean
}

// Define a minimal type for $storyblokClient
interface StoryblokClient {
    get: (path: string, params?: any) => Promise<any>
}

interface NuxtApp {
    $storyblokClient: StoryblokClient
}

// Consts

export const useStoryblokStore = defineStore('storyblok', {
    state: (): State => ({
        currentStory: null,
        globalOptions: null,
        locations: null,
        dataLoaded: false,
        dataIsLoading: false,
        firstLoad: true
    }),
    getters: {
        getCurrentStory(state): AllTypes | null {
            return state.currentStory
        },
        getCurrentStoryContent(state): AllTypes | null {
            return state.currentStory?.content
        },
        getGlobalOptionsContent(state): MetaGlobalOptionsStoryblok | null {
            return state.globalOptions?.content
        }
    },
    actions: {
        async fetchStoryblokData(
            fullPath: string,
            options?: any
        ): Promise<any> {
            const nuxtApp: NuxtApp = useNuxtApp() as unknown as NuxtApp
            const $storyblokClient: StoryblokClient = nuxtApp.$storyblokClient
            const config: RuntimeConfig = useRuntimeConfig()
            try {
                const response = await $storyblokClient.get(fullPath, {
                    version: config.public.STORYBLOK_ENV as EnvType,
                    ...options
                })
                if (!response.data) {
                    throw new Error('No data')
                }
                return response
            } catch (error: any) {
                console.log(error)
                throw new Error('Story not found')
            }
        },
        async fetchStory(queryParam: string): Promise<void> {
            this.dataIsLoading = true
            this.dataLoaded = false
            try {
                const response = await this.fetchStoryblokData(
                    `cdn/stories/${queryParam}`,
                    {
                        resolve_links: 'url',
                        resolve_relations: [
                            'atomTestimonials.testimonials',
                            'templateJournal.categories',
                            'templateJournal.author'
                        ]
                    }
                )

                this.currentStory = response.data?.story
                this.dataLoaded = true
                this.dataIsLoading = false
                this.firstLoad = false
            } catch (error) {
                console.log(error)
                throw new Error('Story not found')
            }
        },

        async fetchGlobalOptions(): Promise<void> {
            const config: RuntimeConfig = useRuntimeConfig()
            try {
                const response = await this.fetchStoryblokData(
                    `cdn/stories/${config.public.STORYBLOK_GLOBAL_OPTIONS_ID}`,
                    {
                        resolve_relations: ['metaGlobalOptions.socialLinks']
                    }
                )
                this.globalOptions = response.data?.story
            } catch (error) {
                throw error
            }
        },

        async fetchLocations(): Promise<void> {
            try {
                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'templateLocation'
                })
                this.locations = response.data?.stories
            } catch (error) {
                throw error
            }
        },

        // Fetches required data once in app.vue
        async fetchRequired(): Promise<void> {
            await this.fetchGlobalOptions()
            await this.fetchLocations()
        }
    }
})
