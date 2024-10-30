<template>
    <nuxt-picture
        ref="image"
        :key="pictureKey"
        class="block transition-all duration-300"
        :src="imgData.url"
        :alt="imgData.alt"
        :class="pictureClasses"
        :sizes="sizes"
        :densities="densities"
        format="webp"
        :loading="loading"
        quality="60"
        :preload="preload"
        @load="mediaLoaded"
    />
</template>

<script lang="ts" setup>
import type { NuxtPicture } from '#components'

/* --------------------------
// TS Types & Interfaces
-------------------------- */

interface Props {
    imgData: ImageTypes
    sizes?: string
    parallax?: boolean
    parallaxSpeed?: number
    densities?: string
    loading?: 'lazy' | 'eager'
    preload?: boolean
}

interface State {
    mediaLoaded: boolean
}

/* --------------------------
// Consts, Props, Refs & State
-------------------------- */

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

        // Add parallax classes
        if (props.parallax) {
            classes.push('!h-[120%] !min-w-full !object-none !object-center')
        }
    } else {
        classes.push('opacity-0')
    }

    return classes.join(' ')
})

/* --------------------------
// Methods
-------------------------- */

const parallaxTransitionClasses = (
    element: InstanceType<typeof NuxtPicture> | null | undefined
): void => {
    if (element && element.$el) {
        const picture = element.$el

        picture.classList.remove('duration-300')

        picture.classList.add('!transition-transform', '!duration-[0.05s]')
    }
}

const parallaxEffect = (
    element: InstanceType<typeof NuxtPicture> | null | undefined
): void => {
    if (element && element.$el) {
        const picture = element.$el
        const container = picture.parentElement

        // Maxes translation so the image does not go out of bounds
        const maxTranslateY =
            (picture.offsetHeight - container.offsetHeight) / 2

        const distanceFromBottom =
            container.getBoundingClientRect().bottom - window.innerHeight

        const scrollY = distanceFromBottom * -1

        let translateY = scrollY * (props.parallaxSpeed / 10)

        // Ensure the actual translation does not exceed the maximum
        translateY = Math.min(translateY, maxTranslateY)

        if (picture) picture.style.transform = `translateY(-${translateY}px)`
    }
}

const mediaLoaded = (): void => {
    state.mediaLoaded = true
}

const handleScroll = () => parallaxEffect(image.value)

/* --------------------------
// Lifecyle
-------------------------- */

// Watch for changes in state.mediaLoaded and add parallax effect
watch(
    () => state.mediaLoaded,
    () => {
        if (props.parallax && !animationsDisabled.value) {
            if (state.mediaLoaded) {
                setTimeout(() => parallaxTransitionClasses(image.value), 300)
            }
            window.addEventListener('scroll', handleScroll)
        }
    }
)

onMounted(() => {
    // This is a fallback to mediaLoaded not running for whatever reason
    // After 1.5s we will assume the media has loaded
    setTimeout(() => {
        mediaLoaded()
    }, 1500)
})

onUnmounted(() => {
    state.mediaLoaded = false
    window.removeEventListener('scroll', handleScroll)
})
</script>
