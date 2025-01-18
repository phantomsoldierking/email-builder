'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ImagePlus, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Download, Save, Plus, Trash2, MoveUp, MoveDown, Type, Eye, EyeOff, Link } from 'lucide-react'

interface Section {
  id: string
  type: 'text' | 'image' | 'button'
  content: string
  link?: string
  hidden?: boolean
  styles: {
    fontFamily: string
    fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
    color: string
    backgroundColor: string
    textAlign: 'left' | 'center' | 'right'
    isBold: boolean
    isItalic: boolean
    isUnderline: boolean
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  }
}

interface EmailTemplate {
  title: string
  logo?: string
  sections: Section[]
  footer: string
  backgroundColor: string
}

const fontOptions = [
  'Arial',
  'Times New Roman',
  'Helvetica',
  'Georgia',
  'Verdana',
  'Roboto',
]

const colorOptions = [
  '#000000',
  '#FFFFFF',
  '#4A5568',
  '#2B6CB0',
  '#2F855A',
  '#C53030',
  '#6B46C1',
]

const fontSizeOptions = [
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'SM' },
  { value: 'base', label: 'Base' },
  { value: 'lg', label: 'LG' },
  { value: 'xl', label: 'XL' },
  { value: '2xl', label: '2XL' },
  { value: '3xl', label: '3XL' },
]

const textTransformOptions = [
  { value: 'none', label: 'None' },
  { value: 'uppercase', label: 'UPPERCASE' },
  { value: 'lowercase', label: 'lowercase' },
  { value: 'capitalize', label: 'Capitalize' },
]

export default function EmailBuilder() {
  const [template, setTemplate] = useState<EmailTemplate>({
    title: 'Email has never been easier',
    sections: [
      {
        id: '1',
        type: 'text',
        content: 'Create beautiful and sophisticated emails in minutes. No coding required, and minimal setup.',
        styles: {
          fontFamily: 'Arial',
          fontSize: 'base',
          color: '#000000',
          backgroundColor: 'transparent',
          textAlign: 'left',
          isBold: false,
          isItalic: false,
          isUnderline: false,
          textTransform: 'none',
        }
      }
    ],
    footer: '© 2025 Your Company. All rights reserved.',
    backgroundColor: '#FFFFFF',
  })
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setTemplate({ ...template, logo: data.url })
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const addSection = (type: 'text' | 'image' | 'button') => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'New text section' : type === 'button' ? 'Click me' : '',
      link: type === 'button' ? '#' : undefined,
      styles: {
        fontFamily: 'Arial',
        fontSize: 'base',
        color: '#000000',
        backgroundColor: 'transparent',
        textAlign: 'left',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        textTransform: 'none',
      }
    }
    setTemplate({
      ...template,
      sections: [...template.sections, newSection]
    })
    setSelectedSection(newSection.id)
  }

  const updateSectionStyle = (sectionId: string, styleKey: keyof Section['styles'], value: any) => {
    setTemplate({
      ...template,
      sections: template.sections.map(section =>
        section.id === sectionId
          ? { ...section, styles: { ...section.styles, [styleKey]: value } }
          : section
      )
    })
  }

  const updateSectionContent = (sectionId: string, content: string) => {
    setTemplate({
      ...template,
      sections: template.sections.map(section =>
        section.id === sectionId
          ? { ...section, content }
          : section
      )
    })
  }

  const updateSectionLink = (sectionId: string, link: string) => {
    setTemplate({
      ...template,
      sections: template.sections.map(section =>
        section.id === sectionId
          ? { ...section, link }
          : section
      )
    })
  }

  const toggleSectionVisibility = (sectionId: string) => {
    setTemplate({
      ...template,
      sections: template.sections.map(section =>
        section.id === sectionId
          ? { ...section, hidden: !section.hidden }
          : section
      )
    })
  }

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const sectionIndex = template.sections.findIndex(s => s.id === sectionId)
    if (
      (direction === 'up' && sectionIndex === 0) ||
      (direction === 'down' && sectionIndex === template.sections.length - 1)
    ) return

    const newSections = [...template.sections]
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1
    ;[newSections[sectionIndex], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[sectionIndex]
    ]
    setTemplate({ ...template, sections: newSections })
  }

  const removeSection = (sectionId: string) => {
    setTemplate({
      ...template,
      sections: template.sections.filter(section => section.id !== sectionId)
    })
    setSelectedSection(null)
  }

  const addLayerAbove = (sectionId: string) => {
    const sectionIndex = template.sections.findIndex(s => s.id === sectionId)
    const newSection: Section = {
      id: Date.now().toString(),
      type: 'text',
      content: 'New text section',
      styles: {
        fontFamily: 'Arial',
        fontSize: 'base',
        color: '#000000',
        backgroundColor: 'transparent',
        textAlign: 'left',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        textTransform: 'none',
      }
    }
    const newSections = [...template.sections]
    newSections.splice(sectionIndex, 0, newSection)
    setTemplate({ ...template, sections: newSections })
    setSelectedSection(newSection.id)
  }

  const addLayerBelow = (sectionId: string) => {
    const sectionIndex = template.sections.findIndex(s => s.id === sectionId)
    const newSection: Section = {
      id: Date.now().toString(),
      type: 'text',
      content: 'New text section',
      styles: {
        fontFamily: 'Arial',
        fontSize: 'base',
        color: '#000000',
        backgroundColor: 'transparent',
        textAlign: 'left',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        textTransform: 'none',
      }
    }
    const newSections = [...template.sections]
    newSections.splice(sectionIndex + 1, 0, newSection)
    setTemplate({ ...template, sections: newSections })
    setSelectedSection(newSection.id)
  }

  const handleSave = async () => {
    try {
      await fetch('/api/uploadEmailConfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      })
    } catch (error) {
      console.error('Error saving template:', error)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/renderAndDownloadTemplate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      })
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'email-template.html'
      a.click()
    } catch (error) {
      console.error('Error downloading template:', error)
    }
  }

  const selectedSectionData = selectedSection
    ? template.sections.find(s => s.id === selectedSection)
    : null

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Preview Panel */}
      <div className="flex-1 p-6">
        <Card className="h-full overflow-auto p-6 bg-gray-800" style={{ backgroundColor: template.backgroundColor }}>
          <div className="text-center mb-6">
            {template.logo ? (
              <img src={template.logo || "/placeholder.svg"} alt="Logo" className="max-w-[200px] mx-auto" />
            ) : (
              <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Add Logo
              </Button>
            )}
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <h1 className="text-3xl font-bold text-center mb-6">{template.title}</h1>

          {template.sections.map((section, index) => (
            <div
              key={section.id}
              className={`mb-4 p-4 cursor-pointer rounded transition-colors ${
                selectedSection === section.id ? 'bg-gray-50' : ''
              } ${section.hidden ? 'opacity-50' : ''}`}
              onClick={() => setSelectedSection(section.id)}
              style={{
                fontFamily: section.styles.fontFamily,
                fontSize: section.styles.fontSize === 'base' ? '1rem' : 
                         section.styles.fontSize === 'xs' ? '0.75rem' : 
                         section.styles.fontSize === 'sm' ? '0.875rem' : 
                         section.styles.fontSize === 'lg' ? '1.125rem' : 
                         section.styles.fontSize === 'xl' ? '1.25rem' : 
                         section.styles.fontSize === '2xl' ? '1.5rem' : 
                         section.styles.fontSize === '3xl' ? '1.875rem' : '1rem',
                color: section.styles.color,
                backgroundColor: section.styles.backgroundColor,
                textAlign: section.styles.textAlign,
                fontWeight: section.styles.isBold ? 'bold' : 'normal',
                fontStyle: section.styles.isItalic ? 'italic' : 'normal',
                textDecoration: section.styles.isUnderline ? 'underline' : 'none',
                textTransform: section.styles.textTransform,
              }}
            >
              {section.type === 'text' && <p>{section.content}</p>}
              {section.type === 'button' && (
                <a href={section.link} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 rounded hover:opacity-80 transition-opacity" style={{ backgroundColor: section.styles.backgroundColor, color: section.styles.color }}>
                  {section.content}
                </a>
              )}
              {section.type === 'image' && (
                <img src={section.content || '/placeholder.svg?height=200&width=200'} alt="" className="mx-auto max-w-full" />
              )}
            </div>
          ))}

          <div className="text-sm text-gray-500 text-center mt-6">
            {template.footer}
          </div>
        </Card>
      </div>

      {/* Settings Panel */}
      <div className="w-96 bg-gray-800 border-l border-gray-700 p-6 overflow-y-auto">
        <Tabs defaultValue="content" className="text-white">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Title</h3>
                <Input
                  value={template.title}
                  onChange={(e) => setTemplate({ ...template, title: e.target.value })}
                  placeholder="Enter title"
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Sections</h3>
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" onClick={() => addSection('text')}>
                    <Type className="mr-2 h-4 w-4" />
                    Add Text
                  </Button>
                  <Button variant="outline" onClick={() => addSection('button')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Button
                  </Button>
                </div>

                {selectedSectionData && (
                  <div className="space-y-4">
                    <Textarea
                      value={selectedSectionData.content}
                      onChange={(e) => updateSectionContent(selectedSectionData.id, e.target.value)}
                      placeholder="Enter content"
                      rows={4}
                      className="bg-gray-700 text-white border-gray-600"
                    />
                    {selectedSectionData.type === 'button' && (
                      <Input
                        value={selectedSectionData.link || ''}
                        onChange={(e) => updateSectionLink(selectedSectionData.id, e.target.value)}
                        placeholder="Enter button link"
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveSection(selectedSectionData.id, 'up')}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveSection(selectedSectionData.id, 'down')}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSectionVisibility(selectedSectionData.id)}
                      >
                        {selectedSectionData.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLayerAbove(selectedSectionData.id)}
                      >
                        Add Above
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLayerBelow(selectedSectionData.id)}
                      >
                        Add Below
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSection(selectedSectionData.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Footer</h3>
                <Input
                  value={template.footer}
                  onChange={(e) => setTemplate({ ...template, footer: e.target.value })}
                  placeholder="Enter footer text"
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="style">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Email Background Color</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        template.backgroundColor === color ? 'border-gray-900' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setTemplate({ ...template, backgroundColor: color })}
                    />
                  ))}
                </div>
                <Input
                  value={template.backgroundColor}
                  onChange={(e) => setTemplate({ ...template, backgroundColor: e.target.value })}
                  placeholder="Enter custom color (e.g., #FF0000)"
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>

              {selectedSectionData && (
                <>
                  <div>
                    <h3 className="font-medium mb-2">Font Family</h3>
                    <Select
                      value={selectedSectionData.styles.fontFamily}
                      onValueChange={(value) => updateSectionStyle(selectedSectionData.id, 'fontFamily', value)}
                    >
                      <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map(font => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Font Size</h3>
                    <Select
                      value={selectedSectionData.styles.fontSize}
                      onValueChange={(value) => updateSectionStyle(selectedSectionData.id, 'fontSize', value)}
                    >
                      <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontSizeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Text Color</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedSectionData.styles.color === color ? 'border-gray-900' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => updateSectionStyle(selectedSectionData.id, 'color', color)}
                        />
                      ))}
                    </div>
                    <Input
                      value={selectedSectionData.styles.color}
                      onChange={(e) => updateSectionStyle(selectedSectionData.id, 'color', e.target.value)}
                      placeholder="Enter custom color (e.g., #FF0000)"
                      className="bg-gray-700 text-white border-gray-600"
                    />
                  </div>

                  {selectedSectionData.type === 'button' && (
                    <div>
                      <h3 className="font-medium mb-2">Button Background Color</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {colorOptions.map(color => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              selectedSectionData.styles.backgroundColor === color ? 'border-gray-900' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => updateSectionStyle(selectedSectionData.id, 'backgroundColor', color)}
                          />
                        ))}
                      </div>
                      <Input
                        value={selectedSectionData.styles.backgroundColor}
                        onChange={(e) => updateSectionStyle(selectedSectionData.id, 'backgroundColor', e.target.value)}
                        placeholder="Enter custom color (e.g., #FF0000)"
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium mb-2">Text Alignment</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedSectionData.styles.textAlign === 'left' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => updateSectionStyle(selectedSectionData.id, 'textAlign', 'left')}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={selectedSectionData.styles.textAlign === 'center' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => updateSectionStyle(selectedSectionData.id, 'textAlign', 'center')}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={selectedSectionData.styles.textAlign === 'right' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => updateSectionStyle(selectedSectionData.id, 'textAlign', 'right')}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Text Style</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedSectionData.styles.isBold ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => updateSectionStyle(selectedSectionData.id, 'isBold', !selectedSectionData.styles.isBold)}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={selectedSectionData.styles.isItalic ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => updateSectionStyle(selectedSectionData.id, 'isItalic', !selectedSectionData.styles.isItalic)}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={selectedSectionData.styles.isUnderline ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => updateSectionStyle(selectedSectionData.id, 'isUnderline', !selectedSectionData.styles.isUnderline)}
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Text Transform</h3>
                    <Select
                      value={selectedSectionData.styles.textTransform}
                      onValueChange={(value) => updateSectionStyle(selectedSectionData.id, 'textTransform', value)}
                    >
                      <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {textTransformOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-4">
          <Button onClick={handleSave} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button onClick={handleDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}

