import { FullPageImageView } from '~/components/full-page-image-view'
import { getImage } from '~/server/queries'

export default async function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string }
}) {
  const image = await getImage(Number(photoId))

  if (!image) {
    return null
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
      <FullPageImageView photoId={photoId} />
    </div>
  )
}
