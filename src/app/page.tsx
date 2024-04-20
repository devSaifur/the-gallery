import Image from 'next/image'
import { db } from '~/server/db'

export default async function HomePage() {
  const images = await db.query.images.findMany()

  return (
    <main className="mx-auto max-w-[90rem]">
      <div className="flex flex-wrap gap-4">
        {images.map((image, i) => (
          <div className="size-56 relative mx-auto" key={image.id + '-' + i}>
            <Image
              src={image.url}
              priority
              sizes="(max-width: 768px) 20vw, 30vw"
              fill
              alt=""
            />
          </div>
        ))}
      </div>
    </main>
  )
}
