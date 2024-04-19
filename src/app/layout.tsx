import { GeistSans } from 'geist/font/sans'
import { cn } from '~/lib/utils'
import '~/styles/globals.css'

export const metadata = {
  title: 'The Gallery',
  description: 'Upload and share images',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
