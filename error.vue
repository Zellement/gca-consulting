<template>
    <div class="page">
        <h1>Sorry, this page does not exist</h1>
        <nuxt-link to="/">Go back to the homepage</nuxt-link>
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
    title: 'Consulting Civil, Structural and Highway Engineers'
})
</script>
