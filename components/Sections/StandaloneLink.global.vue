<template>
    <section class="container container-px flex w-full">
        <nuxt-link
            class="ml-auto flex items-center gap-4 border-b border-current text-md font-bold text-blue transition-colors hover:text-green-500"
            :to="getUrl(content.link.cached_url)"
        >
            <span>{{ getTitle }}</span>
            <Icon name="ic:baseline-chevron-right" class="size-10" />
        </nuxt-link>
    </section>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionStandaloneLinkStoryblok
}

const props = defineProps<Props>()
const { getUrl } = useUrlUtils()

const getTitle: ComputedRef<string> = computed(() => {
    return props.content.displayText
        ? props.content.displayText
        : props.content.link?.story?.name
          ? props.content.link?.story?.name
          : getUrl(props.content.link.cached_url)
})
</script>
