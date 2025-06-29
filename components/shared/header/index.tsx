import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import data from '@/lib/data'
import Search from './search'
import Sidebar from './sidebar'
import { getAllCategories } from '@/lib/actions/product.actions'

export default async function Header() {
  const categories = await getAllCategories()

  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo4.png"
            width={200}
            height={40}
            alt={`${APP_NAME} logo`}
          />
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-4">
          <div className="w-full max-w-3xl">
            <Search />
          </div>
        </div>

        {/* User Menu */}
        <Menu />
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-green-50 border-t border-b border-amber-100 px-4 py-2">
        <div className="flex items-center justify-between w-full gap-4">

          {/* Sidebar + Navigation (takes remaining space before slogan image) */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Sidebar categories={categories} />

            <nav className="flex items-center gap-3 text-sm font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
              {data.headerMenus.map((menu) => (
                <Link
                  href={menu.herf}
                  key={menu.herf}
                  className="px-3 py-1.5 rounded-full bg-white/70 text-gray-700 shadow-sm hover:bg-amber-100 hover:text-amber-700 transition-all duration-300 border border-amber-200"
                >
                  {menu.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Slogan Image */}
          <div className="hidden lg:block shrink-0">
            <Image
              src="/icons/image-removebg-preview (12)[1].png"
              width={400}
              height={266}
              alt="slogan"
              className="rounded"
            />
          </div>

          {/* Flag Image */}
          <div className="ml-auto hidden lg:block shrink-0">
            <Image
              src="/icons/ffg.png"
              width={100}
              height={46}
              alt="India Colors Stripe"
              className="rounded"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="block md:hidden px-4 py-2">
        <Search />
      </div>
    </header>
  )
}
