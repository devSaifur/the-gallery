import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { currentUser } from '~/lib/auth/checkUser'
import { getImages } from '~/server/queries'

export default async function HomePage() {
  const user = await currentUser()

  if (!user?.id) redirect('/sign-in')

  const images = await getImages()

  return (
    <main className="mx-auto max-w-[90rem]">
      <div className="flex flex-wrap gap-4">
        {images?.map((image) => (
          <Link href={`/img/${image.id}`} key={image.id}>
            <div className="size-56 relative mx-auto">
              <Image
                src={image.url}
                priority
                sizes="(max-width: 768px) 20vw, 30vw"
                fill
                alt={image.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
