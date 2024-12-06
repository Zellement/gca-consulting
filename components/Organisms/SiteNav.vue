<template>
    <nav v-if="navItems" class="site-nav">
        <ul class="my-auto lg:mr-4" :class="ulClasses">
            <li v-for="navItem in navItems" :key="navItem._uid">
                <nuxt-link
                    :to="getUrl(navItem.titlePage.full_slug)"
                    class="site-nav__item"
                    @click="uiStore.showMobileNav = false"
                >
                    {{ navItem.titlePage.name }}
                </nuxt-link>
                <ul
                    v-if="navItem.subPages && navItem.subPages.length > 0"
                    class="z-10 mt-2 grid grid-cols-2 flex-col px-4 2xl:grid-cols-3"
                >
                    <li
                        v-for="subItem in navItem.subPages"
                        :key="subItem.id"
                        class=""
                    >
                        <nuxt-link
                            :to="getUrl(subItem.full_slug)"
                            class="site-nav__sub-item"
                            @click="uiStore.showMobileNav = false"
                        >
                            {{ subItem.name }}
                        </nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import type { DataNavCategoryStoryblok } from '~/types/storyblok-component-types'

const { getUrl } = useUrlUtils()

const storyblokStore = useStoryblokStore()
const uiStore = useUiStore()

defineProps<{
    ulClasses?: string
}>()

const navItems: ComputedRef<DataNavCategoryStoryblok[] | null | undefined> =
    computed(() => {
        return storyblokStore?.globalOptions?.content.navItems
    })
</script>
