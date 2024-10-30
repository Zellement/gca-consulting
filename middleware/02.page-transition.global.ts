import { useUiStore } from '@/stores/ui'
import { useStoryblokStore } from '@/stores/storyblok'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

//Stops the middleware from running more than once
let runOnce = false

export default defineNuxtRouteMiddleware((): void => {
    const uiStore = useUiStore()
    const timer1: number = 500
    const timer2: number = 700
    const timer3: number = 600
    const timer4: number = 800

    const storyblokStore = useStoryblokStore()
    const router = useRouter()

    const waitForDataLoaded = (): Promise<void> => {
        return new Promise((resolve) => {
            const checkDataLoaded = () => {
                if (storyblokStore.dataLoaded) {
                    resolve()
                } else {
                    setTimeout(checkDataLoaded, timer1)
                }
            }
            checkDataLoaded()
        })
    }

    if (!runOnce) {
        router.beforeEach(
            (
                to: RouteLocationNormalized,
                from: RouteLocationNormalized,
                next: NavigationGuardNext
            ): void => {
                // Check if paths match. The paths match when the user lands on the page from an external source or when the page is refreshed. We want the transition to run in these cases.
                const pathsMatch: boolean = to.path === from.path
                const isToJournalIndex: boolean =
                    !pathsMatch && to.path === '/journal'
                const isFromJournalIndex: boolean =
                    !pathsMatch && from.path === '/journal'
                const isToJournalCategory: boolean =
                    !pathsMatch && to.path.includes('journal-categories')
                const isFromJournalCategory: boolean =
                    !pathsMatch && from.path.includes('journal-categories')

                const skipTransition: boolean =
                    (isFromJournalIndex && isToJournalCategory) ||
                    (isToJournalCategory && isFromJournalCategory) ||
                    (isToJournalIndex && isFromJournalCategory)

                if (!skipTransition) {
                    // Don't change pageIsLoading if the user is navigating between journal categories.
                    // This is so the page transition panels don't appear.
                    uiStore.pageIsLoading = true
                }
                uiStore.pageHasLoaded = false

                // Change timer based on if the transition is being skipped
                const timerToMatchTransition = skipTransition ? timer1 : timer2

                waitForDataLoaded().then(() => {
                    setTimeout(() => {
                        // Scroll to top of page
                        window.scrollTo(0, 0)
                        next()
                    }, timerToMatchTransition) // Delay to match total page transition time (0.7s)
                })
            }
        )

        runOnce = true
    }

    router.afterEach(async (): Promise<void> => {
        setTimeout(() => {
            uiStore.pageIsLoading = false
            setTimeout(() => {
                uiStore.pageHasLoaded = true
            }, timer3)
        }, timer4) // Delay to allow page to render before removing loading screen
    })
})
