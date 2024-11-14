<template>
    <section class="pb-12">
        <div class="grid grid-cols-1 grid-rows-1 text-center text-white">
            <embla-carousel
                :key="`embla-carousel-hero-${content._uid}`"
                ref="carouselRef"
                :options="{ loop: true, active: isCarousel }"
                class="col-span-full col-start-1 row-span-full row-start-1"
            >
                <template #carousel-items="slotProps">
                    <div
                        v-for="(mediaItem, i) in media"
                        :key="mediaItem.id"
                        :class="[
                            'embla__slide embla__slide--shutter relative',
                            'aspect-tall w-full',
                            'md:aspect-square',
                            'lg:aspect-video',
                            'max:aspect-2/1 max:max-h-[70vh]'
                        ]"
                    >
                        <div
                            class="absolute inset-0 px-2 transition-[margin,opacity]"
                            :class="slideClasses(i, slotProps.activeSlide)"
                        >
                            <single-picture
                                class="h-full w-full object-cover"
                                :img-data="{
                                    url: mediaItem.filename,
                                    alt: mediaItem.alt ?? ''
                                }"
                            />
                        </div>
                        <p
                            v-if="mediaItem.title"
                            class="text-sm absolute left-0 right-0 top-full z-20 w-full px-10 py-4 text-center uppercase text-black"
                        >
                            {{ mediaItem.title }}
                        </p>
                    </div>
                </template>
            </embla-carousel>
            <!-- Controls -->
            <div
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
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { EmblaCarouselType } from 'embla-carousel'

interface Props {
    content: SectionGalleryCarouselStoryblok
}

const props = defineProps<Props>()

/**
 * Ref
 */

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

/**
 * Computed
 */

const isCarousel: ComputedRef<boolean> = computed(() => {
    return media.value && media.value?.length > 1
})

const media: ComputedRef<MultiassetStoryblok> = computed(() => {
    return props.content.media
})

/**
 * Methods
 */

const slideClasses = (i: number, activeSlide: number) => {
    return i === activeSlide
        ? 'md:mx-8 mx-4'
        : 'opacity-60 my-16 xl:-mx-4 -mx-2'
}

const scrollToSlide = (direction: 'Next' | 'Prev') => {
    if (!carouselRef.value || !carouselRef.value.emblaApi) return
    carouselRef.value.emblaApi[`scroll${direction}`]()
}
</script>
