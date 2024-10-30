<template>
    <div
        class="transiton-opacity site-footer mt-32 flex bg-white/20 text-current backdrop-blur-lg duration-1000 hover:opacity-100 dark:bg-black/20"
    >
        <footer
            role="contentinfo"
            class="relative z-10 w-full transition-transform duration-500"
        >
            <div class="container grid-layout container-px py-8">
                <div
                    class="col-span-10 col-start-2 flex flex-col justify-between gap-8 lg:flex-row"
                >
                    <div class="flex flex-row items-center gap-4">
                        <site-brand />
                        <p class="flex flex-row gap-1 text-xs">
                            <span>&copy;</span> <span>{{ date }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts" setup>
const date: ComputedRef<number> = computed(() => {
    return new Date().getFullYear()
})
</script>
