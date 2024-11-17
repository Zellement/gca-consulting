<template>
    <div v-if="hasSlides" class="grid-layout">
        <div class="col-span-full">
            <div class="container container-px text-center">
                <h2 class="mb-4 text-lg font-bold text-blue-500">
                    {{ content.title }}
                </h2>
            </div>
            <embla-carousel
                :key="`embla-carousel-card-carousel-${slides?.length}`"
                ref="carouselRef"
                :options="{ loop: true }"
                show-buttons
            >
                <template #carousel-items>
                    <nuxt-link
                        v-for="slide in slides"
                        :key="slide._uid"
                        :class="[
                            'embla__slide embla__slide--90 md:embla__slide--50 xl:embla__slide--33 2xl:embla__slide--25 group relative aspect-video',
                            'w-full'
                        ]"
                        :to="`/${slide.full_slug}`"
                    >
                        <single-picture
                            class="h-full w-full object-cover"
                            :img-data="{
                                url: slide.content.hero[0].media.filename,
                                alt: slide.content.hero[0].media.alt ?? ''
                            }"
                            sizes="336px md:700px xl:1200px 2xl:1600px max:2000px"
                        />
                        <div
                            class="absolute inset-0 flex bg-black/60 p-8 text-center text-md text-white transition-colors group-hover:bg-blue-500/80 group-hover:text-green"
                        >
                            <span class="m-auto">{{ slide.name }}</span>
                        </div>
                    </nuxt-link>
                </template>
            </embla-carousel>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { EmblaCarouselType } from 'embla-carousel'
const storyblokStore = useStoryblokStore()

interface Props {
    content: SectionCardCarouselStoryblok
}

/**
 * Ref
 */

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

const slides: ComputedRef<
    (TemplateNewsStoryblok | TemplatePageStoryblok)[] | null
> = computed(() => {
    return props.content.useRecentNews
        ? (storyblokStore.news ?? null)
        : (props.content.cards ?? null)
})

const hasSlides: ComputedRef<boolean> = computed(
    () => !!slides.value && slides.value.length > 0
)

const props = defineProps<Props>()
</script>
