// components/animated-templates.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Download, Eye, Trash } from 'lucide-react'
import { useState } from 'react'
import { generateHTML } from '@/utils/template-renderer'
import { TemplateFile, EmailTemplate } from '@/types/email-template'

interface AnimatedTemplatesProps {
  templates: TemplateFile[]
}

export default function AnimatedTemplates({ templates }: AnimatedTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateFile | null>(null)

  const handleDownload = (template: TemplateFile) => {
    const html = generateHTML(template.content)
    const blob = new Blob([html], { type: 'text/html' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = template.name.replace('.json', '.html')
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleView = (template: TemplateFile) => {
    setSelectedTemplate(template)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-gray-900 border border-gray-800 hover:border-blue-900 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-blue-100">
                  {template.content.title || template.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Created: {new Date(template.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Sections: {template.content.sections.length}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-blue-800 hover:bg-blue-900/20 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  onClick={() => handleView(template)}
                >
                  <Eye size={16} />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-blue-800 hover:bg-blue-900/20 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  onClick={() => handleDownload(template)}
                >
                  <Download size={16} />
                  Download HTML
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-blue-900/50 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-100">
                {selectedTemplate.content.title}
              </h2>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <iframe
                srcDoc={generateHTML(selectedTemplate.content)}
                className="w-full h-[60vh] border-0"
                title="Template Preview"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}