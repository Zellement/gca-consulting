<template>
    <div
        class="panel-base !fixed left-0 !z-[9999] grid place-items-center bg-blue-50 text-black"
        :class="uiStore.pageIsLoading ? 'top-0' : 'top-full delay-200'"
    >
        <div
            class="panel-base bg-blue-100"
            :class="
                uiStore.pageIsLoading ? 'top-0 delay-100' : 'top-full delay-200'
            "
        />
        <div
            class="panel-base bg-dry-blue-200"
            :class="uiStore.pageIsLoading ? 'top-0 delay-200' : 'top-full'"
        />
        <div
            class="z-50 transition-opacity"
            :class="
                uiStore.pageIsLoading
                    ? 'opacity-100 delay-200'
                    : 'opacity-0 delay-200'
            "
        >
            GCA Consulting
            <svg-icon name="logo-wol" class="h-[54px] w-[181px]" />
        </div>
    </div>
</template>

<script setup lang="ts">
const uiStore = useUiStore()
</script>

<style scoped lang="scss">
.panel-base {
    @apply absolute bottom-0 z-0 w-screen transition-[top] duration-700 ease-in-out;
}
</style>
