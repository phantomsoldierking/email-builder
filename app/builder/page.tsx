// app/create/page.tsx
import { CreateEmailChoice } from '@/components/create-email-choice'

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-transparent" />
      <CreateEmailChoice />
    </div>
  )
}

