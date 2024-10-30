export default defineNuxtPlugin((nuxtApp: any) => {
    ;(nuxtApp.$router as any).options.scrollBehavior = (
        _to: any,
        _from: any,
        _savedPosition: any
    ) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ left: 0, top: 0, behavior: 'smooth' })
            }, 0)
        })
    }
})
