<template>
    <div v-if="hasReviews" class="bg-green-500 py-12 text-center text-white">
        <div class="container container-px container--xl">
            <template v-if="content.showAllAsGrid">
                <div class="columns gap-8 lg:columns-2">
                    <blockquote
                        v-for="review in reviews"
                        :key="review.id"
                        class="break-inside-avoid border-b py-8"
                    >
                        <div class="flex flex-col gap-8">
                            <Icon
                                name="bxs:quote-left"
                                class="mx-auto size-8"
                            />
                            <div
                                class="mx-auto max-w-screen-md whitespace-pre-line"
                            >
                                {{ review.content.quote }}
                            </div>
                            <Icon
                                name="bxs:quote-left"
                                class="mx-auto size-8"
                            />
                            <p class="italic">{{ review.name }}</p>
                        </div>
                    </blockquote>
                </div>
            </template>
            <embla-carousel
                v-else
                :key="`reviews-${content.reviews?.length}`"
                ref="carouselRef"
                :wrapper-classes="hasMultipleReviews ? 'pb-24' : 'pb-0'"
                :options="{ loop: true, active: hasMultipleReviews }"
                :show-buttons="hasMultipleReviews"
            >
                <template #carousel-items>
                    <blockquote
                        v-for="review in reviews"
                        :key="review.id"
                        :class="['embla__slide']"
                    >
                        <div class="flex flex-col gap-8">
                            <Icon
                                name="bxs:quote-left"
                                class="mx-auto size-8"
                            />
                            <div
                                class="mx-auto max-w-screen-md whitespace-pre-line"
                            >
                                {{ review.content.quote }}
                            </div>
                            <Icon
                                name="bxs:quote-left"
                                class="mx-auto size-8"
                            />
                            <p class="italic">{{ review.name }}</p>
                        </div>
                    </blockquote>
                </template>
            </embla-carousel>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { EmblaCarouselType } from 'embla-carousel'
const storyblokStore = useStoryblokStore()

interface Props {
    content: SectionReviewBlockStoryblok
}

const props = defineProps<Props>()

/**
 * Ref
 */

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

const reviews: ComputedRef<
    (TemplateNewsStoryblok | TemplatePageStoryblok)[] | null
> = computed(() => {
    return props.content.showAllAsGrid
        ? (storyblokStore.reviews ?? null)
        : (props.content.reviews ?? null)
})

const hasReviews: ComputedRef<boolean> = computed(
    () => !!reviews.value && reviews.value.length > 0
)

const hasMultipleReviews: ComputedRef<boolean> = computed(
    () => !!reviews.value && reviews.value.length > 1
)
</script>
