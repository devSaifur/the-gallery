import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from './'

async function main() {
  await migrate(db, {
    migrationsFolder: './src/server/db/migrations',
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
