import Link from 'next/link'

export default function Header() {
  return (
    <div className="sticky mx-auto flex max-w-7xl items-center justify-between p-5">
      <div className="flex items-center space-x-7">
        {/* Left Part */}
        <Link href="/">
          <img
            src="/ALLinOne-logos_black2.png"
            alt="logo"
            className="object-fit w-40 cursor-pointer"
          />
        </Link>
        {/* Middle part : About Contact Popular */}
        <div className="hidden items-center space-x-3 md:inline-flex">
          <h3 className="text-lg hover:font-bold">
            <Link href="/about">About</Link>
          </h3>
          <h3 className="text-lg hover:font-bold">
            <Link href="/contact">Contact</Link>
          </h3>
          <h3 className="text-lg hover:font-bold">
            <Link href="/popular">Popular</Link>
          </h3>
          <h3 className="text-lg hover:font-bold">
            <Link href="/popular">LogIn/SignUp</Link>
          </h3>
        </div>
      </div>
    </div>
  )
}
