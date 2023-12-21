import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Image from "next/image"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChartLine, faFileLines, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import LogoutButton from '@/Components/buttons/LogoutButton'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect('/')
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='flex min-h-screen'>
          <aside className='bg-white w-48 p-4 shadow'>
            <div className='rounded-full overflow-hidden aspect-square w-24 mx-auto'>
              <Image src={session.user.image} width={256} height={256} alt={'avatar'} />
            </div>
            <div className='text-center'>
              <nav className='inline-flex mx-auto flex-col text-center mt-12 gap-6 text-gray-700'>
                <Link href={'/account'} className='flex gap-4'>
                  <FontAwesomeIcon 
                  fixedWidth={1}
                  icon={faFileLines} 
                  className='w-6 h-6'/>
                  <span>Minha página</span>
                </Link>
                <Link href={'/analytics'} className='flex gap-4'>
                  <FontAwesomeIcon 
                  fixedWidth={1}
                  icon={faChartLine} 
                  className='w-6 h-6'/>
                  <span>Analytics</span>
                </Link>
                <LogoutButton 
                  className='flex gap-4 items-center text-gray-700'
                  iconLeft={true} 
                  iconClasses={'w-6 h-6'}
                />
                <Link href={'/'} className='flex gap-2 items-center text-xs text-gray-500 border-t pt-4'>
                  <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4'/>
                  <span>Voltar ao início</span>
                </Link>
              </nav>
            </div>
          </aside>
          <div className='grow'>
            <div className='bg-white m-8 p-4 shadow'>
              {children}
            </div>
          </div>
        </main>     
      </body>
    </html>
  )
}
