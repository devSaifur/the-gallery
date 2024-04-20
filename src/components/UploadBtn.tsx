'use client'

import { useRouter } from 'next/navigation'
import { UploadButton } from '~/lib/uploadthing'

export default function UploadBtn() {
  const router = useRouter()

  return (
    <li>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => router.refresh()}
      />
    </li>
  )
}
