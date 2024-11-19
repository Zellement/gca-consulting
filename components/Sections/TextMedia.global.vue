<template>
    <section
        class="container container-px grid w-full grid-cols-1 gap-8"
        :class="sectionClasses"
    >
        <div
            v-for="column in content.body"
            :key="column.id"
            class="col-span-full flex h-full w-full"
            :class="columnClasses"
        >
            <rich-text
                v-if="column.component === 'atomTextBlock'"
                :content="column.text"
                class="my-auto mr-auto max-w-screen-md"
            />
            <embla-carousel
                v-if="column.component === 'atomMediaBlock'"
                :key="`embla-carousel-hero-${column?.media?.length}`"
                ref="carouselRef"
                class="flex h-full w-full"
                wrapper-classes="h-full w-full flex bg-green-100"
                :options="{ loop: true }"
                show-buttons
            >
                <template #carousel-items>
                    <div
                        v-for="slide in column.media"
                        :key="slide._uid"
                        :class="[
                            'embla__slide relative',
                            'flex aspect-square h-full w-full bg-red-300 md:aspect-video xl:aspect-auto xl:max-h-[70vh]'
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

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

const sectionClasses: ComputedRef<string> = computed(() => {
    return props.content?.body?.length === 2 ? 'xl:grid-cols-2' : ''
})

const columnClasses: ComputedRef<string> = computed(() => {
    return props.content?.body?.length === 2 ? 'xl:col-span-1' : ''
})
</script>
