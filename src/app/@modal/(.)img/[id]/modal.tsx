'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { type ElementRef, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '~/components/ui/button'

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute inset-0 w-96 h-96 bg-black/90"
      onClose={onDismiss}
    >
      <Button onClick={onDismiss}>
        <Cross1Icon className="size-4" />
      </Button>
      {children}
    </dialog>,
    document.getElementById('modal-root')!,
  )
}
