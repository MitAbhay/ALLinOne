// import Link from 'next/link'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post]
}
export default function Popular({ posts }: Props) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-lg space-y-5 text-center">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/Posts/${post.slug.current}`}>
              <div className="blog">
                <img
                  className="h-60 w-full cursor-pointer border border-blue-400 object-cover hover:border-blue-600" // hover:scale-large transition-transform ease-in-out  duration-200
                  src={urlFor(post.mainImage).url()!}
                  alt="image"
                />
                <div className="bg-blue-200 p-2 shadow shadow-blue-500">
                  <div className="text-lg font-bold">{post.title}</div>
                  <div>
                    <div className="">By Abhay Kumar Mittal</div>
                    {/* <div><img className="h-10 w-full object-cover blog-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.auther.image).url()!} alt="image" /></div> */}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
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