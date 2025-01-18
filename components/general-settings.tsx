'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ImagePlus, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

interface GeneralSettings {
  backgroundColor: string
  backgroundImage?: string
  contentWidth: number
  alignment: 'left' | 'center' | 'right'
  underlineLinks: boolean
  responsiveDesign: boolean
  rtl: boolean
  padding: {
    desktop: number
    tablet: number
    mobile: number
  }
}

interface GeneralSettingsProps {
  settings: GeneralSettings
  onSettingsChange: (settings: Partial<GeneralSettings>) => void
}

export function GeneralSettings({ settings, onSettingsChange }: GeneralSettingsProps) {
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
      onSettingsChange({ backgroundImage: data.url })
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>General Background Color</Label>
        <Input
          type="text"
          value={settings.backgroundColor}
          onChange={(e) => onSettingsChange({ backgroundColor: e.target.value })}
          placeholder="#ffffff"
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>

      <div>
        <Label>Background Image</Label>
        <div className="mt-2">
          <Button variant="outline" onClick={() => document.getElementById('bg-upload')?.click()}>
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <input
            id="bg-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div>
        <Label>Message Content Width</Label>
        <Input
          type="number"
          value={settings.contentWidth}
          onChange={(e) => onSettingsChange({ contentWidth: parseInt(e.target.value) })}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>

      <div>
        <Label>Message Alignment</Label>
        <div className="flex gap-2 mt-2">
          <Button
            variant={settings.alignment === 'left' ? 'default' : 'outline'}
            size="icon"
            onClick={() => onSettingsChange({ alignment: 'left' })}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={settings.alignment === 'center' ? 'default' : 'outline'}
            size="icon"
            onClick={() => onSettingsChange({ alignment: 'center' })}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={settings.alignment === 'right' ? 'default' : 'outline'}
            size="icon"
            onClick={() => onSettingsChange({ alignment: 'right' })}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label>Underline Links</Label>
        <Switch
          checked={settings.underlineLinks}
          onCheckedChange={(checked) => onSettingsChange({ underlineLinks: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Responsive Design</Label>
        <Switch
          checked={settings.responsiveDesign}
          onCheckedChange={(checked) => onSettingsChange({ responsiveDesign: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Right to Left Text Direction</Label>
        <Switch
          checked={settings.rtl}
          onCheckedChange={(checked) => onSettingsChange({ rtl: checked })}
        />
      </div>

      <div>
        <Label>Structure Padding</Label>
        <div className="grid gap-4 mt-2">
          <div>
            <Label className="text-sm">Desktop</Label>
            <Input
              type="number"
              value={settings.padding.desktop}
              onChange={(e) => onSettingsChange({
                padding: { ...settings.padding, desktop: parseInt(e.target.value) }
              })}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div>
            <Label className="text-sm">Tablet</Label>
            <Input
              type="number"
              value={settings.padding.tablet}
              onChange={(e) => onSettingsChange({
                padding: { ...settings.padding, tablet: parseInt(e.target.value) }
              })}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div>
            <Label className="text-sm">Mobile</Label>
            <Input
              type="number"
              value={settings.padding.mobile}
              onChange={(e) => onSettingsChange({
                padding: { ...settings.padding, mobile: parseInt(e.target.value) }
              })}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

