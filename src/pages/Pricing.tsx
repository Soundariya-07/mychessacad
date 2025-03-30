import React from 'react'
import PricingSection from '@/components/PricingSection'
import Navbar from '@/components/Navbar'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PricingSection />
      </main>
    </div>
  )
} 