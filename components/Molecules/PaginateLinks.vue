<template>
    <nav class="flex items-center gap-2">
        <nuxt-link
            :to="queryParamsToQueryString({ page: currentPage - 1 })"
            aria-label="Previous page"
            :class="{ 'pointer-events-none opacity-10': !showPreviousPage }"
            class="flex"
        >
            <Icon name="ic:baseline-chevron-right" class="size-10 rotate-180" />
        </nuxt-link>

        <div class="flex items-center gap-2">
            <template v-for="page in pages" :key="`page-${page}`">
                <nuxt-link
                    v-if="page"
                    :to="queryParamsToQueryString({ page })"
                    type="button"
                    :aria-label="`Page ${page}`"
                    class="flex size-10 items-center justify-center rounded-full bg-blue text-center text-sm text-white hover:underline"
                    :active-class="getPageActiveClass(Number(page))"
                >
                    <span>{{ page }}</span>
                </nuxt-link>

                <span
                    v-else
                    :aria-disabled="true"
                    :class="['text-xs flex size-9 items-center justify-center']"
                >
                    &hellip;
                </span>
            </template>
        </div>

        <nuxt-link
            :to="queryParamsToQueryString({ page: currentPage + 1 })"
            aria-label="Next page"
            :class="{ 'pointer-events-none opacity-10': !showNextPage }"
            class="flex"
        >
            <Icon name="ic:baseline-chevron-right" class="size-10 text-blue" />
        </nuxt-link>
    </nav>
</template>

<script setup lang="ts">
const { removeEmptyObjectKeys } = useObjectUtils()
const { getPages } = usePaginationUtils()

interface Props {
    totalPosts: number
    postsPerPage: number
    currentPage: number
    maxPagesToShow: number
    totalPages: number
}

interface ParamOverrides {
    page: number
}

const route = useRoute()
const props = defineProps<Props>()

/**
 * Computed
 */
const pages: ComputedRef<(number | null)[]> = computed(() =>
    getPages({
        totalPosts: props.totalPosts,
        postsPerPage: props.postsPerPage,
        maxPagesToShow: props.maxPagesToShow,
        currentPage: props.currentPage
    })
)

const showPreviousPage: ComputedRef<boolean> = computed(() => {
    return props.currentPage > 1
})

const showNextPage: ComputedRef<boolean> = computed(() => {
    return props.currentPage < props.totalPages
})

/**
 * Methods
 */
const queryParamsToQueryString = (overrides: ParamOverrides): string => {
    const page: string = overrides?.page === 1 ? '' : overrides?.page.toString()

    const query: Record<string, string> = removeEmptyObjectKeys({
        ...route.query,
        ...overrides,
        page
    }) as Record<string, string>

    const params = Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join('&')
    return `?${params}`
}

const getPageActiveClass = (digit: number): string => {
    const isActive = props.currentPage === (digit ?? 1)
    return isActive ? 'bg-green-500' : ''
}
</script>

<style lang="scss" scoped></style>
