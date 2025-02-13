<template>
    <div v-if="hasSlides" class="grid-layout">
        <div class="col-span-full">
            <div
                class="container container-px flex items-center justify-center text-center text-blue-500"
            >
                <component
                    :is="titleLink ? NuxtLink : 'span'"
                    :to="titleLink ? getUrl(titleLink) : null"
                    :class="
                        titleLink
                            ? 'transition-colors hover:text-green-500'
                            : ''
                    "
                >
                    <h2 class="mb-4 text-lg">
                        {{ content.title }}
                    </h2>
                </component>
            </div>
            <embla-carousel
                :key="`embla-carousel-card-carousel-${slides?.length}`"
                ref="carouselRef"
                :options="{ loop: true }"
                show-buttons
            >
                <template #carousel-items>
                    <template v-for="slide in slides" :key="slide._uid">
                        <nuxt-link
                            v-if="slide?.content?.hero?.[0]?.media?.filename"
                            :class="[
                                'embla__slide embla__slide--90 md:embla__slide--50 xl:embla__slide--33 2xl:embla__slide--25 group relative',
                                'w-full'
                            ]"
                            :to="getUrl(slide.full_slug)"
                        >
                            <single-custom-picture
                                :url="
                                    slide?.content?.hero?.[0]?.media?.filename
                                "
                                :alt="
                                    slide?.content?.hero?.[0]?.media?.alt ?? ''
                                "
                                :sizes="[
                                    {
                                        dimensions: '500x300',
                                        from: '1px'
                                    }
                                ]"
                            />
                            <div
                                class="absolute inset-0 flex bg-black/60 p-8 text-center text-md text-white transition-colors group-hover:bg-blue-500/80 group-hover:text-green"
                            >
                                <h3 class="m-auto">{{ slide.name }}</h3>
                            </div>
                        </nuxt-link>
                    </template>
                </template>
            </embla-carousel>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { NuxtLink } from '#components'
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

const titleLink: ComputedRef<string> = computed(() => {
    return props.content.titleLink?.full_slug ?? ''
})

const hasSlides: ComputedRef<boolean> = computed(
    () => !!slides.value && slides.value.length > 0
)

const props = defineProps<Props>()
</script>
