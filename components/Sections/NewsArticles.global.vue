<template>
    <div>
        <div class="container grid-layout container-px">
            <single-card
                v-for="card in allNews"
                :key="card.uuid"
                :url="card.full_slug"
                :name="card.name"
                :img-data="{
                    url: card.content.hero?.[0]?.media.filename,
                    alt: card.content.hero?.[0]?.media.alt
                }"
                :overview="card.content.pageOverview"
            />
        </div>
        <paginate-links
            :current-page="currentPage"
            :total-pages="storyblokStore.getTotalNewsPages"
            :total-posts="storyblokStore.totalNewsStories ?? 0"
            :posts-per-page="storyblokStore.postsPerPage"
            class="container container-px mt-12 justify-center lg:mt-16 2xl:mt-20"
            :max-pages-to-show="5"
        />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionReviewBlockStoryblok
}

const route = useRoute()
const currentPage: ComputedRef<number> = computed(() => {
    const page = (route.query?.page as string) ?? '1'
    return parseInt(page)
})

defineProps<Props>()

const storyblokStore = useStoryblokStore()

const allNews: ComputedRef<TemplateNewsStoryblok[] | null> = computed(() => {
    return storyblokStore.newsStories
})

watch(
    currentPage,
    (newPage) => {
        storyblokStore.fetchNews(newPage)
    },
    { immediate: true }
)
</script>
