"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, TrendingUp, ArrowRight } from "lucide-react"
import { trackEvent } from "@/utils/analytics"

interface IndustryROICardProps {
  id: string
  name: string
  icon: React.ReactNode
  ltv: number
  monthlyCustomers: number
  monthlyValue: number
  investmentMin: number
  investmentMax: number
  roiMin: number
  roiMax: number
  caseStudies: Array<{
    name: string
    link?: string
  }>
  isActive?: boolean
}

export default function IndustryROICard({
  id,
  name,
  icon,
  ltv,
  monthlyCustomers,
  monthlyValue,
  investmentMin,
  investmentMax,
  roiMin,
  roiMax,
  caseStudies,
  isActive = false
}: IndustryROICardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatROI = (min: number, max: number) => {
    return `${min}x - ${max}x`
  }

  const handleCaseStudyClick = (caseStudyName: string) => {
    trackEvent("click", {
      element_type: "case_study_link",
      industry: name,
      case_study: caseStudyName
    })
  }

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 ${
      isActive ? 'scale-105 shadow-xl border-black' : 'scale-100 shadow-sm'
    } hardware-hover gpu-accelerated`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200" />
      
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <h3 className="text-xl font-bold lowercase">{name}</h3>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          {/* Customer Lifetime Value */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 text-neutral-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm lowercase">customer lifetime value</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-black">{formatCurrency(ltv)}</p>
              <p className="text-xs text-neutral-500 lowercase">per customer</p>
            </div>
          </div>

          {/* Monthly Performance */}
          <div className="space-y-2 p-4 bg-neutral-50 rounded-lg">
            <h4 className="text-sm font-semibold lowercase text-neutral-700">monthly performance</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-600">{monthlyCustomers} new customers</span>
              </div>
              <span className="font-bold text-green-600">{formatCurrency(monthlyValue)}</span>
            </div>
          </div>

          {/* Investment & ROI */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-neutral-500 lowercase">your investment</p>
              <p className="text-sm font-medium">
                {formatCurrency(investmentMin)} - {formatCurrency(investmentMax)}
              </p>
              <p className="text-xs text-neutral-500 lowercase">per month</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-neutral-500 lowercase">return on investment</p>
              <div className="flex items-center justify-end space-x-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-lg font-bold text-green-600">{formatROI(roiMin, roiMax)}</p>
              </div>
              <p className="text-xs text-neutral-500 lowercase">return</p>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="space-y-2">
          <p className="text-sm font-medium lowercase text-neutral-700">success stories</p>
          <div className="flex flex-wrap gap-2">
            {caseStudies.map((caseStudy, index) => (
              caseStudy.link ? (
                <Link 
                  key={index} 
                  href={caseStudy.link}
                  onClick={() => handleCaseStudyClick(caseStudy.name)}
                >
                  <Badge 
                    variant="outline" 
                    className="lowercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    {caseStudy.name} <ArrowRight className="ml-1 h-3 w-3" />
                  </Badge>
                </Link>
              ) : (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="lowercase opacity-60"
                >
                  {caseStudy.name}
                </Badge>
              )
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}