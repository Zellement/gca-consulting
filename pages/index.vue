<template>
    <div class="page">
        <hero-page full-screen />
        <site-breadcrumbs hide-text />
        <block-loop class="-mt-8" :blocks="currentStory?.content.body" />
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

definePageMeta({
    title: 'Elevated living in the heart of Walthamstow'
})
</script>
