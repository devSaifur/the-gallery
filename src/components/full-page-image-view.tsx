import DeleteBtn from './DeleteBtn'
import Image from 'next/image'
import { currentUser } from '~/lib/auth/checkUser'
import { deleteImage, getImage } from '~/server/queries'

export async function FullPageImageView(props: { photoId: string }) {
  const image = await getImage(Number(props.photoId))

  if (!image) {
    return null
  }

  const user = await currentUser()

  if (!user?.id) {
    return null
  }

  return (
    <div className="h-full w-screen flex text-white min-w-0 items-center justify-center">
      <div className="flex-shrink relative h-3/4 w-3/4 flex-grow">
        <Image
          src={image.url}
          className="object-contain"
          sizes="(max-width: 768px) 20vw, 30vw"
          alt={image.name}
          fill
        />
      </div>
      <div className="flex h-full flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          <div>{user.name}</div>
        </div>

        <div className="p-2">
          <div>Created On:</div>
          <div>{image.createdAt.toLocaleDateString()}</div>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              'use server'

              await deleteImage(image.id)
            }}
          >
            <DeleteBtn />
          </form>
        </div>
      </div>
    </div>
  )
}
