<template>
    <figure class="relative flex h-full w-full overflow-clip">
        <div
            v-if="!state.mediaLoaded"
            class="absolute inset-0 flex"
            aria-hidden="true"
        >
            <Icon
                name="svg-spinners:3-dots-scale"
                class="m-auto size-10 text-blue opacity-50"
            />
        </div>

        <nuxt-picture
            v-bind="$attrs"
            ref="image"
            :key="pictureKey"
            class="relative block transition-all duration-200"
            :src="imgData.url"
            :alt="imgData.alt"
            :sizes="sizes"
            :densities="densities"
            :class="pictureClasses"
            format="webp"
            :loading="loading"
            quality="60"
            :preload="preload"
            @load="mediaLoaded"
        />
    </figure>
</template>

<script lang="ts" setup>
import type { NuxtPicture } from '#components'

/* --------------------------
// TS Types & Interfaces
-------------------------- */

interface Props {
    imgData: ImageTypes
    sizes?: string
    densities?: string
    loading?: 'lazy' | 'eager'
    preload?: boolean
    noBg?: boolean
}

interface State {
    mediaLoaded: boolean
}

/* --------------------------
// Consts, Props, Refs & State
-------------------------- */

const emit = defineEmits<{
    (e: 'loaded'): void
}>()

const route = useRoute()
const uiStore = useUiStore()

const props = withDefaults(defineProps<Props>(), {
    parallax: false,
    parallaxSpeed: 1,
    sizes: '336px 3xs:100vw 3xl:1920px',
    densities: 'x1 x2',
    loading: 'lazy',
    preload: false
})

const state: State = reactive({
    mediaLoaded: false
})

const image = ref<InstanceType<typeof NuxtPicture> | null | undefined>(null)

/* --------------------------
// Computed
-------------------------- */

const pictureKey: ComputedRef<string> = computed(() => {
    return `${route.fullPath}-${props.imgData.url}`
})

const animationsDisabled: ComputedRef<boolean> = computed(() => {
    return uiStore.animationsDisabled
})

const pictureClasses: ComputedRef<string> = computed(() => {
    let classes = []

    if (animationsDisabled.value) {
        classes.push('!opacity-100')
    }

    if (state.mediaLoaded) {
        classes.push('opacity-100')
    } else {
        classes.push('opacity-0')
    }

    return classes.join(' ')
})

/* --------------------------
// Methods
-------------------------- */

const mediaLoaded = (): void => {
    state.mediaLoaded = true
    emit('loaded')
}

/* --------------------------
// Lifecyle
-------------------------- */

onMounted(() => {
    // This is a fallback to mediaLoaded not running for whatever reason
    // After 1.5s we will assume the media has loaded
    setTimeout(() => {
        mediaLoaded()
    }, 1500)
})

onUnmounted(() => {
    state.mediaLoaded = false
})
</script>
