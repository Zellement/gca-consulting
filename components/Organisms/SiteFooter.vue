<template>
    <div
        class="site-footer mt-32 flex border-t-[20px] border-blue-500 bg-stone-700 text-white"
    >
        <footer
            role="contentinfo"
            class="relative z-10 w-full transition-transform duration-500"
        >
            <div class="container grid-layout container-px py-8">
                <div
                    v-for="location in locations"
                    :key="location.uuid"
                    class="col-span-full flex flex-col items-center text-center md:col-span-4"
                >
                    <h3 class="font-bold text-green">
                        GCA {{ location.name }}
                    </h3>
                    <a
                        class="mt-2 inline-block transition-colors hover:text-green-500"
                        :href="`tel:${location.content.tel}`"
                    >
                        {{ location.content.tel }}
                    </a>
                    <a
                        class="inline-block transition-colors hover:text-green-500"
                        :href="`mailto:${location.content.email}`"
                    >
                        {{ location.content.email }}
                    </a>
                </div>
            </div>

            <div
                class="col-span-full flex flex-col items-center justify-center gap-4 bg-black py-8"
            >
                <social-links class="flex gap-4 text-green" />
                <div class="flex flex-row items-center gap-4">
                    <p class="flex flex-row gap-1 text-sm">
                        Copyright <span>&copy;</span>
                        <span>{{ date }}</span> GCA (UK) Ltd
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const locations: ComputedRef<TemplateLocationStoryblok[]> = computed(() => {
    return storyblokStore.locations as TemplateLocationStoryblok[]
})

const date: ComputedRef<number> = computed(() => {
    return new Date().getFullYear()
})
</script>
