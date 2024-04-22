import Modal from './modal'
import Image from 'next/image'
import { getImage } from '~/server/queries'

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string }
}) {
  const image = await getImage(Number(photoId))

  if (!image) {
    return null
  }

  return (
    <Modal>
      <div className="relative size-60 m-auto border border-red-500">
        <Image
          src={image.url}
          alt={image.name}
          sizes="(max-width: 768px) 20vw, 30vw"
          fill
        />
      </div>
    </Modal>
  )
}
