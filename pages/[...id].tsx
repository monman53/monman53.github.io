import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../components/layout'
import { getAllPostIds, getPostData } from '../lib/posts'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    if (params.id) {
      const postData = await getPostData(params.id)
      return {
        props: {
          postData
        }
      }
    } else {
      return process.exit(1)
    }
  } else {
    // TODO: Print error message
    return process.exit(1)
  }
}