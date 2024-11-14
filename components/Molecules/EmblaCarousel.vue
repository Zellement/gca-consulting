<template>
    <div class="relative flex flex-col" :class="containerWrapperClasses">
        <div class="relative h-full xl:flex-grow">
            <!-- Slides -->
            <div
                ref="emblaRef"
                class="embla relative"
                :class="{ 'embla--overflow': overflow }"
            >
                <div
                    v-auto-animate
                    class="embla__container"
                    :class="wrapperClasses"
                >
                    <slot
                        name="carousel-items"
                        :active-slide="state.activeIndex"
                    ></slot>
                </div>
            </div>

            <!-- Buttons / nav -->
            <div
                v-if="showButtons"
                class="absolute bottom-10 left-1/2 flex -translate-x-1/2"
            >
                <button
                    v-for="button in buttonActions"
                    :key="button.ariaLabel"
                    :aria-label="button.ariaLabel"
                    class="embla-nav-button"
                    @click="button.onClick"
                >
                    <svg-icon
                        name="chevron-right"
                        class="embla-nav-button-svg"
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
                                v-for="(slide, i) in thumbs"
                                :key="`thumb-${slide.id}`"
                                class="embla-thumbs__slide cursor-pointer"
                                @click="scrollTo(i)"
                            >
                                <single-picture
                                    v-if="slide.filename"
                                    class="h-full w-full object-cover"
                                    sizes="150px"
                                    :class="isThumbActiveClass(i)"
                                    :img-data="{
                                        url: slide?.filename,
                                        alt: slide?.alt ?? ''
                                    }"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'

/**
 * Types, interfaces, props & state
 */
interface Props {
    // Booleans
    autoHeight?: boolean
    overflow?: boolean
    showThumbs?: boolean
    // Strings
    wrapperClasses?: string
    thumbsWrapperClasses?: string
    // Embla & Storyblok specific
    options?: EmblaOptionsType
    showButtons?: boolean
    thumbs?: MultiassetStoryblok | null
}

const props = withDefaults(defineProps<Props>(), {
    // Booleans
    autoHeight: false,
    overflow: false,
    showThumbs: false,
    // Strings
    wrapperClasses: '',
    thumbsWrapperClasses: 'grid-layout mt-6 flex-shrink-0 pl-4 xl:pl-0',
    // Embla & Storyblok specific
    options: undefined,
    showButtons: false,
    thumbs: null
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
    return !!props.thumbs && props.thumbs.length > 0 && props.showThumbs
})

const options_thumbs: EmblaOptionsType = {
    dragFree: false
}

const plugins: EmblaPluginType[] = props.autoHeight ? [AutoHeight()] : []

const [emblaRef, emblaApi] = emblaCarouselVue(props.options, plugins)
const [emblaRefThumbs, emblaApiThumbs] = emblaCarouselVue(options_thumbs)
defineExpose({ emblaApi })

/**
 * Computed
 */

const containerWrapperClasses: ComputedRef<string[]> = computed(() => {
    return [props.overflow ? 'overflow-clip' : '']
})

/**
 * Methods
 */

const isThumbActiveClass = (index: number): string => {
    return index === state.activeIndex ? 'grayscale-0' : 'grayscale'
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
        iconClass: 'w-3 h-5 -rotate-180'
    },
    {
        ariaLabel: 'Next Image',
        onClick: scrollNext,
        iconClass: 'w-3 h-5'
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
