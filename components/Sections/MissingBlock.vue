<template>
    <div v-show="isDebugMode" class="bg-gray-100 py-16 lg:py-24">
        <P> BLOCK IS MISSING </P>
        <pre>{{ content }}</pre>
    </div>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'

defineProps<{
    content: object
}>()

const isDebugMode: ComputedRef<boolean> = computed(() => {
    return process.env.NODE_ENV !== 'production'
})
</script>
