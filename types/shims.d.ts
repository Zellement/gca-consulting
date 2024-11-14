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

    /**
     * Storyblok Types - imported from storyblok-component-types
     * Note: these will need to be updated if the Storyblok schema changes
     */
    type AssetStoryblok = StoryblokTypes.AssetStoryblok
    type AtomBrowStoryblok = StoryblokTypes.AtomBrowStoryblok
    type AtomCircularCtaStoryblok = StoryblokTypes.AtomCircularCtaStoryblok
    type AtomIconListStoryblok = StoryblokTypes.AtomIconListStoryblok
    type AtomParagraphStoryblok = StoryblokTypes.AtomParagraphStoryblok
    type AtomSingleCtaStoryblok = StoryblokTypes.AtomSingleCtaStoryblok
    type AtomSingleIconStoryblok = StoryblokTypes.AtomSingleIconStoryblok
    type AtomTextAndIconStoryblok = StoryblokTypes.AtomTextAndIconStoryblok
    type AtomTitleStoryblok = StoryblokTypes.AtomTitleStoryblok
    type DataCallToActionStoryblok =
        ISbStoryData<StoryblokTypes.DataCallToActionStoryblok>
    type DataMediaTilesStoryblok =
        ISbStoryData<StoryblokTypes.DataMediaTilesStoryblok>
    type DataNavItemStoryblok =
        ISbStoryData<StoryblokTypes.DataNavItemStoryblok>
    type DataNavSectionStoryblok =
        ISbStoryData<StoryblokTypes.DataNavSectionStoryblok>
    type DataPerksStoryblok = ISbStoryData<StoryblokTypes.DataPerksStoryblok>
    type DataSingleFaqStoryblok =
        ISbStoryData<StoryblokTypes.DataSingleFaqStoryblok>
    type DataSingleReviewStoryblok =
        ISbStoryData<StoryblokTypes.DataSingleReviewStoryblok>
    type DataSocialLinkStoryblok = ISbStoryData<DataSocialLinkStoryblok>
    type DataTextWithCarouselStoryblok =
        ISbStoryData<StoryblokTypes.DataTextWithCarouselStoryblok>
    type MetaGlobalOptionsStoryblok = StoryblokTypes.MetaGlobalOptionsStoryblok
    type MoleculeNavSectionStoryblok =
        StoryblokTypes.MoleculeNavSectionStoryblok
    type MoleculeSectionTitleStoryblok =
        StoryblokTypes.MoleculeSectionTitleStoryblok
    type MoleculeSignpostStoryblok = StoryblokTypes.MoleculeSignpostStoryblok
    type MultiassetStoryblok = StoryblokTypes.MultiassetStoryblok
    type MultilinkStoryblok = StoryblokTypes.MultilinkStoryblok
    type OrganismTextContentStoryblok =
        StoryblokTypes.OrganismTextContentStoryblok
    type RichtextStoryblok = StoryblokTypes.RichtextStoryblok
    type SectionApartmentTypesStoryblok =
        StoryblokTypes.SectionApartmentTypesStoryblok
    type SectionCardBlockStoryblok = StoryblokTypes.SectionCardBlockStoryblok
    type SectionGalleryCarouselStoryblok =
        StoryblokTypes.SectionGalleryCarouselStoryblok
    type SectionGenericContentStoryblok =
        StoryblokTypes.SectionGenericContentStoryblok
    type SectionGenericHeroStoryblok =
        StoryblokTypes.SectionGenericHeroStoryblok
    type SectionMediaTilesStoryblok = StoryblokTypes.SectionMediaTilesStoryblok
    type SectionPatternDividerStoryblok =
        StoryblokTypes.SectionPatternDividerStoryblok
    type SectionPerksBlockStoryblok = StoryblokTypes.SectionPerksBlockStoryblok
    type SectionPropertyFloorplanStoryblok =
        StoryblokTypes.SectionPropertyFloorplanStoryblok
    type SectionReviewsBlockStoryblok =
        StoryblokTypes.SectionReviewsBlockStoryblok
    type SectionSignpostsStoryblok = StoryblokTypes.SectionSignpostsStoryblok
    type SectionSocialFeedStoryblok = StoryblokTypes.SectionSocialFeedStoryblok
    type SectionTextWithCarouselStoryblok =
        StoryblokTypes.SectionTextWithCarouselStoryblok
    type TemplateListingsStoryblok = StoryblokTypes.TemplateListingsStoryblok
    type TemplatePageStoryblok = StoryblokTypes.TemplatePageStoryblok
    type TemplateRoomStoryblok = StoryblokTypes.TemplateRoomStoryblok
}

export {}
