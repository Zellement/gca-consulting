export const useObjectUtils = () => {
    /**
     * Removes empty object keys from an object
     * @param {T} obj
     * @returns {Partial<T>}
     */
    const removeEmptyObjectKeys = <T extends object>(obj: T): Partial<T> => {
        return Object.keys(obj).reduce<Partial<T>>((acc, key) => {
            const value = obj[key as keyof T]

            if (value !== null && value !== undefined && value !== '') {
                acc[key as keyof T] = value
            }
            return acc
        }, {} as Partial<T>)
    }

    /**
     * Returns a filtered object of accepted keys and their values.
     * @param {T} args - The input object.
     * @param {Array<keyof T>} acceptedArgs - The keys to filter.
     * @returns {Partial<T>} - A partial object containing only the accepted keys.
     */
    const filterObjectKeys = <T extends object>(
        args: T,
        acceptedArgs: Array<keyof T>
    ): Partial<T> => {
        return acceptedArgs.reduce<Partial<T>>((acc, key) => {
            if (key in args) {
                acc[key] = args[key]
            }
            return acc
        }, {})
    }

    return {
        removeEmptyObjectKeys,
        filterObjectKeys
    }
}
