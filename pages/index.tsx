import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
// import Footer from '../components/Footer'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post]
}
export default function Home({ posts }: Props) {
  // console.log(posts)
  return (<>
    <Head>
      <title>ALLinOne</title>
    </Head>
    <Header /> {/*   // Header component */}
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between border-y border-black bg-blue-500 py-10 lg:py-8">
        <div className="space-y-5 px-10 font-serif">
          <div className="text-5xl">
            <span className="underline decoration-black decoration-4">
              ALL in One
            </span>{' '}
            , place where I write and you Read...
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
      <div className="grid h-60 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/Posts/${post.slug.current}`}>
              <div className="blog cursor-pointer">
                <img
                  className="h-60 w-full object-cover cursor-pointer" // hover:scale-large transition-transform ease-in-out  duration-200
                  src={urlFor(post.mainImage).url()!}
                  alt="image"
                />
                <div className="p-2 shadow shadow-blue-500 bg-blue-400">
                  <div className="text-lg font-bold">{post.title}</div>
                  <div>
                    <div className="">By Abhay Kumar Mittal at {new Date(post._createdAt).toLocaleString()}</div>
                    {/* <div><img className="h-10 w-full object-cover blog-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.auther.image).url()!} alt="image" /></div> */}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>    
    {/* <Footer /> */}
    </>
  )
}

// runs on serverside (Quality of Nextjs)  Server Side rendering
export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _createdAt,
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
