import Image from 'next/image'

const mokeUrl = [
  'https://utfs.io/f/3f9a09cd-7c85-42de-b591-7a029514b57a-tqema4.jpg',
  'https://utfs.io/f/13ff4288-4a2e-4e92-a630-ed5af2cdcfea-41owxh.webp',
  'https://utfs.io/f/bd98fb8e-ad8c-46dd-b2f7-99629a1b3c03-i4adbz.webp',
  'https://utfs.io/f/d63e6dfb-8b52-4efa-a620-04f2917dc467-msven3.jpg',
]

const mokeImages = mokeUrl.map((url, i) => {
  return {
    id: i + 1,
    src: url,
  }
})

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[90rem]">
      <div className="flex flex-wrap gap-4">
        {[...mokeImages, ...mokeImages, ...mokeImages].map((image, i) => (
          <div className="size-56 relative mx-auto" key={image.id + '-' + i}>
            <Image
              src={image.src}
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
