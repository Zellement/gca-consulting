export const useNumberUtils = () => {
    /**
     * Returns an error message for a form element.
     * @param title - The element's title, if any
     * @param customMessage - The element's custom error message, if any
     * @returns string - The custom error message, if any, or a default message with the title, if any, or a default error message
     */
    const viewport = useViewport()

    const getMotionDelay = (
        index: number,
        screensAndCols: Record<string, number>
    ) => {
        let delay = 100

        Object.entries(screensAndCols).forEach(([screen, cols]) => {
            if (viewport.isGreaterOrEquals(screen)) {
                const column = index % cols
                delay = 100 + column * 100
            }
        })

        return delay
    }

    return {
        getMotionDelay
    }
}
