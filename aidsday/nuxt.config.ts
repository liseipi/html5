// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    ssr: false,
    app: {
        head: {
            title: '世界艾滋病日',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
        },
    },
    css: [
        '~/assets/css/globals.css',
        '~/assets/css/style.scss',
    ],
    vite: {
        plugins: [
            // 导入 Vite 插件（需动态导入以支持 ES 模块）
            () => ({
                name: 'tailwindcss-vite',
                config: () => ({}),
                configureServer(server) {
                    // 无需额外配置
                },
            }),
            // 实际插件：使用 import() 动态加载
            await import('@tailwindcss/vite').then(({default: tailwindcssVite}) => tailwindcssVite()),
        ],
    },
})