import React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="bg-[#60A5FA]/10 text-[#60A5FA] text-sm font-medium px-3 py-1 rounded-full">
              Affordable Plans
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mt-4">Choose Your Learning Path</h2>
          <p className="text-[#94A3B8] mt-2">Select a plan that best fits your learning goals</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* One-to-One Classes */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white text-center">One-to-One Classes</h3>
            <div className="grid gap-4">
              {/* Basic Plan */}
              <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-white">1 Class/Week</h4>
                    <p className="text-[#94A3B8] text-sm">Perfect for beginners</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">$34</span>
                    <span className="text-[#94A3B8] text-sm">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>4 classes per month</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Personalized learning path</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Progress tracking</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#1F2937] hover:bg-[#374151] text-white">
                  Enroll Now
                </Button>
              </div>

              {/* Premium Plan */}
              <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#60A5FA] rounded-xl p-6 relative">
                <div className="absolute -top-3 right-4">
                  <span className="bg-[#60A5FA] text-white text-xs font-medium px-2 py-1 rounded-full">
                    Popular Choice
                  </span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-white">2 Classes/Week</h4>
                    <p className="text-[#94A3B8] text-sm">For rapid improvement</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">$68</span>
                    <span className="text-[#94A3B8] text-sm">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>8 classes per month</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Priority scheduling</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Advanced study materials</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>

          {/* Group Classes */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white text-center">Group Classes</h3>
            <div className="grid gap-4">
              {/* Basic Group Plan */}
              <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#1F2937] rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-white">1 Class/Week</h4>
                    <p className="text-[#94A3B8] text-sm">Learn with peers</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">$22</span>
                    <span className="text-[#94A3B8] text-sm">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>4 group sessions per month</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Interactive learning</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Peer practice sessions</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#1F2937] hover:bg-[#374151] text-white">
                  Enroll Now
                </Button>
              </div>

              {/* Premium Group Plan */}
              <div className="bg-[#111827]/50 backdrop-blur-sm border border-[#60A5FA] rounded-xl p-6 relative">
                <div className="absolute -top-3 right-4">
                  <span className="bg-[#60A5FA] text-white text-xs font-medium px-2 py-1 rounded-full">
                    Popular Choice
                  </span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-white">2 Classes/Week</h4>
                    <p className="text-[#94A3B8] text-sm">Intensive group learning</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">$45</span>
                    <span className="text-[#94A3B8] text-sm">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>8 group sessions per month</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Tournament preparation</span>
                  </li>
                  <li className="flex items-center text-[#94A3B8]">
                    <Check className="h-5 w-5 text-[#60A5FA] mr-2" />
                    <span>Advanced group exercises</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#60A5FA] hover:bg-[#3B82F6] text-white">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection 