import Link from 'next/link'
import { FileSearch, Home } from 'lucide-react'
import { FoxIcon } from '@/ui/icons/FoxIcon'

const NotFoundPage = () => (
  <div className='not-found'>
    <header>
      <FoxIcon />
      <Link href='/'>
        <Home />
        <p>На главную</p>
      </Link>
    </header>
    <div className='icon-block'>
      <FileSearch data-404-icon />
      <p>Похоже, такой страницы не существует.</p>
    </div>
  </div>
)

export default NotFoundPage