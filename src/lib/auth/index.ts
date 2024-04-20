import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { db } from '~/server/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    authorized({ auth }) {
      if (auth?.user) {
        return true
      }
      return false
    },
  },

  adapter: DrizzleAdapter(db),
  providers: [Google],
})
