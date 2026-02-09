"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, AlertCircle, CheckCircle, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fadeInUp, springScale, successPop } from "@/utils/animation-variants"

interface TestResult {
  query: string
  mentioned: boolean
  context: string
  suggestions: string[]
}

const sampleQueries = [
  "best {industry} options",
  "top {industry} recommendations",
  "reliable {industry} services",
  "{industry} for {target audience}",
  "affordable {industry} solutions",
  "local {industry} experts"
]

const mockResults: TestResult[] = [
  {
    query: "best coffee roasters for home use",
    mentioned: true,
    context: "Sweet Haven is known for their artisan approach to coffee roasting…",
    suggestions: ["Increase mentions in coffee forums", "Add customer testimonials"]
  },
  {
    query: "affordable coffee equipment",
    mentioned: false,
    context: "No mention found in AI responses",
    suggestions: ["Create content about budget-friendly equipment", "Partner with equipment suppliers"]
  },
  {
    query: "local coffee roasters",
    mentioned: true,
    context: "Among the top local roasters, Sweet Haven stands out for…",
    suggestions: ["Strengthen local SEO", "Encourage local reviews"]
  }
]

export default function AIMentionTracker() {
  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [customQueries, setCustomQueries] = useState<string[]>([])
  const [results, setResults] = useState<TestResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")

  const generateQueries = () => {
    if (!industry) return []
    
    return sampleQueries.map(query => 
      query
        .replace("{industry}", industry)
        .replace("{target audience}", targetAudience || "consumers")
    )
  }

  const runAnalysis = () => {
    if (!businessName || !industry) return

    setIsAnalyzing(true)
    const queries = generateQueries()
    
    // Simulate AI testing with progressive updates
    queries.forEach((query, index) => {
      setTimeout(() => {
        setCurrentQuery(query)
        
        if (index === queries.length - 1) {
          setTimeout(() => {
            setResults(mockResults)
            setIsAnalyzing(false)
            setCurrentQuery("")
          }, 1000)
        }
      }, index * 1500)
    })
  }

  const addCustomQuery = () => {
    if (customQueries.length < 3) {
      setCustomQueries([...customQueries, ""])
    }
  }

  const updateCustomQuery = (index: number, value: string) => {
    const updated = [...customQueries]
    updated[index] = value
    setCustomQueries(updated)
  }

  const mentionedCount = results.filter(r => r.mentioned).length
  const totalResults = results.length
  const mentionRate = totalResults > 0 ? (mentionedCount / totalResults) * 100 : 0

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-sm p-6 mb-8"
      initial="initial"
      animate="animate"
      variants={springScale}
    >
      <motion.div className="mb-6" variants={fadeInUp}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">AI Mention Tracker</h3>
            <p className="text-sm text-neutral-600">Test if your brand appears in AI search results</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div className="space-y-4" variants={fadeInUp}>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Business Name *
            </label>
            <Input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g., Sweet Haven"
              className="w-full border-neutral-300 px-3 py-2 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Industry/Category *
            </label>
            <Input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., coffee roasters, fitness coaching"
              className="w-full border-neutral-300 px-3 py-2 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Target Audience (Optional)
            </label>
            <Input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., busy professionals, families"
              className="w-full border-neutral-300 px-3 py-2 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Custom Test Queries (Optional)
            </label>
            {customQueries.map((query, index) => (
              <Input
                key={index}
                type="text"
                value={query}
                onChange={(e) => updateCustomQuery(index, e.target.value)}
                placeholder="e.g., best local coffee shop"
                className="mb-2 w-full border-neutral-300 px-3 py-2 focus-visible:ring-blue-500"
              />
            ))}
            {customQueries.length < 3 && (
              <Button
                type="button"
                onClick={addCustomQuery}
                variant="link"
                className="h-auto p-0 text-sm text-blue-600 hover:text-blue-800"
              >
                + Add custom query
              </Button>
            )}
          </div>

          <Button
            onClick={runAnalysis}
            disabled={!businessName || !industry || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Test AI Mentions
              </>
            )}
          </Button>

          <AnimatePresence>
            {isAnalyzing && currentQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3 bg-blue-100 rounded-lg border border-blue-200"
              >
                <p className="text-sm text-blue-800">
                  <strong>Testing:</strong> "{currentQuery}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className="space-y-4" variants={fadeInUp}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-neutral-900">Results</h4>
            {results.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-20 bg-neutral-200 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${mentionRate}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-sm font-semibold text-neutral-700">
                  {mentionRate.toFixed(0)}%
                </span>
              </div>
            )}
          </div>

          <AnimatePresence>
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 ${
                      result.mentioned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-1">
                        {result.mentioned ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-neutral-900 mb-1">
                          {result.query}
                        </h5>
                        <p className="text-sm text-neutral-600 mb-2">
                          {result.context}
                        </p>
                        {result.suggestions.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-neutral-700">Suggestions:</p>
                            {result.suggestions.map((suggestion, i) => (
                              <p key={i} className="text-xs text-neutral-600">
                                • {suggestion}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                <Search className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                <p className="text-sm">Enter your business details to test AI mentions</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500"
        variants={fadeInUp}
      >
        <p className="text-sm text-orange-800">
          <strong>Note:</strong> This is a simulation for demonstration purposes. In practice, 
          you would test these queries monthly with real AI tools like ChatGPT, Claude, or Google's 
          AI features to track your actual mention rate.
        </p>
      </motion.div>
    </motion.div>
  )
}
