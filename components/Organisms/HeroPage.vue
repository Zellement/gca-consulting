<template>
    <section class="pb-12">
        <div class="grid grid-cols-1 grid-rows-1 text-center text-white">
            <embla-carousel
                :key="`embla-carousel-hero-${heroSlides.length}`"
                ref="carouselRef"
                :options="{ loop: true, active: isCarousel }"
                class="col-span-full col-start-1 row-span-full row-start-1"
            >
                <template #carousel-items>
                    <div
                        v-for="slide in heroSlides"
                        :key="slide._uid"
                        :class="[
                            'embla__slide relative',
                            'w-full',
                            slideClasses
                        ]"
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
            <!-- <div
                class="grid-layout container container-px pointer-events-none relative col-span-full col-start-1 row-span-full row-start-1"
            >
                <div
                    class="pointer-events-none relative col-span-full mx-8 flex flex-col items-center gap-4 lg:pb-8"
                >
                    <template v-if="isCarousel">
                        <embla-carousel-external-controls
                            :class="[
                                'pointer-events-none absolute left-0 right-0 top-1/2 w-full -translate-y-1/2 md:px-4 lg:px-8 xl:px-24 3xl:px-32 max:px-40',
                                '95rem:px-32 102rem:px-16 105rem:px-8'
                            ]"
                            @scroll="
                                ({ direction }) => scrollToSlide(direction)
                            "
                        />
                        <p class="text-sm max-lg:hidden mt-auto italic">
                            Swipe to View More
                        </p>
                    </template>
                </div>
            </div> -->
            {{ heroSlides }}
        </div>
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

// const scrollToSlide = (direction: 'Next' | 'Prev') => {
//     if (!carouselRef.value || !carouselRef.value.emblaApi) return
//     carouselRef.value.emblaApi[`scroll${direction}`]()
// }
</script>
