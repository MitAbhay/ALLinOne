// import Link from 'next/link'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Header from '../components/Header'
interface IFormInput {
  _id: string
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [submited, setsubmited] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data)
    fetch('/api/postMessage', {
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
  return (
    <>
      <Header />
      <div className="my-8 text-center text-7xl text-blue-600">
        Contact Me Anytime
      </div>
      {submited ? (
        <div className="m-5 rounded bg-blue-500 p-5 text-center ">
          <h2 className="text-xl font-bold text-white">
            Message Sent Successfully 🙂
          </h2>
        </div>
      ) : (
        <div className="mx-auto max-w-lg text-lg">
          <div className="border border-gray-300 p-6 sm:rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="mb-6 block">
                <span className="text-gray-700">Your name</span>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Joe Bloggs"
                />
              </label>
              <label className="mb-6 block">
                <span className="text-gray-700">Email address</span>
                <input
                  {...register('email', { required: true })}
                  name="email"
                  type="email"
                  className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="joe.bloggs@example.com"
                  required
                />
              </label>
              <label className="mb-6 block">
                <span className="text-gray-700">Message</span>
                <textarea
                  {...register('message', { required: true })}
                  name="message"
                  className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Tell us what you're thinking about..."
                ></textarea>
              </label>
              <div className="flex flex-col">
                {errors.name && (
                  <span className="text-red-600">*Name is required</span>
                )}
                {errors.name && (
                  <span className="text-red-600">*Email is required</span>
                )}
                {errors.name && (
                  <span className="text-red-600">
                    *Some Meassage is required
                  </span>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="focus:shadow-outline h-10 rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800"
                >
                  Contact Us
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
