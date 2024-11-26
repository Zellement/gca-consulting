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

    interface MetaTags {
        title: string
        description: string
        og_title: string
        og_description: string
        og_image: string
    }

    /**
     * Pagination
     */
    interface PaginationOptions {
        totalPosts: number
        postsPerPage: number
        maxPagesToShow: number
        currentPage: number
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

    type SectionTypesStoryblok =
        | SectionCardBlockStoryblok
        | SectionCardCarouselStoryblok
        | SectionReviewBlockStoryblok

    type AtomHeroSlideStoryblok = StoryblokTypes.AtomHeroSlideStoryblok
    type AtomSingleLinkStoryblok = StoryblokTypes.AtomSingleLinkStoryblok
    type AssetStoryblok = StoryblokTypes.AssetStoryblok
    type MultiassetStoryblok = StoryblokTypes.MultiassetStoryblok

    type MetaGlobalOptionsStoryblok = StoryblokTypes.MetaGlobalOptionsStoryblok

    type DataSingleReviewStoryblok = StoryblokTypes.DataSingleReviewStoryblok
    type DataSinglePrinciple = StoryblokTypes.DataSinglePrinciple

    type SectionCardBlockStoryblok = StoryblokTypes.SectionCardBlockStoryblok
    type SectionCardCarouselStoryblok =
        StoryblokTypes.SectionCardCarouselStoryblok
    type SectionReviewBlockStoryblok =
        StoryblokTypes.SectionReviewBlockStoryblok
    type SectionTextMediaStoryblok = StoryblokTypes.SectionTextMediaStoryblok
    type SectionStandaloneLinkStoryblok =
        StoryblokTypes.SectionStandaloneLinkStoryblok
    type SectionPdfDownloadBlockStoryblok =
        StoryblokTypes.SectionPdfDownloadBlockStoryblok
    type SectionIconGridStoryblok = StoryblokTypes.SectionIconGridStoryblok

    type TemplatePageStoryblok = StoryblokTypes.TemplatePageStoryblok
    type TemplateLocationStoryblok = StoryblokTypes.TemplateLocationStoryblok
    type TemplateNewsStoryblok = StoryblokTypes.TemplateNewsStoryblok
}

export {}
