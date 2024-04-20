'use client'

import { Button } from './ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormStatus } from 'react-dom'

export default function LogoutBtn() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      Log{pending && 'ging'}out{' '}
      {pending && <ReloadIcon className="animate-spin ml-1" />}
    </Button>
  )
}
