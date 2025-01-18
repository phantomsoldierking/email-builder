'use client'

import { Button } from "@/components/ui/button"
import { Laptop, Smartphone } from 'lucide-react'

interface DevicePreviewProps {
  device: 'desktop' | 'mobile'
  onDeviceChange: (device: 'desktop' | 'mobile') => void
}

export function DevicePreview({ device, onDeviceChange }: DevicePreviewProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
      <Button
        variant={device === 'desktop' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onDeviceChange('desktop')}
      >
        <Laptop className="h-4 w-4" />
      </Button>
      <Button
        variant={device === 'mobile' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onDeviceChange('mobile')}
      >
        <Smartphone className="h-4 w-4" />
      </Button>
    </div>
  )
}

