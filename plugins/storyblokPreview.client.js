export default defineNuxtPlugin((nuxtApp) => {
    const route = useRoute()
    const preview = route.query?._storyblok || false

    if (preview) {
        nuxtApp.hook('page:finish', () => {
            refreshNuxtData()
        })
    }

    if (preview) {
        const script = document.createElement('script')
        script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js'
        script.async = true
        script.onload = () => {
            const { StoryblokBridge, location } = window
            const storyblokInstance = new StoryblokBridge({
                resolveRelations: [
                    'sectionCardBlock.cards',
                    'sectionCardCarousel.cards',
                    'sectionReviewBlock.reviews'
                ],
                preventClicks: true
            })

            storyblokInstance.on(['published', 'change'], () => {
                // reload page if save or publish is clicked
                location.reload()
            })
        }
        document.head.appendChild(script)
    }

    return { provide: { preview } }
})
