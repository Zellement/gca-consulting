<template>
    <section class="bg-gray-100 py-8 xl:py-16">
        <div class="container grid-layout container-px">
            <div class="col-span-full">
                <h2 class="text-center text-md text-blue">
                    {{ content.title }}
                </h2>
            </div>
            <div
                class="col-span-full grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-5 xl:gap-16"
            >
                <div
                    v-for="icon in content.grid"
                    :key="icon._uid"
                    class="jus flex flex-col items-center gap-4"
                >
                    <nuxt-img
                        :src="icon.icon.filename ?? ''"
                        width="200"
                        height="200"
                        fit="in"
                        class="mx-auto h-12 w-auto xl:h-20"
                        provider="storyblok"
                    />
                    <span class="text-center text-blue">{{ icon.text }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionIconGridStoryblok
}

defineProps<Props>()
</script>
