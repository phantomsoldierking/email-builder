'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Component } from '../types/email-builder'
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react'

interface ComponentEditorProps {
  component: Component | null
  onUpdate: (updatedComponent: Component) => void
}

export function ComponentEditor({ component, onUpdate }: ComponentEditorProps) {
  if (!component) {
    return (
      <div className="text-center text-gray-400 py-4">
        Select a component to edit its properties
      </div>
    )
  }

  const renderTextEditor = () => {
    if (component.type !== 'text') return null
    return (
      <div className="space-y-4">
        <div>
          <Label>Content</Label>
          <Input
            value={component.content}
            onChange={(e) => onUpdate({
              ...component,
              content: e.target.value
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div>
          <Label>Font Size</Label>
          <Input
            type="text"
            value={component.styles.fontSize}
            onChange={(e) => onUpdate({
              ...component,
              styles: { ...component.styles, fontSize: e.target.value }
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div>
          <Label>Text Alignment</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={component.styles.textAlign === 'left' ? 'default' : 'outline'}
              size="icon"
              onClick={() => onUpdate({
                ...component,
                styles: { ...component.styles, textAlign: 'left' }
              } as Component)}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={component.styles.textAlign === 'center' ? 'default' : 'outline'}
              size="icon"
              onClick={() => onUpdate({
                ...component,
                styles: { ...component.styles, textAlign: 'center' }
              } as Component)}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={component.styles.textAlign === 'right' ? 'default' : 'outline'}
              size="icon"
              onClick={() => onUpdate({
                ...component,
                styles: { ...component.styles, textAlign: 'right' }
              } as Component)}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label>Text Style</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={component.styles.fontWeight === 'bold' ? 'default' : 'outline'}
              size="icon"
              onClick={() => onUpdate({
                ...component,
                styles: {
                  ...component.styles,
                  fontWeight: component.styles.fontWeight === 'bold' ? 'normal' : 'bold'
                }
              } as Component)}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant={component.styles.fontStyle === 'italic' ? 'default' : 'outline'}
              size="icon"
              onClick={() => onUpdate({
                ...component,
                styles: {
                  ...component.styles,
                  fontStyle: component.styles.fontStyle === 'italic' ? 'normal' : 'italic'
                }
              } as Component)}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant={component.styles.textDecoration === 'underline' ? 'default' : 'outline'}
              size="icon"
              onClick={() => onUpdate({
                ...component,
                styles: {
                  ...component.styles,
                  textDecoration: component.styles.textDecoration === 'underline' ? 'none' : 'underline'
                }
              } as Component)}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderButtonEditor = () => {
    if (component.type !== 'button') return null
    return (
      <div className="space-y-4">
        <div>
          <Label>Button Text</Label>
          <Input
            value={component.text}
            onChange={(e) => onUpdate({
              ...component,
              text: e.target.value
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div>
          <Label>Link URL</Label>
          <Input
            value={component.link}
            onChange={(e) => onUpdate({
              ...component,
              link: e.target.value
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div>
          <Label>Background Color</Label>
          <Input
            type="text"
            value={component.styles.backgroundColor}
            onChange={(e) => onUpdate({
              ...component,
              styles: { ...component.styles, backgroundColor: e.target.value }
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div>
          <Label>Text Color</Label>
          <Input
            type="text"
            value={component.styles.color}
            onChange={(e) => onUpdate({
              ...component,
              styles: { ...component.styles, color: e.target.value }
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
      </div>
    )
  }

  const renderImageEditor = () => {
    if (component.type !== 'image') return null
    return (
      <div className="space-y-4">
        <div>
          <Label>Image URL</Label>
          <Input
            value={component.src}
            onChange={(e) => onUpdate({
              ...component,
              src: e.target.value
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div>
          <Label>Alt Text</Label>
          <Input
            value={component.alt}
            onChange={(e) => onUpdate({
              ...component,
              alt: e.target.value
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div>
          <Label>Width</Label>
          <Input
            type="text"
            value={component.styles.width}
            onChange={(e) => onUpdate({
              ...component,
              styles: { ...component.styles, width: e.target.value }
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
      </div>
    )
  }

  const renderDividerEditor = () => {
    if (component.type !== 'divider') return null
    return (
      <div className="space-y-4">
        <div>
          <Label>Style</Label>
          <Select
            value={component.styles.borderStyle}
            onValueChange={(value: 'solid' | 'dashed' | 'dotted') => onUpdate({
              ...component,
              styles: { ...component.styles, borderStyle: value }
            } as Component)}
          >
            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
              <SelectItem value="dotted">Dotted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Color</Label>
          <Input
            type="text"
            value={component.styles.borderColor}
            onChange={(e) => onUpdate({
              ...component,
              styles: { ...component.styles, borderColor: e.target.value }
            } as Component)}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {renderTextEditor()}
      {renderButtonEditor()}
      {renderImageEditor()}
      {renderDividerEditor()}
    </div>
  )
}

