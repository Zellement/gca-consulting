<template>
    <section
        class="container container-px grid w-full grid-cols-1 gap-8 xl:grid-cols-2"
    >
        <!-- Column loop -->
        <div
            v-for="column in content.columns"
            :key="column._uid"
            class="flex flex-col gap-8"
            :class="spanFinder"
        >
            <!-- Content in columns -->

            <div
                v-for="bodyContent in column.body"
                :key="bodyContent._uid"
                class="flex flex-col"
            >
                <!-- -------------
                    Components
                ------------ -->
                <!-- Rich Text -->
                <rich-text
                    v-if="bodyContent.component === 'atomTextBlock'"
                    :content="bodyContent.text"
                    class="max-w-screen-md"
                />
                <!-- Core Principles -->
                <core-principles
                    v-if="bodyContent.component === 'atomCorePrinciples'"
                />
                <!-- Single link -->
                <single-link
                    v-if="bodyContent.component === 'atomSingleLink'"
                    :content="bodyContent"
                />

                <!-- Media Block -->
                <div v-if="bodyContent.component === 'atomMediaBlock'">
                    <embla-carousel
                        :key="`${bodyContent._uid}_${bodyContent.media?.[0]?.filename}`"
                        ref="carouselRef"
                        class="flex h-full w-full"
                        wrapper-classes="h-full w-full flex "
                        :options="{
                            loop: true,
                            active:
                                bodyContent?.media &&
                                bodyContent?.media?.length > 1
                        }"
                        :show-buttons="
                            bodyContent?.media && bodyContent?.media?.length > 1
                                ? true
                                : false
                        "
                    >
                        <template #carousel-items>
                            <div
                                v-for="slide in bodyContent.media"
                                :key="slide._uid"
                                :class="[
                                    'embla__slide relative',
                                    'flex aspect-square h-full w-full md:aspect-video xl:aspect-landscape xl:max-h-[70vh]'
                                ]"
                            >
                                <single-picture
                                    class="h-full w-full object-cover"
                                    :img-data="{
                                        url: slide.filename ?? '',
                                        alt: slide.alt ?? ''
                                    }"
                                    sizes="336px md:700px xl:1200px 2xl:1600px max:2000px"
                                />
                            </div>
                        </template>
                    </embla-carousel>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { EmblaCarouselType } from 'embla-carousel'
const props = defineProps<{
    content: SectionTextMediaStoryblok
}>()

/**
 * Ref
 */

const columnCount: ComputedRef<number> = computed(() => {
    return props.content?.columns?.length ?? 0
})

const spanFinder: ComputedRef<string> = computed(() => {
    return columnCount.value === 2 ? 'xl:col-span-1' : 'xl:col-span-full'
})

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)
</script>
