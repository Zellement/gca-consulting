// Define your URLs here for the sitemap

// import * as contentful from 'contentful'

// export default defineEventHandler(async () => {
//     const config = useRuntimeConfig()

//     const createClientFunction = contentful?.default?.createClient

//     const client = createClientFunction({
//         space: config.public.CTF_SPACE_ID,
//         accessToken: config.public.CTF_CDA_ACCESS_TOKEN,
//         environment: config.public.CTF_ENVIRONMENT
//     })

//     // Pages
//     const pages = await client.getEntries({
//         content_type: 'pages',
//         limit: 250
//     })

//     const mappedPages = pages.items.map((item) => {
//         return { loc: item.fields.slug, lastmod: item.sys.updatedAt, _sitemap: 'pages' }
//     })

//     // Work
//     const work = await client.getEntries({
//         content_type: 'caseStudies',
//         limit: 250
//     })

//     const mappedWork = work.items.map((item) => {
//         return { loc: 'work/' + item.fields.slug, lastmod: item.sys.updatedAt, _sitemap: 'pages' }
//     })

//     // Ideas
//     const ideas = await client.getEntries({
//         content_type: 'ideas',
//         limit: 250
//     })

//     const mappedIdeas = ideas.items.map((item) => {
//         return { loc: 'ideas/' + item.fields.slug, lastmod: item.sys.updatedAt, _sitemap: 'pages' }
//     })

//     // Careers
//     const careers = await client.getEntries({
//         content_type: 'jobAdvert',
//         limit: 250
//     })

//     const mappedCareers = careers.items.map((item) => {
//         return { loc: 'careers/' + item.fields.slug, lastmod: item.sys.updatedAt, _sitemap: 'pages' }
//     })

//     const allMappedItems = [...mappedPages, ...mappedWork, ...mappedIdeas, ...mappedCareers]

//     return allMappedItems
// })
