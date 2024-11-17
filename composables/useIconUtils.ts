export const useIconUtils = () => {
    /**
     * Converts a string to a slug.
     * @param str - The input string.
     * @returns - The string converted to a slug.
     */
    const iconFinder = (str: string | null | number | undefined): string => {
        if (!str) return 'check'
        switch (str) {
            case 'X':
            case 'x':
            case 'Twitter':
            case 'twitter':
                return 'ri:twitter-x-fill'
            case 'Facebook':
            case 'facebook':
                return 'uil:facebook'
            case 'LinkedIn':
            case 'linkedin':
                return 'uil:linkedin'
            case 'Instagram':
            case 'instagram':
                return 'uil:instagram-alt'
        }
        return `check`
    }

    return {
        iconFinder
    }
}
