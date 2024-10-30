import { useStoryblokStore } from '@/stores/storyblok'

import type {
    CategoryJournalStoryblok,
    MetaGlobalOptionsStoryblok,
    TemplateJournalStoryblok,
    TemplatePropertyStoryblok,
    TemplateRoomStoryblok,
    TemplateUniversityStoryblok
} from '~/types/storyblok-component-types'

import type { RouteLocationNormalized } from 'vue-router'

type AllTypes =
    | TemplatePropertyStoryblok
    | TemplateUniversityStoryblok
    | TemplateRoomStoryblok
    | TemplateJournalStoryblok
    | CategoryJournalStoryblok
    | MetaGlobalOptionsStoryblok

export default defineNuxtRouteMiddleware(
    async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized
    ): Promise<void> => {
        const storyblokStore = useStoryblokStore()
        const ANIMATION_DELAY: number = 300

        const path: string = to.path === '/' ? 'home' : to.path

        if (!storyblokStore.firstLoad) {
            //stops second load after ssr
            if (from.fullPath === to.fullPath) return
            setTimeout(async (): Promise<void> => {
                return await storyblokStore.fetchStory(path)
            }, ANIMATION_DELAY)
        } else {
            return await storyblokStore.fetchStory(path)
        }

        const entryData: ComputedRef<AllTypes | null> = computed(() => {
            return storyblokStore.currentStory
        })
        if (!entryData.value) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Page Not Found',
                fatal: true
            })
        }
    }
)
