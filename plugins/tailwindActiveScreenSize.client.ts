import { screens } from '~/tailwind.config'
type Screens = Record<string, string>

export default defineNuxtPlugin(() => {
    // Only run the script in a development environment and on client-side
    if (process.env.NODE_ENV !== 'development' || process.server) {
        return
    }

    const screenSizes: Screens = screens

    const updateScreenSize = (): void => {
        const screenSizeContainer: HTMLDivElement = document.getElementById(
            'tw-screen-size-container'
        ) as HTMLDivElement

        const width: number = window.innerWidth
        let screenSize: string = ''

        Object.entries(screenSizes).forEach(([key, size]) => {
            const minWidth = parseFloat(size.replace('rem', '')) * 16
            if (
                width >= minWidth &&
                width <
                    (parseFloat(screenSizes[key + 1]?.replace('rem', '')) *
                        16 || Infinity)
            ) {
                screenSize = key
            }
        })

        screenSizeContainer.innerText = 'screen: ' + screenSize
    }

    const screenSizeContainer: HTMLDivElement = document.createElement('div')
    screenSizeContainer.className =
        'fixed bottom-0 left-0 bg-black text-white font-bold text-[12px] px-2'
    screenSizeContainer.style.zIndex = '9999'
    screenSizeContainer.id = 'tw-screen-size-container'

    document.body.appendChild(screenSizeContainer)

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
})
