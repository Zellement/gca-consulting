<template>
    <div class="max-w-screen-md">
        <embla-carousel
            ref="carouselRef"
            class="flex h-full w-full"
            wrapper-classes="h-full w-full flex "
            :options="{
                loop: true,
                active: content?.media && content?.media?.length > 1
            }"
            :show-buttons="
                content?.media && content?.media?.length > 1 ? true : false
            "
        >
            <template #carousel-items>
                <div
                    v-for="slide in content.media"
                    :key="slide.id"
                    :class="[
                        'embla__slide relative',
                        'flex h-full w-full xl:max-h-[70vh]'
                    ]"
                >
                    <single-picture
                        class="aspect-square md:aspect-video xl:aspect-landscape"
                        :img-data="{
                            url: slide.filename ?? '',
                            alt: slide.alt ?? ''
                        }"
                        sizes="336px lg:800px"
                    />
                </div>
            </template>
        </embla-carousel>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    content: any
}

defineProps<Props>()
</script>
