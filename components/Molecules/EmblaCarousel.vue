<template>
    <div class="relative flex flex-col">
        <div class="relative h-full xl:flex-grow">
            <!-- Slides -->
            <div ref="emblaRef" class="embla relative">
                <div class="embla__container" :class="wrapperClasses">
                    <slot name="carousel-items"></slot>
                </div>
            </div>

            <!-- Buttons / nav -->
            <div
                v-if="showButtons"
                class="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1"
            >
                <button
                    v-for="button in buttonActions"
                    :key="button.ariaLabel"
                    :aria-label="button.ariaLabel"
                    class="size-10 bg-blue-500 text-white transition-colors hover:bg-green-500"
                    @click="button.onClick"
                >
                    <Icon
                        name="ic:baseline-chevron-right"
                        class="size-10"
                        :class="button.iconClass"
                    />
                </button>
            </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="displayThumbs">
            <div :class="thumbsWrapperClasses">
                <div class="embla-thumbs relative z-10 col-span-full">
                    <div ref="emblaRefThumbs" class="embla-thumbs__viewport">
                        <div class="embla-thumbs__container">
                            <div
                                v-for="(slide, i) in media"
                                :key="`thumb-${slide.id}`"
                                class="embla-thumbs__slide cursor-pointer"
                                @click="scrollTo(Number(i))"
                            >
                                <div
                                    class="size-10 bg-red-500"
                                    :class="isThumbActiveClass(Number(i))"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dots -->
        <div v-if="displayDots">
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div ref="emblaRefDots">
                    <div class="flex gap-2">
                        <div
                            v-for="(slide, i) in media"
                            :key="`dot-${slide.id}`"
                            class="size-3 cursor-pointer rounded-full border border-white"
                            :class="isDotActiveClass(Number(i))"
                            @click="scrollTo(Number(i))"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaOptionsType } from 'embla-carousel'

/**
 * Types, interfaces, props & state
 */
interface Props {
    // Booleans
    showThumbs?: boolean
    showButtons?: boolean
    showDots?: boolean
    // Strings
    wrapperClasses?: string
    thumbsWrapperClasses?: string
    // Embla & Storyblok specific
    options?: EmblaOptionsType
    media?: MultiassetStoryblok | AtomHeroSlideStoryblok[] | null
}

const props = withDefaults(defineProps<Props>(), {
    // Booleans
    showThumbs: false,
    showButtons: false,
    showDots: false,
    // Strings
    wrapperClasses: '',
    thumbsWrapperClasses: 'grid-layout mt-6 flex-shrink-0 pl-4 xl:pl-0',
    // Embla & Storyblok specific
    options: undefined,
    media: null
})

interface State {
    activeIndex: number
    realIndex: number
    totalSlides: number
}

const state = reactive<State>({
    activeIndex: 0,
    realIndex: 0,
    totalSlides: 0
})

const emit = defineEmits<{
    (e: 'slideChanged', payload: { index: number; totalSlides: number }): void
    (e: 'reachEnd'): void
}>()

/**
 * Embla Options & API
 */
const displayThumbs: ComputedRef<boolean> = computed(() => {
    return !!props.media && props.media.length > 0 && props.showThumbs
})
const displayDots: ComputedRef<boolean> = computed(() => {
    return !!props.media && props.media.length > 1 && props.showDots
})

const options_thumbs: EmblaOptionsType = {
    dragFree: false
}

const [emblaRef, emblaApi] = emblaCarouselVue(props.options)
const [emblaRefThumbs, emblaApiThumbs] = emblaCarouselVue(options_thumbs)
defineExpose({ emblaApi })

/**
 * Computed
 */

/**
 * Methods
 */

const isThumbActiveClass = (index: number): string => {
    return index === state.activeIndex ? 'grayscale-0' : 'grayscale'
}

const isDotActiveClass = (index: number): string => {
    return index === state.activeIndex ? 'bg-white' : 'grayscale'
}

const handleSlideChangeEvent = (activeIndex: number) => {
    if (!emblaApi.value) return
    state.realIndex = activeIndex + 1
    state.totalSlides = emblaApi.value.slideNodes().length

    emit('slideChanged', {
        index: state.realIndex,
        totalSlides: state.totalSlides
    })
}

/**
 * Scroll triggers
 */
const scroll = (action: EmblaScrollEvents, index?: number): void => {
    if (!emblaApi.value) {
        return
    }

    if (action === 'next') {
        emblaApi.value.scrollNext()
    }

    if (action === 'prev') {
        emblaApi.value.scrollPrev()
    }

    const shouldScrollTo = action === 'to' && index !== undefined

    if (shouldScrollTo) {
        emblaApi.value.scrollTo(index)
    }

    if (emblaApiThumbs.value) {
        if (shouldScrollTo) {
            emblaApiThumbs.value.scrollTo(index)
        } else {
            emblaApiThumbs.value.scrollTo(state.activeIndex)
        }
    }
}

const scrollNext = (): void => scroll('next')
const scrollPrev = (): void => scroll('prev')
const scrollTo = (index: number): void => scroll('to', index)

const buttonActions = [
    {
        ariaLabel: 'Previous Image',
        onClick: scrollPrev,
        iconClass: ' -rotate-180'
    },
    {
        ariaLabel: 'Next Image',
        onClick: scrollNext,
        iconClass: ''
    }
]

/**
 * Lifecycle hooks
 */
onMounted(() => {
    if (!emblaApi.value) return
    emblaApi.value.slideNodes()

    emblaApi.value.on('select', () => {
        if (!emblaApi.value) return
        state.activeIndex = emblaApi.value.selectedScrollSnap()
        handleSlideChangeEvent(state.activeIndex)

        if (state.activeIndex === emblaApi.value.scrollSnapList().length - 1) {
            emit('reachEnd')
        }
    })
})

onUnmounted(() => {
    if (emblaApi.value) {
        emblaApi.value.destroy()
    }
    if (emblaApiThumbs.value) {
        emblaApiThumbs.value.destroy()
    }
})
</script>
