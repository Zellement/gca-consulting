interface UseUiUtilsReturn {
    scrollToTarget: (
        target: HTMLElement,
        duration?: number,
        offset?: number
    ) => void
}

export const useUiUtils = (): UseUiUtilsReturn => {
    //check if browser is chrome or chrome based
    const isChrome = (): boolean => {
        return /Chrome/.test(navigator.userAgent)
    }

    const scrollToTarget = (
        target: HTMLElement,
        duration: number = 500,
        offset: number = 120
    ): void => {
        if (!target) return // Basic error handling for target

        //Required because chrome handles scroll differently and needs to be sped up otherwise it hangs right at the start
        if (isChrome()) {
            duration = duration / 10
        }

        const targetPosition: number =
            target.getBoundingClientRect().top - offset
        const startPosition: number = window.scrollY
        const distance: number = targetPosition - startPosition
        let startTime: number | null = null

        const smoothScroll = (currentTime: number): void => {
            if (!startTime) startTime = currentTime
            const timeElapsed: number = currentTime - startTime
            const progress: number = Math.min(timeElapsed / duration, 1)

            window.scrollTo({
                top: startPosition + distance * progress,
                left: 0
            })

            if (timeElapsed < duration) {
                window.requestAnimationFrame(smoothScroll)
            }
        }

        window.requestAnimationFrame(smoothScroll)
    }

    return {
        scrollToTarget
    }
}
