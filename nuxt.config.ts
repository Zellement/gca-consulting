import { defineNuxtConfig } from 'nuxt/config'
import eslintVitePlugin from 'vite-plugin-eslint'
import { fileURLToPath } from 'url'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Fix for issue - https://github.com/nuxt-modules/tailwindcss/issues/480
    devServerHandlers: [],

    ssr: true,

    nitro: {
        compressPublicAssets: true,
        minify: true
    },

    modules: [
        '@nuxt/image',
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/svg-sprite',
        'nuxt-viewport',
        '@nuxtjs/seo',
        '@nuxt/fonts',
        'nuxt-aos'
    ],

    svgSprite: {
        input: '~/assets/icons/svg',
        output: '~/assets/icons/sprites'
    },

    tailwindcss: {
        cssPath: '~/assets/scss/app.scss'
    },

    image: {
        domains: [
            'https://a.storyblok.com',
            'localhost',
        ],
        screens: {
            '3xs': 21 * 16,
            '2xs': 23 * 16,
            xs: 25.625 * 16,
            sm: 30 * 16,
            'sm-md': 35 * 16,
            md: 43.125 * 16,
            lg: 54.875 * 16,
            xl: 79.6875 * 16,
            '2xl': 90 * 16,
            '3xl': 100 * 16,
            max: 1920
        }
    },

    css: ['@/assets/scss/app.scss'],

site: {
        trailingSlash: false,
        url: import.meta.env.WEBSITE_URL,
        name: 'Student by Way of Life',
        description: 'Find your home away from home',
        defaultLocale: 'en' // not needed if you have @nuxtjs/i18n installed,
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],

    viewport: {
        breakpoints: {
            initial: 0,
            '3xs': 21 * 16, // 336px
            '2xs': 23 * 16, // 368px
            xs: 25.625 * 16, // 410px
            sm: 30 * 16, // 480px
            'sm-md': 35 * 16, // 560px
            md: 43.125 * 16, // 690px
            lg: 54.875 * 16, // 878px
            xl: 79.6875 * 16, // 1275px
            '2xl': 90 * 16, // 1440px
            '3xl': 100 * 16, // 1600px
            max: 1848 // 1848px
        },
        fallbackBreakpoint: 'initial'
    },

    // Allows for local testing on devices
    devServer: {
        port: 3000, // default: 3000
        host: '0.0.0.0' // default: localhost
    },

    alias: {
        '@blocks': fileURLToPath(
            new URL('./components/Organisms/NestedBlocks/', import.meta.url)
        )
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'description',
                    content: 'something'
                },
                { hid: 'og-type', property: 'og:type', content: 'website' }
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.png'
                }
                // {
                //     rel: 'preconnect',
                //     href: 'https://www.googletagmanager.com'
                // },
                // {
                //     rel: 'preconnect',
                //     href: 'https://www.google-analytics.com'
                // },
                // {
                //     rel: 'preconnect',
                //     href: 'https://googleads.g.doubleclick.net'
                // },
                // {
                //     rel: 'preconnect',
                //     href: 'https://www.google.com'
                // },
                // {
                //     rel: 'preconnect',
                //     href: 'https://www.google.nl'
                // },
                // {
                //     rel: 'preload',
                //     as: 'script',
                //     href: `https://www.googletagmanager.com/gtm.js?id=${import.meta.env.GTM_ID}`
                // }
            ],
            script: [
                // {
                //     hid: 'gtm-script',
                //     innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${import.meta.env.GTM_ID}');`,
                //     type: 'text/javascript'
                // }
            ]
        },
        pageTransition: { name: 'page', mode: 'out-in' }
    },

    runtimeConfig: {
        public: {
            WEBSITE_URL: import.meta.env.WEBSITE_URL,
            MARKER_ID: import.meta.env.MARKER_ID,
            MARKER_ENABLED: import.meta.env.MARKER_ENABLED,
            COOKIE_YES_ID: import.meta.env.COOKIE_YES_ID,
            GTM_ID: import.meta.env.GTM_ID
        }
    },

    vite: {
        plugins: [
            eslintVitePlugin({
                fix: true,
                include: ['./**/*.vue', './**/*.ts', './**/*.js']
            })
        ]
    },

    typescript: {
        typeCheck: true,
        strict: true,
        tsConfig: {
            compilerOptions: {
                strict: true
            },
            include: [
                '@pinia/nuxt',
                '@types/node',
                '@nuxt/image',
                '@nuxt/types',
                '**/*.d.ts'
            ]
        }
    },

    aos: {
        easing: 'ease-in-out',
        once: true
    },

    devtools: { enabled: true },

    compatibilityDate: '2024-08-08'
})
