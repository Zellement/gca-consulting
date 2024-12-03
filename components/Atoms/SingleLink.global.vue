<template>
    <nuxt-link
        class="flex items-center gap-4 border-b border-current text-blue transition-colors hover:text-green-500"
        :to="getUrl(content.link.cached_url ?? content.link.url)"
        :class="alignText"
    >
        <span>{{ getTitle }}</span>
        <Icon name="ic:baseline-chevron-right" class="size-10" />
    </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
    content: AtomSingleLinkStoryblok
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

const alignText: ComputedRef<string> = computed(() => {
    switch (props.content.alignment) {
        case 'centre':
            return 'mx-auto'
        case 'right':
            return 'ml-auto'
        default:
            return 'mr-auto'
    }
})
</script>
