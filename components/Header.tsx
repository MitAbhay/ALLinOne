import Link from 'next/link'

export default function Header() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
      <div className="flex items-center space-x-7">
        <Link href="/">
          <img
            src="/assets/ALLinOne-logos_black2.png"
            alt="logo"
            className="w-40 cursor-pointer object-fit"
          />
        </Link>
        <div className="hidden items-center space-x-3 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>Popular</h3>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="cursor-pointer rounded-full border-2 border-green-700 bg-green-200 py-2 px-3">
          Sign In
        </div>
        <div className="cursor-pointer rounded-full border-2 border-green-700 bg-green-200 py-2 px-3">
          Get Started
        </div>
      </div>
    </div>
  )
}
