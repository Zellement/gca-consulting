<template>
    <div class="relative h-full">
        <Icon
            name="svg-spinners:eclipse"
            class="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
        />
        <picture>
            <source
                v-for="size in sizes"
                :key="size.from"
                type="image/webp"
                :media="`(min-width: ${size.from})`"
                :srcset="`${url}/m/${size.dimensions}/filters:format(webp)`"
            />
            <img
                :src="`${url}/m/${sizes[0].dimensions}`"
                :alt="alt"
                :loading="loading ?? 'lazy'"
                class="relative h-full w-full"
            />
        </picture>
    </div>
</template>

<script lang="ts" setup>
/* --------------------------
// TS Types & Interfaces
-------------------------- */

interface Props {
    url: string
    alt: string
    sizes: Sizes[]
    loading?: 'lazy' | 'eager'
}

interface Sizes {
    dimensions: string
    from: string
}

defineProps<Props>()
</script>
