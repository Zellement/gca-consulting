<template>
    <div class="page">
        <hero-page v-if="showHero" />
        <site-breadcrumbs />
        <div
            class="container container-px -mt-8 flex flex-col items-start justify-start gap-3 py-8 md:flex-row md:gap-8"
        >
            <a
                v-if="currentStory.content.tel"
                :href="`tel:${currentStory.content.tel}`"
                class="flex flex-row items-center gap-1 self-start transition-colors hover:text-green-500"
            >
                <Icon
                    name="material-symbols:phone-enabled"
                    class="size-5 text-blue opacity-50"
                />
                {{ currentStory.content.tel }}
            </a>
            <a
                v-if="currentStory.content.email"
                :href="`mailto:${currentStory.content.email}`"
                class="flex flex-row items-center gap-1 self-start transition-colors hover:text-green-500"
            >
                <Icon
                    name="ic:sharp-email"
                    class="size-5 text-blue opacity-50"
                />
                {{ currentStory.content.email }}
            </a>
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
