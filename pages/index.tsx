import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post]
}
export default function Home({ posts }: Props) {
  // console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>AllInOne</title>
      </Head>
      <Header /> {/*   // Header component */}
      <div className="flex items-center justify-between border-y border-black bg-yellow-500 py-10 lg:py-8">
        <div className="space-y-5 px-10 font-serif">
          <div className="text-5xl">
            <span className="underline decoration-black decoration-4">
              ALL IN ONE
            </span>{' '}
            , place to write read and connect
          </div>
          <div className="text-sm">
            Here you can find each and every content, all the stuff one place.😊
          </div>
        </div>
        <img
          src="/assets/AIO.png"
          alt="logo"
          className="hidden h-28 px-8 md:inline-flex lg:h-56"
        />
      </div>
      <div className="">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/posts/${post.slug.current}`}>
              <div className="h-12">
                <img src={urlFor(post.mainImage).url()!} alt="image" />
              </div>
              <div>
                <div>{post.title}</div>
                <div>By </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    body,
    mainImage,
    auther->{
      name,
      image
    },
    slug
  }
`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
