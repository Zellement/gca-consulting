<template>
    <div>{{ content }}</div>
</template>

<script lang="ts" setup>
interface Props {
    content: SectionReviewBlockStoryblok
}

defineProps<Props>()
</script>
