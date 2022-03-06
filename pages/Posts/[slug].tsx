import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
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
      <img
        className="h-40 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-7">
        <h1 className="mt-7 mb-4 text-3xl">{post.title}</h1>
        <h2 className="mb-5 text-xl font-light text-gray-400">description</h2>
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.mainImage).url()!}
            alt=""
          />
          <p className="text-sm font-extralight">
            Blog Post by{' '}
            <span className="text-green-700">Abhay Kumar Mittal</span> Published
            at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          Lets wait bro
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {/* <PortableText>
          className=""
          content={post.body}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
          serializers={{
        h1: (props : any) => (<h1 className="text-2xl font-bold my-5" {...props} />),
        h2: (props : any) =>( <h2 className="text-xl font-bold my-5" {...props} />),
        li: ({ children } : any) =>( <li className="special-list-item">{children}</li>),
        link :  ({href, children } : any) =>( <a href={href} className="text-blue-500 hover:underline">{children}</a>),
      }}
      /> */}
        </div>
        <hr className="mx-auto max-w-lg border border-yellow-500" />
        <form className="mx-auto mt-7 flex max-w-lg flex-col">
          <label className="my-2">
            <span className="text-gray-700">Name</span>
            <input
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-600 outline-none focus:ring"
              placeholder="Abhay"
              type="text"
              name="name"
            />
          </label>
          <label className="my-2">
            <span className="text-gray-700">Email</span>
            <input
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-600 outline-none focus:ring"
              placeholder="xyz@xyz.com"
              type="email"
              name="email"
            />
          </label>
          <label className="my-2">
            <span className="text-gray-700">Message</span>
            <textarea
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow ring-yellow-600 outline-none focus:ring"
              placeholder="Hey I am Abhay..."
              name="message"
              rows={8}
            />
          </label>
        </form>
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
