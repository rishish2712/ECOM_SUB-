import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { APP_NAME } from '@/lib/constants'
import { getAllCategories } from '@/lib/actions/product.actions'

export default async function Search() {
  const categories = await getAllCategories()
  return (
    <form
      action='/search'
      method='GET'
      className='flex items-center h-12 bg-gray-100 rounded-md overflow-hidden shadow-sm w-full'
    >
      <div className='w-28'>
        <Select name='category'>
          <SelectTrigger className='h-full w-full px-3 bg-white text-black border-r rounded-none border-gray-300'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='all'>All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Input
        className='flex-1 h-full px-4 bg-white text-black text-base border-none focus:outline-none'
        placeholder={`Search Site ${APP_NAME}`}
        name='q'
        type='search'
      />

      <button
        type='submit'
        className='h-full px-4 bg-amber-500 text-white hover:bg-amber-500 focus:bg-amber-500 active:bg-amber-500 transition-none flex items-center justify-center rounded-r-md'
      >
        <SearchIcon className='w-5 h-5' />
      </button>
    </form>
  )
}
