<template>
    <nav class="flex items-center gap-2">
        <nuxt-link
            :to="queryParamsToQueryString({ page: currentPage - 1 })"
            aria-label="Previous page"
            rel="prev"
            icon="arrow"
            class="button"
            :class="{ 'button--disabled': !showPreviousPage }"
            icon-classes="-rotate-180"
        >
            link
        </nuxt-link>

        <div class="flex items-center">
            <template v-for="page in pages" :key="`page-${page}`">
                <nuxt-link
                    v-if="page"
                    :to="queryParamsToQueryString({ page })"
                    type="button"
                    :aria-label="`Page ${page}`"
                    class="digit hover:underline"
                    :active-class="getPageActiveClass(Number(page))"
                >
                    {{ page }}
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
            rel="next"
            icon="arrow"
            class="button"
            :class="{ 'button--disabled': !showNextPage }"
        >
            link
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
    return isActive ? 'underline' : ''
}
</script>

<style lang="scss" scoped></style>
