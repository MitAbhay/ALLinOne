import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post]
}
export default function Home({ posts }: Props) {
  console.log(posts)
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
      <br />
      <div className="h-60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/Posts/${post.slug.current}`}>
              <div className="blog">
                <img className="h-60 w-full object-cover blog-hover:scale-large transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()!} alt="image" />
                <div>
                  <div>{post.title}</div>
                  <div>
                    <div>By Abhay Kumar Mittal</div>
                    {/* <div><img className="h-10 w-full object-cover blog-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.auther.image).url()!} alt="image" /></div> */}
                   </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// runs on serverside (Quality of Nextjs)  Server Side rendering
export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    auther->{
      name,
      image
    },
    mainImage,
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
