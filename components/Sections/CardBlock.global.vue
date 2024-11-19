<template>
    <div class="container grid-layout container-px">
        <nuxt-link
            v-for="card in content.cards"
            :key="card.uuid"
            :to="getUrl(card.full_slug)"
            class="group relative col-span-full grid grid-cols-1 grid-rows-1 overflow-clip md:col-span-6 3xl:col-span-4"
        >
            <div
                class="pointer-events-none absolute inset-0 z-10 bg-blue-500/80 opacity-0 transition-opacity group-hover:opacity-100"
            ></div>
            <div
                class="col-span-full row-span-full aspect-landscape bg-blue-100"
            >
                <single-picture
                    v-if="card.content.hero?.[0]?.media.filename"
                    :img-data="{
                        url: card.content.hero?.[0]?.media.filename,
                        alt: card.content.hero?.[0]?.media.alt
                    }"
                    class="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div
                class="relative col-span-full row-span-full flex flex-col overflow-clip"
            >
                <div
                    class="absolute bottom-0 z-10 w-full bg-black/70 p-4 text-white transition-all group-hover:translate-y-1/2 group-hover:opacity-0"
                >
                    <h3 class="text-lg font-bold">
                        {{ card.name }}
                    </h3>
                </div>
                <div
                    class="absolute bottom-0 z-10 w-full translate-y-full whitespace-pre-line p-4 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:bg-transparent group-hover:opacity-100"
                >
                    <p class="text-lg font-bold group-hover:text-green">
                        {{ card.name }}
                    </p>
                    <div v-if="card.content.pageOverview">
                        {{ card.content.pageOverview }}
                    </div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionCardBlockStoryblok
}

defineProps<Props>()
const { getUrl } = useUrlUtils()
</script>
