<template>
    <div class="page">
        <hero-page />
        <site-breadcrumbs />
        <block-loop class="-mt-8" :blocks="currentStory?.content.body" />
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

definePageMeta({
    title: 'GCA'
})
</script>
