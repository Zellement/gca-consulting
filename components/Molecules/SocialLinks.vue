<template>
    <div v-if="socialLinks">
        <nuxt-link
            v-for="link in socialLinks"
            :key="link.id"
            :to="link.content.url"
            :title="`Go to ${link.name}`"
            target="_blank"
        >
            <Icon :name="iconFinder(link?.content.icon)" class="size-5" />
        </nuxt-link>
    </div>
</template>

<script lang="ts" setup>
import type { DataSocialLinkStoryblok } from '@/types/storyblok-component-types'
const { iconFinder } = useIconUtils()
const storyblokStore = useStoryblokStore()

const socialLinks: ComputedRef<DataSocialLinkStoryblok[] | null> = computed(
    () => {
        return storyblokStore?.getGlobalOptionsContent?.socialLinks ?? null
    }
)
</script>
