<template>
    <div class="flex items-baseline justify-between gap-4">
        <button
            v-for="button in buttonActions"
            :key="button.ariaLabel"
            class="embla-nav-button pointer-events-auto"
            :class="button.iconClass"
            :aria-label="button.ariaLabel"
            @click.prevent="button.onClick"
        >
            <svg-icon
                class="embla-nav-button-svg"
                name="chevron-right"
                aria-hidden="true"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
/**
 * Props / Data
 */
const emit = defineEmits<{
    (e: 'scroll', payload: { direction: 'Next' | 'Prev' }): void
}>()

const buttonActions = [
    {
        ariaLabel: 'Previous Image',
        onClick: () => emit('scroll', { direction: 'Prev' }),
        iconClass: '-rotate-180'
    },
    {
        ariaLabel: 'Next Image',
        onClick: () => emit('scroll', { direction: 'Next' }),
        iconClass: ''
    }
]
</script>

<style lang="scss" scoped>
.button-transition {
    @apply transition-colors hover:bg-pink-500 focus:bg-pink-300;
}
</style>
