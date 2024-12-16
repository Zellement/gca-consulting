<template>
    <section
        class="container container-px grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6"
    >
        <nuxt-link
            v-for="item in content.pdfs"
            :key="item._uid"
            download
            :to="item?.file?.filename ?? ''"
            class="group flex flex-col items-center gap-8 bg-white text-center"
        >
            <div
                class="flex aspect-2/3 w-full items-center justify-center bg-blue-50 transition-colors group-hover:bg-blue-100"
            >
                <single-picture
                    v-if="item.media?.filename"
                    :img-data="{
                        url: item.media.filename,
                        alt: item.file.title ?? item.file.filename ?? ''
                    }"
                    class="aspect-2/3 h-full w-full object-cover"
                />
                <Icon v-else class="size-16" name="proicons:pdf" />
            </div>
            <span class="transition-colors group-hover:text-blue">
                {{ item.file.title ?? item.file.filename }}
            </span>
        </nuxt-link>
    </section>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionPdfDownloadBlockStoryblok
}

defineProps<Props>()
</script>
