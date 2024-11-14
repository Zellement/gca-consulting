<template>
    <nav v-if="navigation" class="site-nav">
        <ul class="my-auto lg:mr-4" :class="ulClasses">
            <li
                v-for="navItem in navigation"
                :key="navItem.key"
                class="group relative"
            >
                <nuxt-link
                    :to="navItem.url"
                    @click="uiStore.toggleBoolean('showMobileNav', false)"
                >
                    {{ navItem.label }}
                </nuxt-link>
                <ul
                    v-if="navItem.subItems && navItem.subItems.length > 0"
                    class="z-10 flex flex-col bg-gray-100 p-4 lg:absolute lg:right-0 lg:top-full lg:z-20 lg:hidden lg:w-[300px] lg:text-right lg:group-hover:block"
                >
                    <li
                        v-for="subItem in navItem.subItems"
                        :key="subItem.key"
                        class="ml-4 lg:m-0"
                    >
                        <nuxt-link
                            :to="subItem.url"
                            @click="
                                uiStore.toggleBoolean('showMobileNav', false)
                            "
                        >
                            {{ subItem.label }}
                        </nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
const uiStore = useUiStore()

defineProps<{
    ulClasses?: string
}>()

const navigation: NavItem[] = [
    {
        key: 'home',
        label: 'Home',
        url: '/'
    },
    {
        key: 'about-us',
        label: 'About',
        url: '/about-us'
    },
    {
        key: 'services',
        label: 'Services',
        url: '/services',
        subItems: [
            {
                key: 'webDevelopment',
                label: 'Web Development',
                url: '/services/web-development'
            },
            {
                key: 'graphicDesign',
                label: 'Graphic Design',
                url: '/services/graphic-design'
            }
        ]
    },
    {
        key: 'blog',
        label: 'Blog',
        url: '/blog'
    },
    {
        key: 'contact',
        label: 'Contact',
        url: '/contact'
    }
]
</script>
