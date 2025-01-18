'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layout, Columns, Grid2x2 } from 'lucide-react'

interface LayoutOption {
  id: string
  name: string
  icon: React.ReactNode
  template: {
    rows: number
    cols: number
    areas: string[]
  }
}

const layoutOptions: LayoutOption[] = [
  {
    id: 'single',
    name: 'Single Column',
    icon: <Layout className="h-4 w-4" />,
    template: {
      rows: 1,
      cols: 1,
      areas: ['content']
    }
  },
  {
    id: 'two-column',
    name: 'Two Columns',
    icon: <Columns className="h-4 w-4" />,
    template: {
      rows: 1,
      cols: 2,
      areas: ['left right']
    }
  },
  {
    id: 'grid',
    name: 'Grid Layout',
    icon: <Grid2x2 className="h-4 w-4" />,
    template: {
      rows: 2,
      cols: 2,
      areas: ['top-left top-right', 'bottom-left bottom-right']
    }
  }
]

interface LayoutTemplatesProps {
  onSelectLayout: (layout: LayoutOption) => void
}

export function LayoutTemplates({ onSelectLayout }: LayoutTemplatesProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {layoutOptions.map((layout) => (
        <Card
          key={layout.id}
          className="p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
          onClick={() => onSelectLayout(layout)}
        >
          <div className="flex items-center gap-2">
            {layout.icon}
            <span>{layout.name}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}

