<template>
    <section
        v-if="hasSlides"
        :class="['relative border-l-[20px] border-green bg-gray-50']"
    >
        <embla-carousel
            :key="`embla-carousel-hero-${heroSlides.length}`"
            ref="carouselRef"
            :options="{ loop: true, active: isCarousel }"
            show-dots
            :media="heroSlides"
        >
            <template #carousel-items>
                <div
                    v-for="slide in heroSlides"
                    :key="slide._uid"
                    :class="['embla__slide relative', 'w-full', slideClasses]"
                >
                    <single-picture
                        class="h-full w-full object-cover"
                        :img-data="{
                            url: slide.media.filename,
                            alt: slide.media.alt ?? ''
                        }"
                        sizes="336px md:700px xl:1200px 2xl:1600px max:1800px"
                    />

                    <component
                        :is="slide.link ? NuxtLink : 'h2'"
                        v-if="slide.displayText"
                        :to="getUrl(slide.link.cached_url ?? slide.link.url)"
                        class="absolute bottom-20 right-0 w-8/12 bg-black/70 px-4 py-2 text-lg font-bold text-white transition-colors hover:text-green-500"
                    >
                        {{ slide.displayText }}
                    </component>
                </div>
            </template>
        </embla-carousel>
    </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import type { EmblaCarouselType } from 'embla-carousel'

interface Props {
    fullScreen?: boolean
}

const props = defineProps<Props>()

const storyblokStore = useStoryblokStore()
const { getUrl } = useUrlUtils()

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

const hasSlides: ComputedRef<boolean> = computed(() => {
    return !!heroSlides.value && heroSlides.value?.length > 0
})

const isCarousel: ComputedRef<boolean> = computed(() => {
    return heroSlides.value && heroSlides.value?.length > 1
})

const slideClasses: ComputedRef<string> = computed(() => {
    return props.fullScreen
        ? 'h-[90vh]'
        : 'aspect-square md:aspect-video max-h-[70vh] xl:aspect-5/2 xl:max-h-[60vh] 2xl:max-h-[50vh] 3xl:max-h-[40vh]'
})

/**
 * Methods
 */
</script>
