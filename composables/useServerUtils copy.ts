export const useServerUtils = () => {
    //Checks if the user agent is a bot or google PSI
    const checkUserAgent = (agent: string) => {
        return /bot|crawler|spider|crawling|Chrome-Lighthouse|moto g power|HeadlessChrome/i.test(
            agent
        )
    }
    return {
        checkUserAgent
    }
}
