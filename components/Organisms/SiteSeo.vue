<template>
    <Head>
        <!-- <Title>{{ seoTitle }}</Title>
        <Meta
            v-if="seoDescription"
            name="description"
            :content="seoDescription"
        />
        <Meta hid="og:title" property="og:title" :content="seoTitle" />
        <Meta
            v-if="seoDescription"
            hid="og:description"
            property="og:description"
            :content="seoDescription"
        />
        <Meta hid="og:image" property="og:image" :content="seoOgImage" />
        <Meta hid="og:url" property="og:url" :content="currentUrl" />
        <Link rel="canonical" :href="`https://${currentUrl}`" /> -->
    </Head>
</template>

<script setup lang="ts">
// import {useContentfulStore} from '@/stores/contentful'
// import type {ComputedRef} from 'vue'
// const contentfulStore = useContentfulStore()
//
// const route = useRoute()
// const config = useRuntimeConfig()
//
// interface MetaData {
//     title: string
//     description: string
//     ogImage: string
// }
//
// const isHomepage: ComputedRef<boolean> = computed(() => {
//     return route.fullPath === '/'
// })
//
// const seoMetadata: ComputedRef<MetaData> = computed(() => {
//     return contentfulStore.getSeo
// })
//
// const seoTitle: ComputedRef<string> = computed(() => {
//     return `${seoMetadata.value?.title} ${isHomepage.value ? '' : '| Effect Digital'}`
// })
//
// const seoDescription: ComputedRef<string> = computed(() => {
//     return seoMetadata.value.description ?? null
// })
//
// const seoOgImage: ComputedRef<string> = computed(() => {
//     return seoMetadata.value.ogImage ?? null
// })
//
// const currentUrl: ComputedRef<string> = computed(() => {
//     return route.fullPath
//         ? `${config.public.WEBSITE_URL}${route?.fullPath}`
//         : config.public.WEBSITE_URL
// })
</script>
