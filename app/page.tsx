'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Mail, Sparkles, Zap, Layout, Clock, Shield, ChevronRight } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-blue-950/20 p-6 rounded-xl border border-blue-400/10 hover:border-blue-400/30 transition-all"
  >
    <Icon className="w-8 h-8 text-blue-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-blue-100">{title}</h3>
    <p className="text-blue-200/70">{description}</p>
  </motion.div>
)

export default function HomePage() {
  const features = [
    {
      icon: Layout,
      title: "Drag & Drop Builder",
      description: "Intuitive interface for creating beautiful emails without coding"
    },
    {
      icon: Sparkles,
      title: "Smart Templates",
      description: "Start with professional templates or create your own from scratch"
    },
    {
      icon: Zap,
      title: "Instant Preview",
      description: "See your changes in real-time across all devices"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Reuse components and templates for faster creation"
    },
    {
      icon: Shield,
      title: "Spam Tested",
      description: "Built-in checks to ensure deliverability"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-black to-blue-950/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Mail className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Email Builder
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-200/70 max-w-2xl mx-auto">
            Create stunning email templates with our powerful drag & drop builder
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center mb-24"
        >
          <Link href="/builder" className="contents">
            <Button 
              size="lg" 
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:scale-105"
            >
              Create Custom Template
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/templates" className="contents">
            <Button
              size="lg"
              variant="outline"
              className="text-blue-400 border-blue-400/30 hover:bg-blue-950/50 px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:border-blue-400/50 hover:scale-105"
            >
              View Previous Templates
            </Button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg
                className="w-48 h-48 text-blue-500/10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}