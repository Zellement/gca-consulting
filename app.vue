<template>
    <nuxt-layout>
        <nuxt-page />
    </nuxt-layout>
    <page-transition :class="pageTransitionClasses" />
</template>

<script setup lang="ts">
const uiStore = useUiStore()
const storyblokStore = useStoryblokStore()
const route = useRoute()

/* --------------------------
// Computed
-------------------------- */

const animationsDisabled: ComputedRef<boolean> = computed(() => {
    return uiStore.animationsDisabled
})

const isAnyModalActive: ComputedRef<boolean> = computed(() => {
    return uiStore.showMobileNav
})

const pageTransitionClasses: ComputedRef<string> = computed(() => {
    return animationsDisabled.value
        ? 'opacity-0 pointer-events-none'
        : 'opacity-100'
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

onMounted(async () => {
    await storyblokStore.fetchRequired()
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
