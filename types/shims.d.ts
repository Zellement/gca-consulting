import type {
    DataSocialLinkStoryblok,
    TemplateNewsStoryblok,
    TemplatePageStoryblok
} from './storyblok-component-types'

declare global {
    type AllTypes =
        | TemplatePageStoryblok
        | TemplateNewsStoryblok
        | DataSocialLinkStoryblok
        | null

    type ImageTypes = {
        url: string
        alt?: string
        caption?: string
    }

    type NavItem = {
        key: string
        label: string
        url: string
        subItems?: NavItem[]
    }

    interface UtmParameters {
        [key: `utm_${string}`]: string
    }
}

export {}
