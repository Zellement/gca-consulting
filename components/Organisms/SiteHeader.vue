<template>
    <header
        role="banner"
        :class="headerClasses"
        class="fixed left-0 right-0 top-0 z-50 w-full bg-white py-4 transition-transform duration-500 lg:py-6"
    >
        <div class="grid-layout container container-px">
            <div
                class="relative col-span-9 col-start-2 row-start-1 flex w-full items-center justify-between lg:col-span-10 lg:col-start-2"
            >
                <site-brand class="" />
                <div
                    class="fixed inset-0 z-10 grid h-screen w-full grid-flow-row auto-rows-max grid-cols-12 overflow-y-scroll bg-gray-100 py-4 transition-all duration-300 lg:static lg:inset-auto lg:z-auto lg:flex lg:h-auto lg:overflow-y-visible lg:bg-transparent lg:p-0"
                    :class="mobileNavWrapperClasses"
                >
                    <site-brand
                        class="col-span-10 col-start-2 row-start-1 lg:hidden"
                    />
                    <button
                        class="relative z-10 col-start-11 row-start-1 lg:hidden"
                        aria-label="Close mobile navigation"
                        @click="uiStore.toggleBoolean('showMobileNav', false)"
                    >
                        <svg-icon name="ui/cross" class="ml-auto h-10 w-10" />
                    </button>
                    <site-nav
                        class="col-span-10 col-start-2 row-start-2 mt-8 lg:mt-0 lg:w-full"
                        ul-classes="flex gap-2 flex-col lg:flex-row lg:gap-4 lg:justify-end"
                    />
                </div>
            </div>
            <button
                class="col-start-11 row-start-1 lg:hidden"
                aria-label="Open mobile navigation"
                @click="uiStore.toggleBoolean('showMobileNav', true)"
            >
                <svg-icon name="ui/hamburger" class="ml-auto h-10 w-10" />
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
/* --------------------------
// Interfaces and types
-------------------------- */
interface State {
    showHeader: boolean
    lastScrollPosition: number
    scrollOffset: number
}

/* --------------------------
// States, stores and props
-------------------------- */
const uiStore = useUiStore()

const state: State = reactive({
    showHeader: true,
    lastScrollPosition: 0,
    scrollOffset: 40
})

/* --------------------------
// Computed
-------------------------- */
const headerClasses: ComputedRef<string> = computed(() => {
    return state.showHeader ? 'translate-y-0' : '-translate-y-full'
})

const mobileNavWrapperClasses: ComputedRef<string> = computed(() => {
    return uiStore.showMobileNav
        ? 'translate-x-0'
        : 'translate-x-full lg:translate-x-0'
})

/* --------------------------
// Methods
-------------------------- */
const onScroll = (): void => {
    if (window.scrollY < 0) {
        return
    }
    if (
        Math.abs(window.scrollY - state.lastScrollPosition) < state.scrollOffset
    ) {
        return
    }
    state.showHeader = window.scrollY < state.lastScrollPosition
    state.lastScrollPosition = window.scrollY
}

/* --------------------------
// Hooks and composables
-------------------------- */
onMounted((): void => {
    state.lastScrollPosition = window.scrollY
    window.addEventListener('scroll', onScroll)
})
</script>
