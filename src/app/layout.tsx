import { GeistSans } from 'geist/font/sans'
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/lib/auth'
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
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
