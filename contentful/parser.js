import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_CMS_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CMS_CONTENTFUL_ACCESS_TOKEN,
})

const previewClient = createClient({
  space: process.env.NEXT_CMS_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CMS_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: 'preview.contentful.com',
})

const getClient = preview => (preview ? previewClient : client)

function parseAssets(fields) {
  return (
    fields?.map(item => {
      return {
        title: item.fields.title,
        src: item.fields.file.url,
        meta: item.fields.file.details,
      }
    }) ?? []
  )
}

function parseTechnologies(fields) {
  return (
    fields?.map(item => {
      return {
        url: item.fields.url,
        title: item.fields.name,
        logo: item.fields.logo.fields.file.url,
        meta: item.fields.logo.fields.file.details,
      }
    }) ?? []
  )
}

function parsePortfolio({ fields, sys }) {
  return {
    id: sys.id,
    title: fields.title,
    slug: fields.slug,
    assets: parseAssets(fields.assets),
    content: fields.content,
    excerpt: fields.excerpt,
    coverImage: fields?.headerAsset ?? null,
    technologies: parseTechnologies(fields.technologies),
  }
}

function parsePortfolioEntries(entries, cb = parsePortfolio) {
  return entries?.items?.map(cb)
}

export async function getPreviewPortfolioBySlug(slug) {
  const entries = await getClient(true).getEntries({
    content_type: 'portfolio',
    limit: 1,
    'fields.slug[in]': slug,
  })
  return parsePortfolioEntries(entries)[0]
}

export async function getAllPortfoliosWithSlug() {
  const entries = await client.getEntries({
    content_type: 'portfolio',
    select: 'fields.slug',
  })
  return parsePortfolioEntries(entries, portfolio => portfolio.fields)
}

export async function getAllPortfoliosForHome(preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'portfolio',
    order: '-fields.date',
  })
  return parsePortfolioEntries(entries)
}

export async function getPortfolioAndMorePortfolios(slug, preview) {
  const entry = await getClient(preview).getEntries({
    content_type: 'portfolio',
    limit: 1,
    'fields.slug[in]': slug,
  })
  const entries = await getClient(preview).getEntries({
    content_type: 'portfolio',
    limit: 2,
    order: '-sys.createdAt',
    'fields.slug[nin]': slug,
  })

  return {
    page: parsePortfolioEntries(entry)[0],
    morePages: parsePortfolioEntries(entries),
  }
}
