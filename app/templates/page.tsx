// app/templates/page.tsx
import AnimatedTemplates from '@/components/animated-templates'
import path from 'path'
import fs from 'fs/promises'
import { TemplateFile } from '@/types/email-template'

async function getTemplates() {
  try {
    const templatesDir = path.join(process.cwd(), 'public', 'templates')
    const files = await fs.readdir(templatesDir)
    
    const templates = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(templatesDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          return {
            name: file,
            path: `/templates/${file}`,
            content: JSON.parse(content),
            createdAt: (await fs.stat(filePath)).birthtime
          } as TemplateFile
        })
    )

    return templates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  } catch (error) {
    console.error('Error reading templates:', error)
    return []
  }
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          Your Templates
        </h1>
        <AnimatedTemplates templates={templates} />
      </div>
    </div>
  )
}

