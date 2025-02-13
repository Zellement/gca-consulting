<template>
    <section
        v-if="hasSlides"
        :class="['relative border-l-[20px] border-green bg-gray-50']"
    >
        <single-custom-picture
            v-if="heroSlides[0].media.filename"
            :url="heroSlides[0].media.filename"
            alt=""
            :sizes="[
                {
                    dimensions: '1800x800',
                    from: '1800px'
                },
                {
                    dimensions: '800x800',
                    from: '800px'
                },
                {
                    dimensions: '300x800',
                    from: '300px'
                }
            ]"
        />
    </section>
</template>

<script setup lang="ts">
// import { NuxtLink } from '#components'
// import type { EmblaCarouselType } from 'embla-carousel'

interface Props {
    fullScreen?: boolean
}

defineProps<Props>()

const storyblokStore = useStoryblokStore()
// const { getUrl } = useUrlUtils()

/**
 * Ref
 */

// const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

/**
 * Computed
 */

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const heroSlides: ComputedRef<MultiassetStoryblok> = computed(() => {
    return currentStory.value?.content.hero
})

const hasSlides: ComputedRef<boolean> = computed(() => {
    return !!heroSlides.value && heroSlides.value?.length > 0
})

// const isCarousel: ComputedRef<boolean> = computed(() => {
//     return heroSlides.value && heroSlides.value?.length > 1
// })

// const slideClasses: ComputedRef<string> = computed(() => {
//     return props.fullScreen
//         ? 'h-[80vh]'
//         : 'aspect-square md:aspect-video max-h-[70vh] xl:aspect-5/2 xl:max-h-[60vh] 2xl:max-h-[50vh] 3xl:max-h-[40vh]'
// })

/**
 * Methods
 */
</script>
