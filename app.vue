<template>
    <nuxt-layout>
        <nuxt-page />
    </nuxt-layout>
</template>

<script setup lang="ts">
const { $cookieYes } = useNuxtApp()

const uiStore = useUiStore()

/* --------------------------
// Computed
-------------------------- */

const isAnyModalActive: ComputedRef<boolean> = computed(() => {
    return uiStore.showMobileNav
})

/* --------------------------
// Hooks and composables
-------------------------- */

$cookieYes()

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
