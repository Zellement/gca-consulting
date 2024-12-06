<template>
    <div class="page">
        <hero-page v-if="showHero" />
        <site-breadcrumbs />
        <block-loop
            :key="`${id}__${currentStory?.id}`"
            class="-mt-8"
            :blocks="currentStory?.content.body"
        />
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const id = useId()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const showHero: ComputedRef<boolean> = computed(() => {
    return currentStory.value?.content?.showHero
})

definePageMeta({
    title: 'GCA'
})
</script>
