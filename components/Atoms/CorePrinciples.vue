<template>
    <section class="grid w-full grid-cols-12">
        <div class="col-span-full bg-green-200 p-4">
            <h2 class="text-center text-lg font-bold uppercase text-blue">
                GCA Core Principles
            </h2>
        </div>
        <div
            v-for="principle in leadingPrinciples"
            :key="principle._uid"
            class="relative col-span-full bg-green-200 p-8 text-center lg:col-span-4 xl:col-span-full 2xl:col-span-4 2xl:p-4 max:p-8"
        >
            <h2 class="font-bold text-blue">{{ principle.title }}</h2>
            <p>{{ principle.text }}</p>
            <div
                class="absolute left-1/2 top-full z-10 size-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br from-green-200 to-green-100 lg:to-green-200 xl:to-green-100 2xl:to-green-200"
            />
        </div>
        <div
            v-for="principle in resultPrinciples"
            :key="principle._uid"
            class="col-span-full bg-blue-200 p-8 text-center 2xl:p-4 max:p-8"
        >
            <h2 class="font-bold text-blue">{{ principle.title }}</h2>
            <p>{{ principle.text }}</p>
        </div>
    </section>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const globalOptions: ComputedRef<
    MetaGlobalOptionsStoryblok | undefined | null
> = computed(() => storyblokStore?.globalOptions)

const leadingPrinciples: ComputedRef<DataSinglePrinciple[]> = computed(() => {
    return globalOptions.value?.content.leadingPrinciples ?? []
})
const resultPrinciples: ComputedRef<DataSinglePrinciple[]> = computed(() => {
    return globalOptions.value?.content.resultPrinciples ?? []
})
</script>
