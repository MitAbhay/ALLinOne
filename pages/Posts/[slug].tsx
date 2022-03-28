import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}
interface Props {
  post: Post
}
function Post({ post }: Props) {
  // console.log(post)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data)
    fetch('/api/postComment', {
      method: 'POST',
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(() => {
        setsubmited(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [submited, setsubmited] = useState(false)
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
        <hr className="m-7 mx-auto max-w-lg border border-blue-500" />
        <div>
          <PortableText
            className=""
            content={post.body}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="special-list-item">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <hr className="mx-auto mt-5 max-w-lg border border-blue-500" />
        <div className="m-5 mx-auto flex max-w-2xl flex-col space-y-2 p-4 shadow shadow-blue-500">
          <h1 className="text-5xl text-black">Comments</h1>
          <hr />
          {post.comments.map((comment) => (
            <div key={comment._id} className="flex flex-row space-x-4">
              {console.log(comment)}
              <h2 className="text-lg text-blue-400">{comment.name}</h2>
              <p className="font-light">{comment.comment}</p>
            </div>
          ))}
        </div>
        <hr className="mx-auto max-w-lg border border-blue-500" />
        {submited ? (
          <div className="m-5 rounded bg-blue-500 p-5 text-center ">
            <h2 className="text-xl font-bold text-white">
              Thank you for your Comment
            </h2>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-7 flex max-w-lg flex-col"
          >
            <input type="hidden" value={post._id} {...register('_id')} />
            <label className="my-2">
              <span className="text-gray-700">Name</span>
              <input
                {...register('name', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-600 focus:ring"
                placeholder="Abhay"
                type="text"
                name="name"
              />
            </label>
            <label className="my-2">
              <span className="text-gray-700">Email</span>
              <input
                {...register('email', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-600 focus:ring"
                placeholder="xyz@xyz.com"
                type="email"
                name="email"
              />
            </label>
            <label className="my-2">
              <span className="text-gray-700">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-600 focus:ring"
                placeholder="Hey I am Abhay..."
                name="comment"
                rows={8}
              />
            </label>
            <div className="flex flex-col">
              {errors.name && (
                <span className="text-red-600">*Name is required</span>
              )}
              {errors.name && (
                <span className="text-red-600">*Email is required</span>
              )}
              {errors.name && (
                <span className="text-red-600">*Some Comment is required</span>
              )}
            </div>
            <input
              type="submit"
              className="focus:shadow-outline mt-4 cursor-pointer rounded bg-blue-500 py-2 px-4 font-bold shadow hover:bg-blue-400 hover:text-white"
            />
          </form>
        )}
        <hr className="mx-auto mt-6 max-w-lg border border-blue-500" />
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
    'comments':*[_type == "comment" && aprooved==true ],
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
