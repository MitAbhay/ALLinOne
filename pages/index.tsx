import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>AllInOne</title>
      </Head>
      <Header />
      <div className="flex items-center justify-between border-y border-black bg-yellow-500 py-10 lg:py-0">
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
          className="h-34 hidden md:inline-flex lg:h-full"
        />
      </div>
    </div>
  )
}
