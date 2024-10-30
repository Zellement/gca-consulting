export const useIconUtils = () => {
    /**
     * Converts a string to a slug.
     * @param str - The input string.
     * @returns - The string converted to a slug.
     */
    const iconSlug = (str: string | null | number): string => {
        if (!str) return 'check'
        switch (str) {
            case 'Washing Machine':
            case 'Dishwasher':
                return 'droplet'
            case 'Balcony':
            case 'Roof Terrace':
            case 'Terrace':
                return 'sun'
            case 'Bike storage':
                return 'bike'
            case 'Gym':
                return 'gym'
            case 'Porter Security':
                return 'key'
            case 'Pets Allowed':
                return 'pet'
            case 'Double Glazing':
                return 'stacked-diamonds'
            case 'Furnished':
                return 'picture'
            case 'Unfurnished':
                return 'box'
            case 'Large Double Bed':
                return 'bed'
            case '24h Concierge Service':
            case '24hr concierge':
            case 'user-profile':
                return 'user-profile'
            case 'Move In Now':
                return 'arrow-right-in-door'
            case 'Central Living':
                return 'buildings'
            case 'tube':
            case 'Tube':
                return 'tube'
            case 'rail':
            case 'railway':
            case 'Rail':
            case 'Railway':
                return 'rail'
            case 'public-transport':
            case 'Tram':
            case 'Bus':
                return 'public-transport'
            case 'walk':
            case 'Walk':
                return 'walk'
            case 'car':
            case 'Car':
                return 'car'
            case 'Bespoke Events Programme':
            case 'smiley':
                return 'smiley'
            case 'money':
                return 'money'
            case 'key':
                return 'key'
            case 'parcel':
                return 'parcel'
            case 'home':
                return 'home'
        }
        return `check`
    }

    return {
        iconSlug
    }
}
