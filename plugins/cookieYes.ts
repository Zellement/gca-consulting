export default defineNuxtPlugin(() => {
    return {
        provide: {
            cookieYes: () => {
                const config = useRuntimeConfig()
                if (config.public.COOKIE_YES_ID) {
                    useHead({
                        script: [
                            {
                                key: 'cookieYes',
                                src: `https://cdn-cookieyes.com/client_data/${config.public.COOKIE_YES_ID}/script.js`,
                                type: 'text/javascript'
                            }
                        ]
                    })
                }
            }
        }
    }
})
