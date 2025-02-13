<template>
    <nuxt-layout>
        <nuxt-page :key="`app-key__${appKey}`" />
    </nuxt-layout>
    <!-- <page-transition v-if="!$preview" :class="pageTransitionClasses" /> -->
</template>

<script setup lang="ts">
const uiStore = useUiStore()
const storyblokStore = useStoryblokStore()
const route = useRoute()

const { $preview } = useNuxtApp()

// Forces a re-render when the Storyblok content changes
// Used for the Storyblok Visual Editor e.g. localhost/somepage?_storyblok=id1234
const appKey = ref<number>(0)

/* --------------------------
// Computed
-------------------------- */

// const animationsDisabled: ComputedRef<boolean> = computed(() => {
//     return uiStore.animationsDisabled
// })

const isAnyModalActive: ComputedRef<boolean> = computed(() => {
    return uiStore.showMobileNav
})

// const pageTransitionClasses: ComputedRef<string> = computed(() => {
//     return animationsDisabled.value
//         ? 'opacity-0 pointer-events-none'
//         : 'opacity-100'
// })

const pageName: ComputedRef<string> = computed(() => {
    return storyblokStore.currentStory.name
})

const metaTags: ComputedRef<MetaTags | null> = computed(
    () => storyblokStore.getCurrentStorySeoMetaTags
)

const storyID: ComputedRef<string> = computed(() => {
    return storyblokStore.currentStory.id
})

/* --------------------------
// Hooks and composables
-------------------------- */

//close modals on route change
watch(
    () => route.fullPath,
    () => {
        uiStore.showMobileNav = false
    }
)

watch(
    () => storyID.value,
    (newVal, oldVal) => {
        if (newVal === oldVal) return
        useSeoMeta({ ...metaTags.value })
        defineOgImageComponent('DefaultOgImage', {
            title:
                metaTags.value?.og_title ||
                metaTags.value?.title ||
                pageName.value,
            description:
                metaTags.value?.og_description ||
                metaTags.value?.description ||
                ''
        })
    },
    { immediate: true }
)

onMounted(async () => {
    await storyblokStore.fetchRequired()

    if ($preview) {
        const script = document.createElement('script')
        script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js'
        script.async = true
        script.onload = () => {
            const { StoryblokBridge, location } = window
            const storyblokInstance = new StoryblokBridge({
                resolveRelations: [
                    'sectionCardBlock.cards',
                    'sectionCardCarousel.cards',
                    'sectionReviewBlock.reviews',
                    'sectionCardCarousel.titleLink'
                ],
                preventClicks: true
            })

            storyblokInstance.on(['published', 'change'], () => {
                location.reload()
            })

            storyblokInstance.on('input', (payload) => {
                // On data change, increment the value of i to force a re-render
                appKey.value = appKey.value + 1
                storyblokStore.currentStory = payload?.story as any
            })

            storyblokInstance.on(['published', 'change'], () => {
                // reload page if save or publish is clicked
                location.reload()
            })
        }
        document.head.appendChild(script)
    }
})

useHead({
    // Prevent page scrolling when mobile nav is open
    bodyAttrs: {
        class: computed((): string => {
            if (isAnyModalActive.value) return 'overflow-hidden'
            return ''
        })
    }
})
</script>
