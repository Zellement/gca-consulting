import { defineStore } from 'pinia'
import type { RuntimeConfig } from 'nuxt/schema'

// TS Interfaces & Types

type EnvType = 'published' | 'draft'

interface State {
    currentStory: AllTypes | null
    globalOptions: MetaGlobalOptionsStoryblok | null
    locations: TemplateLocationStoryblok[] | null
    news: TemplateNewsStoryblok[] | null
    reviews: DataSingleReviewStoryblok[] | null

    // Booleans
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
        news: null,
        reviews: null,
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
        },
        getCurrentStorySeoMetaTags(state): MetaTags | null {
            return {
                title:
                    state.currentStory?.content?.metaTitle ||
                    state.currentStory?.name,
                description: state.currentStory?.content?.metaDescription || '',
                og_title: state.currentStory?.content?.metaTitle || '',
                og_description:
                    state.currentStory?.content?.metaDescription || '',
                og_image: state.currentStory?.content?.image || ''
            }
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
                        resolve_relations: [
                            'sectionCardBlock.cards',
                            'sectionCardCarousel.cards',
                            'sectionReviewBlock.reviews'
                        ],
                        resolve_links: 'story'
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
                        resolve_relations: [
                            'metaGlobalOptions.socialLinks',
                            'dataNavCategory.titlePage',
                            'dataNavCategory.subPages'
                        ]
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

        async fetchNews(): Promise<void> {
            try {
                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'templateNews',
                    per_page: 12
                })
                this.news = response.data?.stories
            } catch (error) {
                throw error
            }
        },

        async fetchReviews(): Promise<void> {
            try {
                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'dataSingleReview'
                })
                this.reviews = response.data?.stories
            } catch (error) {
                throw error
            }
        },

        // Fetches required data once in app.vue
        async fetchRequired(): Promise<void> {
            await this.fetchGlobalOptions()
            await this.fetchLocations()
            await this.fetchNews()
            await this.fetchReviews()
        }
    }
})
