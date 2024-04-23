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
      className="absolute w-screen flex items-center justify-center h-screen flex-col bg-zinc-900/70"
      onClose={onDismiss}
    >
      <Button onClick={onDismiss} className="absolute right-80 top-40">
        <Cross1Icon className="size-4" />
      </Button>
      {children}
    </dialog>,
    document.getElementById('modal-root')!,
  )
}
