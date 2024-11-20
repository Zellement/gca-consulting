<template>
    <nav
        aria-label="breadcrumb "
        class="mb-12 border-l-[20px] border-green-500 py-4 pl-4 text-green-500 xl:mb-0 xl:pb-16"
    >
        <ol class="flex flex-row items-center gap-2">
            <li
                v-for="(crumb, index) in breadcrumbs"
                :key="`breadcrumb_link_${index}`"
                class="flex items-center gap-2"
            >
                <nuxt-link
                    :to="crumb.path"
                    class="uc-text text-current transition-colors hover:text-blue-500"
                >
                    {{ crumb.label }}
                </nuxt-link>
                <div aria-hidden="true">|</div>
            </li>
            <li
                class="uc-text text-current"
                :class="hideText ? 'invisible' : ''"
                aria-current="page"
            >
                <h1>{{ storyblokStore.currentStory?.name }}</h1>
            </li>
        </ol>
    </nav>
</template>

<script lang="ts" setup>
interface Breadcrumb {
    path: string
    label: string
}

interface Props {
    hideText?: boolean
}

defineProps<Props>()

const storyblokStore = useStoryblokStore()

const route = useRoute()
const { toTitleCase } = useStringUtils()

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
    const pathArray = route.path.split('/').filter((crumb) => crumb !== '')
    return pathArray.slice(0, -1).map((crumb, index) => {
        const path = `/${pathArray.slice(0, index + 1).join('/')}`
        const label = toTitleCase(crumb.replace(/-/g, ' '))
        return { path, label }
    })
})
</script>
