<template>
    <figure :class="['relative overflow-clip']">
        <picture>
            <source
                v-for="size in sizes"
                :key="size"
                :srcset="`${url}/m/${size}`"
                :media="`(min-width: ${size.split('x')[0]}px)`"
            />
            <img :src="`${url}/m/500x500`" :alt="alt" :loading="loading" />
        </picture>
    </figure>
</template>

<script lang="ts" setup>
// import type { NuxtImg } from '#components'

/* --------------------------
// TS Types & Interfaces
-------------------------- */

interface Props {
    url: string
    alt: string
    sizes: string[]
    loading?: 'lazy' | 'eager'
}

defineProps<Props>()

// interface Props {
//     imgData: ImageTypes
//     sizes?: string
//     parallax?: boolean
//     parallaxSpeed?: number
//     parallaxPercentage?: number
//     loading?: 'lazy' | 'eager'
//     preload?: boolean
//     caption?: string | null
//     pictureClasses?: string | string[]
//     fit?: 'cover' | 'contain'
//     width?: number | string
//     height?: number | string
//     fullscreen?: boolean
// }

// interface State {
//     mediaLoaded: boolean
// }

// /* --------------------------
// // Consts, Props, Refs & State
// -------------------------- */

// const route = useRoute()
// const uiStore = useUiStore()
// const attrs = useAttrs()
// const viewport = useViewport()

// const props = withDefaults(defineProps<Props>(), {
//     parallax: false,
//     parallaxSpeed: 1,
//     parallaxPercentage: 0.5,
//     sizes: '336px 2xs:368px xs:410px sm:480px md:690px lg:878px xl:1024px 2xl:1162px 3xl:1299px max:1520px',
//     loading: 'lazy',
//     preload: false,
//     caption: null,
//     pictureClasses: undefined,
//     width: undefined,
//     height: undefined,
//     fit: 'cover',
//     layout: 'responsive'
// })

// const srcSetSizes: ComputedRef<string> = computed(() =>
//     props.fullscreen ? props.sizes + ' fullscreen:100vw' : props.sizes
// )

// const state: State = reactive({
//     mediaLoaded: false
// })

// const image = ref<InstanceType<typeof NuxtPicture> | null | undefined>(null)

// const emit = defineEmits<{
//     (e: 'loaded'): void
// }>()

// /* --------------------------
// // Computed
// -------------------------- */
// const aspectRatioClass: ComputedRef<string> = computed(() => {
//     const classes = [attrs.class].join(' ')

//     // Match all aspect-* classes
//     const matches = classes.match(/\b(?:[a-z]{2,}:)?aspect-[a-z0-9/-]+\b/g)

//     if (!matches) return ''

//     // Filter responsive variants
//     const responsiveVariants = matches.filter((match) => match.includes(':'))

//     // Reverse the responsiveVariants array and iterate through it
//     for (const variant of [...responsiveVariants].reverse()) {
//         const [screen, ratio] = variant.split(':')
//         if (viewport.isGreaterOrEquals(screen)) {
//             return ratio // Return the first matching responsive variant (largest)
//         }
//     }

//     // Fallback to the first non-responsive aspect-* class
//     return matches.find((match) => !match.includes(':')) || ''
// })

// //copied from tailwind config
// const definedAspectRatios: Record<string, string> = {
//     square: '1 / 1',
//     video: '16 / 9',
//     landscape: '383 / 235',
//     '2/3': '2 / 3',
//     '5/2': '5 / 2',
//     '2/1': '2 / 1',
//     tall: '390 / 550'
// }

// const imageAspectRatio: ComputedRef<{
//     width: number | undefined
//     height: number | undefined
// }> = computed(() => {
//     if (!aspectRatioClass.value) return { width: undefined, height: undefined }

//     const key: string = aspectRatioClass.value.replace('aspect-', '')
//     const ratio: string = definedAspectRatios[key]

//     if (!ratio) return { width: undefined, height: undefined }

//     return {
//         width: parseInt(ratio.split(' / ')[0]),
//         height: parseInt(ratio.split(' / ')[1])
//     }
// })

// const imageWidth: ComputedRef<number | string | undefined> = computed(() => {
//     return props.width || imageAspectRatio.value.width
// })

// const imageHeight: ComputedRef<number | string | undefined> = computed(() => {
//     return props.height || imageAspectRatio.value.height
// })

// const pictureKey: ComputedRef<string> = computed(() => {
//     return `${route.fullPath}-${props.imgData.url}`
// })

// const animationsDisabled: ComputedRef<boolean> = computed(() => {
//     return uiStore.animationsDisabled
// })

// const pictureClassList: ComputedRef<string> = computed(() => {
//     if (Array.isArray(props.pictureClasses)) {
//         return props.pictureClasses.join(' ')
//     }

//     return props.pictureClasses ?? ''
// })

// const pictureTransitionClasses: ComputedRef<string> = computed(() => {
//     return animationsDisabled.value
//         ? '!opacity-100'
//         : state.mediaLoaded
//           ? 'opacity-100'
//           : 'opacity-0'
// })

// const provider: ComputedRef<string> = computed(() => {
//     const isStoryblokDomain = props.imgData.url?.includes('storyblok.com')
//     const isDevelopment = import.meta.dev ?? false

//     if (isStoryblokDomain) return 'storyblok'
//     return isDevelopment ? 'ipx' : 'netlify'
// })

// const fitClasses: ComputedRef<string> = computed(() => {
//     return props.fit === 'cover'
//         ? 'object-cover h-full w-full'
//         : 'object-contain'
// })

// /* --------------------------
// // Methods
// -------------------------- */

// const mediaLoaded = (): void => {
//     state.mediaLoaded = true
//     emit('loaded')
// }

// onUnmounted(() => {
//     // window.removeEventListener('resize', getImageDimensions)
//     state.mediaLoaded = false
// })
</script>
