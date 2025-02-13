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
                    <single-custom-picture
                        :url="slide.filename ?? ''"
                        :alt="slide.alt ?? ''"
                        :sizes="[
                            {
                                dimensions: '500x500',
                                from: '1px'
                            },
                            {
                                dimensions: '800x500',
                                from: '500px'
                            },
                            {
                                dimensions: '1200x800',
                                from: '800px'
                            }
                        ]"
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
