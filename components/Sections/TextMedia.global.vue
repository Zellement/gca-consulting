<template>
    <section
        class="container container-px grid w-full grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-16"
    >
        <!-- Column loop -->
        <div
            v-for="column in content.columns"
            :key="column._uid"
            class="flex flex-col"
            :class="spanFinder"
        >
            <!-- Content in columns -->
            <div class="my-auto flex flex-col gap-8">
                <div
                    v-for="bodyContent in column.body"
                    :key="bodyContent._uid"
                    class="flex flex-col justify-center"
                >
                    <!-- -------------
                    Components
                    ------------ -->
                    <!-- Rich Text -->
                    <div
                        v-if="bodyContent.component === 'atomTextBlock'"
                        :class="getDisplayStyles(bodyContent.display)"
                    >
                        <rich-text
                            :content="bodyContent.text"
                            :class="
                                bodyContent.standout
                                    ? 'mx-auto max-w-screen-sm'
                                    : 'max-w-screen-md'
                            "
                        />
                    </div>
                    <contact-form
                        v-if="bodyContent.component === 'atomContactForm'"
                        class="max-w-screen-md"
                    />
                    <!-- Core Principles -->
                    <core-principles
                        v-if="bodyContent.component === 'atomCorePrinciples'"
                    />
                    <!-- Inline media -->
                    <inline-media
                        v-if="bodyContent.component === 'atomInlineMedia'"
                        :content="bodyContent"
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
                            wrapper-classes="h-full w-full flex"
                            :options="{
                                loop: true,
                                active:
                                    bodyContent?.media &&
                                    bodyContent?.media?.length > 1
                            }"
                            :show-buttons="
                                bodyContent?.media &&
                                bodyContent?.media?.length > 1
                                    ? true
                                    : false
                            "
                        >
                            <template #carousel-items>
                                <div
                                    v-for="(slide, index) in bodyContent.media"
                                    :key="slide._uid"
                                    :class="[
                                        'embla__slide relative',
                                        'flex max-h-[70vh]',
                                        'xl:max-h-max'
                                    ]"
                                >
                                    <div
                                        v-if="bodyContent.showTitles"
                                        class="absolute left-0 top-0 z-10 bg-white px-2 py-1 text-[12px]"
                                    >
                                        {{ slide.title }}
                                    </div>
                                    <single-custom-picture
                                        :loading="
                                            index === 0 ? 'eager' : 'lazy'
                                        "
                                        class="mx-auto h-full w-full"
                                        :sizes="[
                                            {
                                                dimensions:
                                                    bodyContent.isPortrait
                                                        ? '500x0'
                                                        : '0x500',
                                                from: '1px'
                                            },
                                            {
                                                dimensions:
                                                    bodyContent.isPortrait
                                                        ? '1000x0'
                                                        : '0x1000',
                                                from: '500px'
                                            },
                                            {
                                                dimensions:
                                                    bodyContent.isPortrait
                                                        ? '1500x0'
                                                        : '0x1500',
                                                from: '1200px'
                                            }
                                        ]"
                                        :url="slide.filename ?? ''"
                                        :alt="slide.alt ?? slide.title ?? ''"
                                    />
                                </div>
                            </template>
                        </embla-carousel>
                    </div>
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

const getDisplayStyles = (display: string | undefined) => {
    switch (display) {
        case 'bolden':
            return 'text-[1.3em] font-bold text-blue'
        case 'standout':
            return 'mx-auto flex w-full items-center bg-blue p-8 text-center text-[1.1em] italic text-white'
        default:
            return ''
    }
}
</script>
