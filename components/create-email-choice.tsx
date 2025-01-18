// components/create-email-choice.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Boxes, 
  Sparkles, 
  Palette, 
  LayoutTemplate, 
  PenTool, 
  ArrowRight,
  Lightbulb,
  Wand2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CreateEmailChoice() {
  const router = useRouter()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Elements */}
      <motion.div 
        className="absolute right-20 top-20 text-blue-500/20"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
      >
        <Boxes size={120} />
      </motion.div>
      
      <motion.div 
        className="absolute left-20 bottom-20 text-blue-500/20"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
      >
        <Sparkles size={100} />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full space-y-12 z-10"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Create Your Email
          </h1>
          <p className="text-xl text-gray-400">Choose your preferred way to start</p>
        </motion.div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Custom Email Card */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-gradient-to-br from-gray-900 to-blue-950 p-8 rounded-xl border border-blue-900/50"
          >
            <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <div className="relative space-y-6">
              <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <PenTool size={32} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-100 mb-2">Custom Design</h2>
                <p className="text-gray-400">Start from scratch and create your unique email design with our intuitive builder.</p>
              </div>
              <div className="flex gap-4 items-center text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Palette size={16} />
                  <span>Full Control</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb size={16} />
                  <span>Creative Freedom</span>
                </div>
              </div>
              <Button 
                onClick={() => router.push('/custom')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white group"
              >
                Start Custom Design
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Template Card */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-gradient-to-br from-gray-900 to-blue-950 p-8 rounded-xl border border-blue-900/50"
          >
            <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <div className="relative space-y-6">
              <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <LayoutTemplate size={32} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-100 mb-2">From Template</h2>
                <p className="text-gray-400">Choose from our collection of professional templates and customize to your needs.</p>
              </div>
              <div className="flex gap-4 items-center text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Wand2 size={16} />
                  <span>Quick Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={16} />
                  <span>Professional Designs</span>
                </div>
              </div>
              <Button 
                onClick={() => router.push('/from-template')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white group"
              >
                Browse Templates
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}