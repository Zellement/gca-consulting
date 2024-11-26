export const usePaginationUtils = () => {
    /**
     * Provides a way to calculate and generate pagination items based on the given parameters.
     * It computes an array representing the pagination items, which might include numbers and ellipses ('...')
     * to indicate skipped pages.
     *
     * @param {Object} args - The pagination parameters object.
     * @param {number} args.totalPosts - Total number of posts/pages.
     * @param {number} args.postsPerPage - Number of posts/pages to display per page.
     * @param {number} args.maxPagesToShow - Maximum number of page numbers to show in the pagination component.
     * @param {number} args.currentPage - The current active page number.
     *
     * @returns {Array.<(number|string)>} An array of elements representing the pagination.
     * Each element can either be a page number (type: number) or an ellipsis (type: string, value: '...')
     * indicating that there are more pages in that direction. Example: [1, '...', 4, 5, 6, '...', 10]
     */
    const getPages = ({
        totalPosts,
        postsPerPage,
        maxPagesToShow,
        currentPage
    }: PaginationOptions): (number | null)[] => {
        const totalPages = Math.ceil(totalPosts / postsPerPage)
        const pages = []

        if (totalPages <= maxPagesToShow)
            return Array.from({ length: totalPages }, (_, i) => i + 1)

        if (currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
            // If the current page is closer to the beginning
            for (let i = 1; i <= maxPagesToShow - 1; i++) {
                pages.push(i)
            }
            pages.push(null, totalPages)
        } else if (currentPage > totalPages - Math.floor(maxPagesToShow / 2)) {
            // If the current page is closer to the end
            pages.push(1, null)
            for (
                let i = totalPages - (maxPagesToShow - 2);
                i <= totalPages;
                i++
            ) {
                pages.push(i)
            }
        } else {
            // If the current page is somewhere in the middle
            pages.push(1, null)
            for (
                let i = currentPage - Math.floor((maxPagesToShow - 3) / 2);
                i <= currentPage + Math.floor((maxPagesToShow - 3) / 2);
                i++
            ) {
                pages.push(i)
            }
            pages.push(null, totalPages)
        }

        return pages
    }

    return {
        getPages
    }
}
