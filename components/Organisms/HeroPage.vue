<template>
    <section class="">
        <embla-carousel
            :key="`embla-carousel-hero-${heroSlides.length}`"
            ref="carouselRef"
            :options="{ loop: true, active: isCarousel }"
            class="col-span-full col-start-1 row-span-full row-start-1"
            show-dots
            :media="heroSlides"
        >
            <template #carousel-items>
                <div
                    v-for="slide in heroSlides"
                    :key="slide._uid"
                    :class="['embla__slide relative', 'w-full', slideClasses]"
                >
                    <div class="absolute inset-0">
                        <single-picture
                            class="h-full w-full object-cover"
                            :img-data="{
                                url: slide.media.filename,
                                alt: slide.media.alt ?? ''
                            }"
                            sizes="336px md:700px xl:1200px 2xl:1600px"
                        />
                    </div>
                    <p
                        v-if="slide.title"
                        class="text-sm absolute left-0 right-0 top-full z-20 w-full px-10 py-4 text-center uppercase text-black"
                    >
                        {{ slide.title }}
                    </p>
                </div>
            </template>
        </embla-carousel>
    </section>
</template>

<script setup lang="ts">
import type { EmblaCarouselType } from 'embla-carousel'

interface Props {
    fullScreen?: boolean
}

const props = defineProps<Props>()

const storyblokStore = useStoryblokStore()
/**
 * Ref
 */

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

/**
 * Computed
 */

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const heroSlides: ComputedRef<MultiassetStoryblok> = computed(() => {
    return currentStory.value?.content.hero
})

const isCarousel: ComputedRef<boolean> = computed(() => {
    return heroSlides.value && heroSlides.value?.length > 1
})

const slideClasses: ComputedRef<string> = computed(() => {
    return props.fullScreen
        ? 'h-dvh'
        : 'aspect-square md:aspect-video xl:aspect-16/9'
})

/**
 * Methods
 */
</script>
