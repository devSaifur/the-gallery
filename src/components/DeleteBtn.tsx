'use client'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'

export default function DeleteBtn() {
  const { pending } = useFormStatus()
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <Button
      type="submit"
      variant="destructive"
      onClick={onDismiss}
      disabled={pending}
    >
      Delete
    </Button>
  )
}
