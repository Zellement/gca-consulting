export const useIconUtils = () => {
    /**
     * Converts a string to a slug.
     * @param str - The input string.
     * @returns - The string converted to a slug.
     */
    const iconSlug = (str: string | null | number | undefined): string => {
        if (!str) return 'check'
        switch (str) {
            case 'X':
            case 'x':
            case 'Twitter':
            case 'twitter':
                return 'hugeicons:new-twitter'
            case 'Facebook':
            case 'facebook':
                return 'hugeicons:facebook-02'
            case 'LinkedIn':
            case 'linkedin':
                return 'hugeicons:linkedin-02'
            case 'Instagram':
            case 'instagram':
                return 'hugeicons:instagram'
        }
        return `check`
    }

    return {
        iconSlug
    }
}
