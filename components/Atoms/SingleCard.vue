<template>
    <nuxt-link
        :to="getUrl(url)"
        class="group relative col-span-full grid grid-cols-1 grid-rows-1 overflow-clip md:col-span-6 3xl:col-span-4"
    >
        <div
            class="pointer-events-none absolute inset-0 z-10 bg-blue-500/80 opacity-0 transition-opacity group-hover:opacity-100"
        ></div>
        <div class="col-span-full row-span-full bg-blue-100">
            <single-picture
                v-if="imgData.url"
                :img-data="{
                    url: imgData.url,
                    alt: imgData.alt
                }"
                class="aspect-landscape transition-transform group-hover:scale-105"
                sizes="600px"
            />
        </div>
        <div
            class="relative col-span-full row-span-full flex flex-col overflow-clip"
        >
            <div
                class="absolute bottom-0 z-10 w-full bg-black/70 p-4 text-white transition-all group-hover:translate-y-1/2 group-hover:opacity-0"
            >
                <h3 class="text-lg">
                    {{ name }}
                </h3>
            </div>
            <div
                class="absolute bottom-0 z-10 w-full translate-y-full whitespace-pre-line p-4 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:bg-transparent group-hover:opacity-100"
            >
                <p class="text-lg font-bold group-hover:text-green">
                    {{ name }}
                </p>
                <div v-if="overview">
                    {{ overview }}
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script lang="ts" setup>
const { getUrl } = useUrlUtils()
interface Props {
    url: string
    imgData: {
        url: string
        alt: string
    }
    name: string
    overview?: string
}
defineProps<Props>()
</script>
