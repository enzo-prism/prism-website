"use client"

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Users } from 'lucide-react'

interface ROIResults {
  currentRevenue: number
  projectedRevenue: number
  increaseAmount: number
  increasePercentage: number
  investmentROI: number
  paybackMonths: number
}

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    industry: '',
    monthlyRevenue: '',
    monthlyVisitors: '',
    conversionRate: '',
    averageOrderValue: '',
    currentWebsiteCost: ''
  })
  
  const [results, setResults] = useState<ROIResults | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const industries = [
    { value: 'healthcare', label: 'Healthcare/Dental', multiplier: 2.5 },
    { value: 'retail', label: 'Retail/E-commerce', multiplier: 2.0 },
    { value: 'professional', label: 'Professional Services', multiplier: 2.2 },
    { value: 'restaurant', label: 'Restaurant/Food', multiplier: 1.8 },
    { value: 'fitness', label: 'Fitness/Wellness', multiplier: 2.1 },
    { value: 'other', label: 'Other', multiplier: 1.9 }
  ]

  const calculateROI = () => {
    const monthlyRevenue = parseFloat(formData.monthlyRevenue)
    const monthlyVisitors = parseFloat(formData.monthlyVisitors)
    const conversionRate = parseFloat(formData.conversionRate)
    const averageOrderValue = parseFloat(formData.averageOrderValue)
    const currentWebsiteCost = parseFloat(formData.currentWebsiteCost)

    if (!monthlyRevenue || !monthlyVisitors || !conversionRate || !averageOrderValue) {
      return
    }

    const selectedIndustry = industries.find(ind => ind.value === formData.industry)
    const multiplier = selectedIndustry?.multiplier || 1.9

    // Calculate current annual revenue
    const currentRevenue = monthlyRevenue * 12

    // Estimate improvement based on industry benchmarks
    const improvedConversionRate = conversionRate * multiplier
    const improvedAOV = averageOrderValue * 1.15 // 15% AOV improvement
    
    // Calculate projected revenue
    const projectedMonthlyRevenue = monthlyVisitors * (improvedConversionRate / 100) * improvedAOV
    const projectedRevenue = projectedMonthlyRevenue * 12

    const increaseAmount = projectedRevenue - currentRevenue
    const increasePercentage = (increaseAmount / currentRevenue) * 100

    // Calculate ROI (assuming website cost of $5,000)
    const websiteInvestment = 5000
    const investmentROI = (increaseAmount / websiteInvestment) * 100
    const paybackMonths = websiteInvestment / (increaseAmount / 12)

    setResults({
      currentRevenue,
      projectedRevenue,
      increaseAmount,
      increasePercentage,
      investmentROI,
      paybackMonths
    })

    setShowResults(true)
  }

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send this data to your backend
    // For now, we'll just simulate the submission
    try {
      const response = await fetch('/api/store-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'roi-calculator',
          calculatorData: formData,
          results: results
        }),
      })

      if (response.ok) {
        setEmailSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting email:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
      <div className="text-center mb-8">
        <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Website ROI Calculator
        </h2>
        <p className="text-gray-600">
          Discover how much revenue a professionally designed website could generate for your business
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your industry</option>
              {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Monthly Revenue ($)
            </label>
            <input
              type="number"
              value={formData.monthlyRevenue}
              onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
              placeholder="e.g., 25000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Website Visitors
            </label>
            <input
              type="number"
              value={formData.monthlyVisitors}
              onChange={(e) => setFormData({...formData, monthlyVisitors: e.target.value})}
              placeholder="e.g., 2000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Conversion Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.conversionRate}
              onChange={(e) => setFormData({...formData, conversionRate: e.target.value})}
              placeholder="e.g., 2.5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Order Value ($)
            </label>
            <input
              type="number"
              value={formData.averageOrderValue}
              onChange={(e) => setFormData({...formData, averageOrderValue: e.target.value})}
              placeholder="e.g., 150"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={calculateROI}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Calculate ROI
          </button>
        </div>

        <div className="space-y-6">
          {showResults && results && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                Your ROI Projection
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">Current Annual Revenue</span>
                  <span className="font-bold text-gray-900">
                    ${results.currentRevenue.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">Projected Annual Revenue</span>
                  <span className="font-bold text-green-600">
                    ${results.projectedRevenue.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-medium text-green-700">Revenue Increase</span>
                  <span className="font-bold text-green-700">
                    +${results.increaseAmount.toLocaleString()} ({results.increasePercentage.toFixed(1)}%)
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="font-medium text-blue-700">ROI on Investment</span>
                  <span className="font-bold text-blue-700">
                    {results.investmentROI.toFixed(0)}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <span className="font-medium text-indigo-700">Payback Period</span>
                  <span className="font-bold text-indigo-700">
                    {results.paybackMonths.toFixed(1)} months
                  </span>
                </div>
              </div>

              {!emailSubmitted ? (
                <form onSubmit={handleSubmitEmail} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Get your detailed ROI report via email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Get Detailed Report
                  </button>
                </form>
              ) : (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-700 font-medium">
                    ✓ Report sent! Check your email for detailed insights and next steps.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://calendly.com/enzomarzorati/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Schedule a Strategy Call
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {!showResults && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What You'll Discover
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <DollarSign className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Your potential revenue increase from a professional website</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>ROI projections based on your industry benchmarks</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span>How improved conversion rates impact your bottom line</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}