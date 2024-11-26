<template>
    <div v-if="hasSlides" class="grid-layout">
        <div class="col-span-full">
            <div class="container container-px text-center">
                <h2 class="mb-4 text-lg text-blue-500">
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
                            'embla__slide embla__slide--90 md:embla__slide--50 xl:embla__slide--33 2xl:embla__slide--25 group relative',
                            'w-full'
                        ]"
                        :to="getUrl(slide.full_slug)"
                    >
                        <single-picture
                            class="aspect-video"
                            :img-data="{
                                url: slide.content.hero[0].media.filename,
                                alt: slide.content.hero[0].media.alt ?? ''
                            }"
                            sizes="600px"
                        />
                        <div
                            class="absolute inset-0 flex bg-black/60 p-8 text-center text-md text-white transition-colors group-hover:bg-blue-500/80 group-hover:text-green"
                        >
                            <h3 class="m-auto">{{ slide.name }}</h3>
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
const { getUrl } = useUrlUtils()

/**
 * Ref
 */

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

const slides: ComputedRef<
    (TemplateNewsStoryblok | TemplatePageStoryblok)[] | null
> = computed(() => {
    return props.content.useRecentNews
        ? (storyblokStore.recentNewsStories ?? null)
        : (props.content.cards ?? null)
})

const hasSlides: ComputedRef<boolean> = computed(
    () => !!slides.value && slides.value.length > 0
)

const props = defineProps<Props>()
</script>
