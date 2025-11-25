// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    ssr: false,

    app: {
        baseURL: '/html/',
        head: {
            title: '世界艾滋病日',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
            ],
            script: [
                {src: '/html/js/jweixin-1.6.0.js'}
            ]
        },
    },

    css: [
        '~/assets/css/globals.css',
        '~/assets/css/style.scss',
    ],

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],

    runtimeConfig: {
        public: {
            apiBaseURL: 'https://hiv.xhwxpos.com',
        },
        app: {
            apiBaseURL: 'https://hiv.xhwxpos.com',
        }
    },

    vite: {
        plugins: [
            // await import('@tailwindcss/vite').then(({default: tailwindcssVite}) => tailwindcssVite()),
        ],
    },

    nitro: {
        devProxy: {
            '/wxh5': {
                target: 'https://hiv.xhwxpos.com/wxh5',
                changeOrigin: true,
            },
        },
    },
})