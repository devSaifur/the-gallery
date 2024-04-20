import '@uploadthing/react/styles.css'
import { GeistSans } from 'geist/font/sans'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import LogoutBtn from '~/components/LogoutBtn'
import UploadBtn from '~/components/UploadBtn'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { auth, signOut } from '~/lib/auth'
import { currentUser } from '~/lib/auth/checkUser'
import { cn } from '~/lib/utils'
import '~/styles/globals.css'

export const metadata = {
  title: 'The Gallery',
  description: 'Upload and share images',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            GeistSans.className,
            'bg-black text-white w-full h-screen',
          )}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}

async function Navbar() {
  const user = await currentUser()

  return (
    <nav>
      <ul className="flex px-20 py-4 gap-x-4 justify-end">
        <UploadBtn />
        <li>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.image!} alt={user.name!} />
                  <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="gap-2">
                  <form
                    action={async () => {
                      'use server'
                      await signOut({ redirectTo: '/sign-in' })
                    }}
                  >
                    <LogoutBtn />
                  </form>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </li>
      </ul>
    </nav>
  )
}
