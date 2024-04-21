import { db } from './db'
import 'server-only'
import { currentUser } from '~/lib/auth/checkUser'

export async function getImages() {
  const user = await currentUser()

  if (!user?.id) throw new Error('Unauthorized')

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.createdById, user.id!),
    orderBy: (model, { desc }) => desc(model.id),
  })
}

export async function getImage(id: number) {
  if (!id) return null

  const user = await currentUser()

  if (!user?.id) throw new Error('Unauthorized')

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  })

  if (image?.createdById !== user.id) throw new Error('Unauthorized')

  return image
}
