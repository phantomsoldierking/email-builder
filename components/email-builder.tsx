'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutTemplates } from './layout-templates'
import { DevicePreview } from './device-preview'
import { GeneralSettings } from './general-settings'
import { ComponentEditor } from './component-editor'
import { Type, ImagePlus, Divide, MousePointer2 } from 'lucide-react'
import { Component, EmailTemplate, Layout, GeneralSettings as GeneralSettingsType } from '@/types/email-builder'

const defaultLayout: Layout = {
  id: 'single',
  name: 'Single Column',
  template: {
    rows: 1,
    cols: 1,
    areas: ['content']
  }
}

const defaultSettings: GeneralSettingsType = {
  backgroundColor: '#f6f6f6',
  contentWidth: 600,
  alignment: 'left',
  underlineLinks: true,
  responsiveDesign: true,
  rtl: false,
  padding: {
    desktop: 20,
    tablet: 20,
    mobile: 20,
  }
}

export default function EmailBuilder() {
  const [template, setTemplate] = useState<EmailTemplate>({
    layout: defaultLayout,
    components: [],
    settings: defaultSettings,
  })
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const createComponent = (type: Component['type'], position: { x: number; y: number }): Component => {
    const baseProps = {
      id: `${type}-${Date.now()}`,
      type,
      position,
    }

    switch (type) {
      case 'text':
        return {
          ...baseProps,
          type: 'text',
          content: 'New text block',
          styles: {
            fontSize: '16px',
            fontFamily: 'Arial',
            color: '#000000',
            backgroundColor: 'transparent',
            textAlign: 'left',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
          }
        }
      case 'button':
        return {
          ...baseProps,
          type: 'button',
          text: 'Click me',
          link: '#',
          styles: {
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '16px',
            fontFamily: 'Arial',
            width: 'auto',
          }
        }
      case 'image':
        return {
          ...baseProps,
          type: 'image',
          src: '/placeholder.svg',
          alt: 'Image',
          styles: {
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }
        }
      case 'divider':
        return {
          ...baseProps,
          type: 'divider',
          styles: {
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#e2e8f0',
            margin: '20px 0',
          }
        }
    }
  }

  const handleDragStart = (e: React.DragEvent, componentType: Component['type']) => {
    e.dataTransfer.setData('componentType', componentType)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData('componentType') as Component['type']
    const dropZone = dropZoneRef.current
    if (!dropZone) return

    const rect = dropZone.getBoundingClientRect()
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    const newComponent = createComponent(componentType, position)
    setTemplate((prev: EmailTemplate) => ({
      ...prev,
      components: [...prev.components, newComponent]
    }))
    setSelectedComponent(newComponent)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleLayoutChange = (newLayout: Layout) => {
    setTemplate((prev: any) => ({
      ...prev,
      layout: newLayout
    }))
  }

  const handleSettingsChange = (newSettings: Partial<GeneralSettingsType>) => {
    setTemplate((prev: EmailTemplate) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }))
  }

  const handleComponentUpdate = (updatedComponent: Component) => {
    setTemplate((prev: EmailTemplate) => ({
          ...prev,
          components: prev.components.map((comp) =>
            comp.id === updatedComponent.id ? updatedComponent : comp
          )
        }))
    setSelectedComponent(updatedComponent)
  }

  const renderComponent = (component: Component) => {
    const isSelected = selectedComponent?.id === component.id
    const baseClassName = `absolute transition-all ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`

    switch (component.type) {
      case 'text':
        return (
          <div
            className={baseClassName}
            style={{
              left: component.position.x,
              top: component.position.y,
              ...component.styles,
            }}
            onClick={() => setSelectedComponent(component)}
          >
            {component.content}
          </div>
        )
      case 'button':
        return (
          <button
            className={baseClassName}
            style={{
              left: component.position.x,
              top: component.position.y,
              ...component.styles,
            }}
            onClick={() => setSelectedComponent(component)}
          >
            {component.text}
          </button>
        )
      case 'image':
        return (
          <img
            src={component.src || "/placeholder.svg"}
            alt={component.alt}
            className={baseClassName}
            style={{
              left: component.position.x,
              top: component.position.y,
              ...component.styles,
            }}
            onClick={() => setSelectedComponent(component)}
          />
        )
      case 'divider':
        return (
          <hr
            className={baseClassName}
            style={{
              left: component.position.x,
              top: component.position.y,
              ...component.styles,
            }}
            onClick={() => setSelectedComponent(component)}
          />
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Components Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">Components</h2>
        <div className="grid gap-2">
          {['text', 'image', 'button', 'divider'].map((type) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => handleDragStart(e, type as Component['type'])}
              className="flex items-center gap-2 p-2 bg-gray-700 rounded cursor-move hover:bg-gray-600 transition-colors"
            >
              {type === 'text' && <Type className="h-4 w-4" />}
              {type === 'image' && <ImagePlus className="h-4 w-4" />}
              {type === 'button' && <MousePointer2 className="h-4 w-4" />}
              {type === 'divider' && <Divide className="h-4 w-4" />}
              <span className="text-white capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-gray-700 flex items-center justify-between px-4">
          <LayoutTemplates onSelectLayout={handleLayoutChange} />
          <DevicePreview device={previewDevice} onDeviceChange={setPreviewDevice} />
        </div>

        <div className="flex-1 p-4">
          <div
            ref={dropZoneRef}
            className={`mx-auto transition-all relative ${
              previewDevice === 'mobile' ? 'max-w-sm' : ''
            }`}
            style={{
              width: `${template.settings.contentWidth}px`,
              backgroundColor: template.settings.backgroundColor,
              backgroundImage: template.settings.backgroundImage ? `url(${template.settings.backgroundImage})` : 'none',
              direction: template.settings.rtl ? 'rtl' : 'ltr',
              padding: `${template.settings.padding[previewDevice]}px`,
              minHeight: '500px',
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {template.components.length === 0 ? (
              <div className="h-full border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-400">
                Drop components here
              </div>
            ) : (
              template.components.map((component: any) => renderComponent(component))
            )}
          </div>
        </div>
      </div>

      {/* Settings Sidebar */}
      <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
        <Tabs defaultValue="general" className="text-white">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
            <TabsTrigger value="component" className="flex-1">Component</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings
              settings={template.settings}
              onSettingsChange={handleSettingsChange}
            />
          </TabsContent>
          <TabsContent value="component">
            <ComponentEditor
              component={selectedComponent}
              onUpdate={handleComponentUpdate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

