import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'

interface Props {
  post: Post
}
function Post({ post }: Props) {
  console.log(post)
  return (
    <main>
      <Header />
      <img className="w-full object-cover h-40" src={urlFor(post.mainImage).url()!} alt = ""/>
      <article className="max-w-3xl p-7 mx-auto">
        <h1 className="text-3xl mt-7 mb-4">{post.title}</h1>
        <h2 className="text-xl mb-5 font-light text-gray-400">description</h2>
        <div className="flex items-center space-x-3">
        <img className="h-10 w-10 rounded-full"src={urlFor(post.mainImage).url()!} alt = ""/> 
        <p className="text-sm font-extralight">Blog Post by <span className="text-green-700">Abhay Kumar Mittal</span> Published at {new Date(post._createdAt).toLocaleString()}</p>
        </div>
      </article>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `  *[_type == "post"]{
        _id,
        slug{
            current
        }}`

  const posts = await sanityClient.fetch(query)
  // console.log(posts)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  _createdAt,
    title,
    auther{
      name,
      image
    },
    mainImage,
    slug,
    body

}`

  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}
