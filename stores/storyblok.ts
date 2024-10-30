import { defineStore } from 'pinia'
import type {
    TemplateLocationStoryblok,
    TemplateUniversityStoryblok,
    TemplatePropertyStoryblok,
    TemplateRoomStoryblok,
    MetaGlobalOptionsStoryblok,
    AtomCallToActionStoryblok
} from '@/types/storyblok-component-types'
import type { RuntimeConfig } from 'nuxt/schema'

// TS Interfaces & Types

type EnvType = 'published' | 'draft'

interface State {
    currentStory: AllTypes | null
    currentStoryRooms: {
        [key: string]: TemplateRoomStoryblok[]
    }
    currentRoomsActiveFilters: RoomFiltersActive
    currentSortOrder: null | string
    roomPagination: {
        currentPage: number
        currentRoomsAvailableTotal: number | null
    }
    recentlyViewedRoomsIdArray: string[]
    recentlyViewedRooms: TemplateRoomStoryblok[] | null
    allLocations: TemplateLocationStoryblok[] | null
    allUniversities: TemplateUniversityStoryblok[] | null
    allProperties: TemplatePropertyStoryblok[] | null
    globalOptions: MetaGlobalOptionsStoryblok | null
    dataLoaded: boolean
    dataIsLoading: boolean
    firstLoad: boolean
    isSearchingRooms: boolean
}

// Define a minimal type for $storyblokClient
interface StoryblokClient {
    get: (path: string, params?: any) => Promise<any>
}

interface NuxtApp {
    $storyblokClient: StoryblokClient
}

// Consts

const MAX_PREVIOUSLY_VIEWED_ROOMS = 4

export const useStoryblokStore = defineStore('storyblok', {
    state: (): State => ({
        currentStory: null,
        currentStoryRooms: {},
        currentRoomsActiveFilters: {
            bedrooms: null,
            furnished: null
        },
        currentSortOrder: null,
        roomPagination: {
            currentPage: 1,
            currentRoomsAvailableTotal: null
        },
        recentlyViewedRoomsIdArray: [],
        recentlyViewedRooms: null,
        allLocations: null,
        allUniversities: null,
        allProperties: null,
        globalOptions: null,
        dataLoaded: false,
        dataIsLoading: false,
        firstLoad: true,
        isSearchingRooms: false
    }),
    getters: {
        getCurrentStory(state): AllTypes | null {
            return state.currentStory
        },
        getCurrentStoryContent(state): AllTypes | null {
            return state.currentStory?.content
        },
        getCurrentStoryMeta(state): StoryRoomMetaData | null {
            return state.currentStory?.content.everest_data
        },
        getCurrentStorySeoMetaTags(state): MetaTags | null {
            return state.currentStory?.content.metaTags
        },
        getAllLocations(): TemplateLocationStoryblok[] | null {
            return this.allLocations
        },
        getAllProperties(): TemplatePropertyStoryblok[] | null {
            return this.allProperties
        },
        getCurrentLocation(): TemplateLocationStoryblok | null {
            return (
                this.allLocations?.find(
                    (location: TemplateLocationStoryblok): boolean =>
                        location.slug === this.currentStory?.slug
                ) || null
            )
        },
        getGlobalOptions(state): MetaGlobalOptionsStoryblok | null {
            return state.globalOptions
        },
        getActiveFilters(state): RoomFiltersActive {
            return state.currentRoomsActiveFilters
        },
        getPagesNav(state): AllTypes[] | null {
            return state.globalOptions?.content.pagesNavigation
        },
        getSocialLinks(state): AtomCallToActionStoryblok[] | null {
            return state.globalOptions?.content.socialLinks
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
                throw new Error('Story not found')
            }
        },
        async fetchAllLocations(): Promise<void> {
            try {
                const response = await this.fetchStoryblokData('cdn/stories', {
                    starts_with: 'locations',
                    sort_by: 'name:asc',
                    is_startpage: true,
                    level: 2
                })

                // Get all properties, universities, and rooms to match with locations
                const [allProperties, allUniversities] = (await Promise.all([
                    this.fetchAllProperties(),
                    this.fetchAllUniversities()
                ])) as [
                    TemplatePropertyStoryblok[] | null,
                    TemplateUniversityStoryblok[] | null
                ]

                this.allLocations = response.data?.stories.map(
                    (location: TemplateLocationStoryblok) => {
                        const properties:
                            | TemplatePropertyStoryblok[]
                            | undefined = allProperties?.filter(
                            (property: TemplatePropertyStoryblok) =>
                                property.full_slug.includes(location.slug)
                        )

                        const universities:
                            | TemplateUniversityStoryblok[]
                            | undefined = allUniversities?.filter(
                            (uni: TemplateUniversityStoryblok) =>
                                uni.content.location.slug === location.slug
                        )

                        return {
                            ...location,
                            properties,
                            universities
                        }
                    }
                )
            } catch (error) {
                throw error
            }
        },
        async fetchAllProperties(): Promise<
            TemplatePropertyStoryblok[] | null
        > {
            try {
                const response = await this.fetchStoryblokData('cdn/stories', {
                    content_type: 'templateProperty',
                    sort_by: 'name:asc',
                    resolve_relations: [
                        'templateProperty.universityDistances',
                        'atomUniversityDistances.university'
                    ]
                })
                this.allProperties = response.data?.stories
                return this.allProperties
            } catch (error) {
                throw error
            }
        },
        async fetchAllUniversities(): Promise<
            TemplateUniversityStoryblok[] | null
        > {
            try {
                const response = await this.fetchStoryblokData('cdn/stories', {
                    content_type: 'templateUniversity',
                    sort_by: 'name:asc',
                    level: 2,
                    resolve_relations: ['templateUniversity.location']
                })
                this.allUniversities = response.data?.stories
                return this.allUniversities
            } catch (error) {
                throw error
            }
        },

        async fetchGlobalOptions(): Promise<void> {
            const config: RuntimeConfig = useRuntimeConfig()
            try {
                const response = await this.fetchStoryblokData(
                    `cdn/stories/${config.public.STORYBLOK_GLOBAL_OPTIONS_ID}`,
                    {
                        resolve_relations: [
                            'metaGlobalOptions.notificationCentreLink',
                            'metaGlobalOptions.pagesNavigation'
                        ]
                    }
                )
                this.globalOptions = response.data?.story
            } catch (error) {
                throw error
            }
        },
        async fetchRooms(page?: number, per_page?: number): Promise<void> {
            this.isSearchingRooms = true

            const runtimeConfig = useRuntimeConfig()

            // Let's figure out from the route what level we are grabbing data from
            const route = useRoute()

            const fullPath = `/locations/${route.params.location}${route.params.property ? `/${route.params.property}` : ''}`

            const location = route.params.location
            const property = route.params.property

            let slugs
            if (property) {
                slugs = `locations/${location}/${property}/*`
            } else {
                slugs = `locations/${location}/**/*`
            }

            const roomFetchQuery = {
                'everest_data.presented.bedrooms': {
                    in: this.currentRoomsActiveFilters.bedrooms ?? null
                },
                'everest_data.furnished': {
                    in: this.currentRoomsActiveFilters.furnished ?? null
                }
            }

            const sortQuery = (): string | null => {
                if (this.currentSortOrder === 'Price Ascending') {
                    return 'content.everest_data.market_rent:asc:int'
                }
                if (this.currentSortOrder === 'Price Descending') {
                    return 'content.everest_data.market_rent:desc:int'
                }
                if (this.currentSortOrder === 'Size Ascending') {
                    return 'content.everest_data.size:asc:int'
                }
                if (this.currentSortOrder === 'Size Descending') {
                    return 'content.everest_data.size:desc:int'
                }
                return 'name:asc'
            }

            try {
                const response = await this.fetchStoryblokData('cdn/stories', {
                    content_type: 'templateRoom',
                    per_page:
                        per_page || runtimeConfig.public.ROOM_RESULTS_PER_PAGE,
                    page: page || 1,
                    by_slugs: slugs,
                    excluding_slugs: this.currentStory?.full_slug,
                    filter_query: roomFetchQuery ?? {},
                    sort_by: sortQuery()
                })

                this.roomPagination.currentRoomsAvailableTotal = response.total
                this.roomPagination.currentPage = page || 1

                this.currentStoryRooms[fullPath] = response.data?.stories

                this.isSearchingRooms = false
            } catch (error) {
                this.isSearchingRooms = false
                throw error
            }
        },

        // Fetches required data once in app.vue
        async fetchRequired(): Promise<void> {
            await this.fetchGlobalOptions()
            await this.fetchAllProperties()
            await this.fetchAllLocations()
            await this.fetchAllUniversities()
        },
        // This adds previously viewed rooms to the store
        // so they can be displayed when a user comes back to the site
        // Caps out at MAX_PREVIOUSLY_VIEWED_ROOMS
        addCurrentRoomToRecentlyViewed(roomId: string): void {
            if (
                !this.recentlyViewedRoomsIdArray.find(
                    (r: string): boolean => r === this.currentStory?.id
                )
            ) {
                if (
                    this.recentlyViewedRoomsIdArray.length >=
                    MAX_PREVIOUSLY_VIEWED_ROOMS
                ) {
                    this.recentlyViewedRoomsIdArray.pop()
                }
                this.recentlyViewedRoomsIdArray.unshift(roomId)
            }
        },
        async fetchRecentlyViewedRooms(): Promise<void> {
            try {
                const rooms: TemplateRoomStoryblok[] = await Promise.all(
                    this.recentlyViewedRoomsIdArray.map(async (id: string) => {
                        try {
                            return await this.fetchStoryblokData(
                                `cdn/stories/${id}`
                            )
                        } catch (error) {
                            // Remove the ID from the array if there's an error
                            this.recentlyViewedRoomsIdArray =
                                this.recentlyViewedRoomsIdArray.filter(
                                    (roomId) => roomId !== id
                                )
                            throw error // Re-throw the error to handle it in the outer catch block
                        }
                    })
                )
                this.recentlyViewedRooms = rooms.map(
                    (room: TemplateRoomStoryblok) =>
                        room.data.story as TemplateRoomStoryblok
                )
            } catch (error) {
                // Handle the error if needed
                console.error('Sorry, this room is no longer available.', error)
            }
        },
        resetRoomFilters(): void {
            this.currentRoomsActiveFilters = {
                bedrooms: null,
                bathrooms: null,
                type: null,
                academic_years: null,
                furnished: null
            }
        }
    },
    persist: {
        paths: ['recentlyViewedRoomsIdArray']
    }
})
