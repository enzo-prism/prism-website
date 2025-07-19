"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { trackEvent } from "@/utils/analytics"

export default function ROICalculator() {
  const [avgCustomerValue, setAvgCustomerValue] = useState<string>("500")
  const [monthlyCustomers, setMonthlyCustomers] = useState<string>("20")
  const [monthlyValue, setMonthlyValue] = useState<number>(0)
  const [annualValue, setAnnualValue] = useState<number>(0)
  const [monthlyROI, setMonthlyROI] = useState<{ min: number; max: number }>({ min: 0, max: 0 })
  const [annualROI, setAnnualROI] = useState<{ min: number; max: number }>({ min: 0, max: 0 })

  // Prism investment range
  const investmentMin = 1200
  const investmentMax = 2000

  useEffect(() => {
    const customerValue = parseFloat(avgCustomerValue) || 0
    const customers = parseFloat(monthlyCustomers) || 0
    
    const monthly = customerValue * customers
    const annual = monthly * 12
    
    setMonthlyValue(monthly)
    setAnnualValue(annual)
    
    // Calculate ROI
    setMonthlyROI({
      min: monthly / investmentMax,
      max: monthly / investmentMin
    })
    
    setAnnualROI({
      min: annual / (investmentMax * 12),
      max: annual / (investmentMin * 12)
    })
  }, [avgCustomerValue, monthlyCustomers])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatROI = (value: number) => {
    return `${value.toFixed(1)}x`
  }

  const handleCalculate = () => {
    trackEvent("click", {
      element_type: "roi_calculator_calculate",
      customer_value: avgCustomerValue,
      monthly_customers: monthlyCustomers,
      calculated_monthly_value: monthlyValue
    })
  }

  const handleGetCustomROI = () => {
    trackEvent("cta_click", {
      cta_text: "get your custom roi report",
      cta_location: "roi_calculator",
      customer_value: avgCustomerValue,
      monthly_customers: monthlyCustomers
    })
  }

  return (
    <Card className="w-full max-w-xl mx-auto hardware-hover gpu-accelerated">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="w-5 h-5" />
          <span className="lowercase">calculate your potential roi</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer-value" className="lowercase">
              average customer value ($)
            </Label>
            <Input
              id="customer-value"
              type="number"
              placeholder="500"
              value={avgCustomerValue}
              onChange={(e) => setAvgCustomerValue(e.target.value)}
              className="text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthly-customers" className="lowercase">
              expected new customers per month
            </Label>
            <Input
              id="monthly-customers"
              type="number"
              placeholder="20"
              value={monthlyCustomers}
              onChange={(e) => setMonthlyCustomers(e.target.value)}
              className="text-lg"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 p-4 bg-neutral-50 rounded-lg">
          <h3 className="font-semibold lowercase text-neutral-700">your potential returns</h3>
          
          {/* Monthly Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-neutral-600 lowercase">monthly value</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(monthlyValue)}</p>
              <p className="text-xs text-neutral-500">
                ROI: {formatROI(monthlyROI.min)} - {formatROI(monthlyROI.max)}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-neutral-600 lowercase">annual value</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(annualValue)}</p>
              <p className="text-xs text-neutral-500">
                ROI: {formatROI(annualROI.min)} - {formatROI(annualROI.max)}
              </p>
            </div>
          </div>
          
          {/* Investment Comparison */}
          <div className="pt-3 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600 lowercase">prism investment</p>
              <p className="text-sm font-medium">
                {formatCurrency(investmentMin)} - {formatCurrency(investmentMax)}/mo
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-neutral-600 lowercase">your net gain</p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(monthlyValue - investmentMax)}/mo
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Button 
            className="w-full rounded-full lowercase"
            onClick={handleGetCustomROI}
            asChild
          >
            <Link href="/get-started">
              get your custom roi report <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-xs text-center text-neutral-500 lowercase">
            results based on actual client performance data
          </p>
        </div>
      </CardContent>
    </Card>
  )
}