import PropTypes from 'prop-types'
import * as styles from './portfolioPage.module.scss'
import {
  getPortfolioAndMorePortfolios,
  getAllPortfoliosWithSlug,
} from '../../contentful/parser'
const PortfolioPage = ({ preview, page, morePages }) => (
  <div className={styles.container}>
    <h1>{page.title}</h1>
    {JSON.stringify({
      preview,
      page,
      morePages,
    })}
  </div>
)

PortfolioPage.defaultProps = {
  preview: false,
}
const PAGE_SHAPE = {
  id: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  assets: PropTypes.arrayOf(PropTypes.object),
  content: PropTypes.object,
  excerpt: PropTypes.string,
  coverImage: PropTypes.object,
  technologies: PropTypes.arrayOf(PropTypes.object),
}
PortfolioPage.propTypes = {
  preview: PropTypes.bool,
  page: PropTypes.shape(PAGE_SHAPE),
  morePages: PropTypes.arrayOf(PropTypes.shape(PAGE_SHAPE)),
}

export default PortfolioPage

export async function getStaticProps({ params, preview = false }) {
  const data = await getPortfolioAndMorePortfolios(params.slug, preview)

  return {
    props: {
      preview,
      page: data?.page ?? null,
      morePages: data?.morePages ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPortfoliosWithSlug()
  return {
    paths: allPages?.map(({ slug }) => `/portfolio/${slug}`) ?? [],
    fallback: true,
  }
}
