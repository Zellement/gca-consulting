<template>
    <div class="page">
        <hero-page v-if="showHero" />
        <site-breadcrumbs />
        <div
            class="container container-px -mt-8 flex flex-col gap-4 py-8 md:flex-row"
        >
            <div
                v-if="currentStory.content.tel"
                class="flex flex-shrink-0 flex-row items-center gap-1"
            >
                <svg-icon
                    name="material-symbols:phone-enabled"
                    class="size-4"
                />
                {{ currentStory.content.tel }}
            </div>
            <div
                v-if="currentStory.content.email"
                class="flex flex-shrink-0 flex-row items-center gap-1"
            >
                <svg-icon name="ic:sharp-email" class="size-4" />
                {{ currentStory.content.email }}
            </div>
        </div>
        <block-loop
            :key="`${id}__${currentStory?.id}`"
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
