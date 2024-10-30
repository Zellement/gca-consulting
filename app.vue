<template>
    <nuxt-layout>
        <nuxt-page />
    </nuxt-layout>
    <page-transition :class="pageTransitionClasses" />
</template>

<script setup lang="ts">
const uiStore = useUiStore()

/* --------------------------
// Computed
-------------------------- */

const animationDisabled: ComputedRef<boolean> = computed(() => {
    return uiStore.animationDisabled
})

const isAnyModalActive: ComputedRef<boolean> = computed(() => {
    return uiStore.showMobileNav
})

const pageTransitionClasses: ComputedRef<string> = computed(() => {
    return animationDisabled.value
        ? 'opacity-0 pointer-events-none'
        : 'opacity-100'
})

/* --------------------------
// Hooks and composables
-------------------------- */

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
