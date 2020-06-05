import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import * as styles from './portfolioPage.module.scss'
const PortfolioPage = ({ preview, page, morePages }) => (
  <div className={styles.container}>
    {JSON.stringify(
      { preview, page, morePages }
    )}
  </div>
)

PortfolioPage.defaultProps = {
  preview: false
}

PortfolioPage.propTypes = {
  preview: PropTypes.bool,
  page: PropTypes.object,
  morePages: PropTypes.array
}

export default PortfolioPage;
export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)

  return {
    props: {
      preview,
      post: data?.page ?? null,
      morePages: data?.morePages ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  }
}
