import * as StoryblokTypes from './storyblok-component-types'

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

    type EmblaScrollEvents = 'next' | 'prev' | 'to'

    /**
     * Storyblok Types - imported from storyblok-component-types
     * Note: these will need to be updated if the Storyblok schema changes
     */

    interface MappedBlock {
        id: string
        component: DefineComponent<object, object, any>
        content?: SectionTypesStoryblok
        contentType?: string
    }

    type SectionTypesStoryblok = SectionCardBlockStoryblok

    type AssetStoryblok = StoryblokTypes.AssetStoryblok
    type MetaGlobalOptionsStoryblok = StoryblokTypes.MetaGlobalOptionsStoryblok
    type MultiassetStoryblok = StoryblokTypes.MultiassetStoryblok
    type AtomHeroSlideStoryblok = StoryblokTypes.AtomHeroSlideStoryblok
    type TemplatePageStoryblok = StoryblokTypes.TemplatePageStoryblok
    type TemplateLocationStoryblok = StoryblokTypes.TemplateLocationStoryblok
    type SectionCardBlockStoryblok = StoryblokTypes.SectionCardBlockStoryblok
}

export {}
