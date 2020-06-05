import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_ACCESS_TOKEN,
})

const previewClient = createClient({
  space: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_EXAMPLE_CMS_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: 'preview.contentful.com',
})

const getClient = (preview) => (preview ? previewClient : client)

function parseAuthor({ fields }) {
  return {
    name: fields.name,
    picture: fields.picture.fields.file,
  }
}

function parsePortfolio({ fields }) {
  return {
    title: fields.title,
    slug: fields.slug,
    date: fields.date,
    content: fields.content,
    excerpt: fields.excerpt,
    coverImage: fields.coverImage.fields.file,
    author: parseAuthor(fields.author),
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
  return parsePortfolioEntries(entries, (portfolio) => portfolio.fields)
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
    limit: 5,
    order: '-fields.date',
    'fields.slug[nin]': slug,
  })

  return {
    portfolio: parsePortfolioEntries(entry)[0],
    morePortfolios: parsePortfolioEntries(entries),
  }
}
