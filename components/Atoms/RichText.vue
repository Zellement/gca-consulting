<template>
    <div v-if="renderedText" v-dompurify-html="renderedText" class="content" />
</template>

<script lang="ts" setup>
import { richTextResolver } from '@storyblok/richtext'

interface Props {
    content: any
}

const props = defineProps<Props>()

const { render } = richTextResolver()

const renderedText: ComputedRef<unknown> = computed(() => {
    if (typeof props?.content === 'string') {
        return props?.content
    }

    return render(props?.content)
})
</script>
