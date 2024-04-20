import { db } from './db'
import 'server-only'
import { currentUser } from '~/lib/auth/checkUser'

export async function getImages() {
  const user = await currentUser()

  if (!user?.id) return null

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.createdById, user.id!),
    orderBy: (model, { desc }) => desc(model.id),
  })
}
