import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  primaryKey,
  text,
  sqliteTable,
} from 'drizzle-orm/sqlite-core'
import { type AdapterAccount } from 'next-auth/adapters'

export const users = sqliteTable('user', {
  id: text('id', { length: 255 }).notNull().primaryKey(),
  name: text('name', { length: 255 }),
  email: text('email', { length: 255 }).notNull(),
  emailVerified: int('emailVerified', {
    mode: 'timestamp',
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text('image', { length: 255 }),
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}))

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: text('provider', { length: 255 }).notNull(),
    providerAccountId: text('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: int('expires_at'),
    token_type: text('token_type', { length: 255 }),
    scope: text('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: text('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_userId_idx').on(account.userId),
  }),
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = sqliteTable(
  'session',
  {
    sessionToken: text('sessionToken', { length: 255 }).notNull().primaryKey(),
    userId: text('userId', { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int('expires', { mode: 'timestamp' }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId),
  }),
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier', { length: 255 }).notNull(),
    token: text('token', { length: 255 }).notNull(),
    expires: int('expires', { mode: 'timestamp' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)
export const images = sqliteTable(
  'image',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }).notNull(),
    url: text('url', { length: 256 }).notNull(),
    createdById: text('createdById', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: int('created_at', { mode: 'timestamp' }).notNull(),
  },
  (image) => ({
    createdByIdIdx: index('createdById_idx').on(image.createdById),
  }),
)
