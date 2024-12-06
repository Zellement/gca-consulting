<template>
    <div class="page">
        <hero-page v-if="showHero" full-screen />
        <site-breadcrumbs hide-text />
        <block-loop class="-mt-8" :blocks="currentStory?.content.body" />
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const showHero: ComputedRef<boolean> = computed(() => {
    return currentStory.value?.content?.showHero
})

definePageMeta({
    title: 'Consulting Civil, Structural and Highway Engineers'
})
</script>
