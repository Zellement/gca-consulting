<template>
    <div class="page">
        <hero-page />
        <block-loop :blocks="currentStory?.content.body" />
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
