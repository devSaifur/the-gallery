import { db } from '.'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { env } from '~/env'

const runMigrate = async () => {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  console.log('⏳ Running migrations...')

  const start = Date.now()

  await migrate(db, { migrationsFolder: 'src/server/db/migrations' })

  const end = Date.now()

  console.log('✅ Migrations completed in', end - start, 'ms')

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error('❌ Migration failed')
  console.error(err)
  process.exit(1)
})
