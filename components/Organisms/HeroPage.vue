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
                    v-for="(slide, index) in heroSlides"
                    :key="slide._uid"
                    :class="['embla__slide relative', 'w-full', slideClasses]"
                >
                    <single-custom-picture
                        v-if="slide.media.filename"
                        :url="slide.media.filename"
                        :alt="slide.media.alt"
                        :loading="index === 0 ? 'eager' : 'lazy'"
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
                                from: '1px'
                            }
                        ]"
                    />

                    <component
                        :is="
                            slide.link?.url || slide.link?.cached_url
                                ? NuxtLink
                                : 'h2'
                        "
                        v-if="slide.displayText"
                        :to="getUrl(slide.link.cached_url ?? slide.link.url)"
                        class="absolute bottom-20 right-0 w-8/12 bg-black/70 px-4 py-2 text-lg font-bold text-white transition-colors"
                        :class="{
                            'hover:bg-green':
                                slide.link?.url || slide.link?.cached_url
                        }"
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
        ? 'h-[500px] 2xs:h-[600px]'
        : 'aspect-square md:aspect-video max-h-[70vh] xl:aspect-5/2 xl:max-h-[60vh] 2xl:max-h-[50vh] 3xl:max-h-[40vh]'
})

/**
 * Methods
 */
</script>
