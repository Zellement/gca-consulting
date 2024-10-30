export const useErrorUtils = () => {
    /**
     * Returns an error message for a form element.
     * @param title - The element's title, if any
     * @param customMessage - The element's custom error message, if any
     * @returns string - The custom error message, if any, or a default message with the title, if any, or a default error message
     */

    const formElementError = (
        title?: string,
        customMessage?: string
    ): string => {
        return customMessage
            ? customMessage
            : title
              ? `${title} is required`
              : 'This field is required'
    }

    return {
        formElementError
    }
}
