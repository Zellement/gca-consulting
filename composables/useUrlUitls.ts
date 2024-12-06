export const useUrlUtils = () => {
    /**
     * Converts a string to a slug.
     * @param str - The input string.
     * @returns - The string converted to a slug.
     */
    const getUrl = (full_slug: string): string => {
        if (!full_slug) {
            return '/'
        }

        if (full_slug?.startsWith('http')) {
            return full_slug
        }

        if (full_slug === 'home') {
            return '/'
        }
        // Remove trailing slash
        if (full_slug.endsWith('/')) {
            full_slug = full_slug.slice(0, -1)
        }
        return `/${full_slug}`
    }

    return {
        getUrl
    }
}
