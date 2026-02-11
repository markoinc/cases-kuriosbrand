import { useState } from 'react'
import { Bot, MapPin, Globe, Mail, Loader2, CheckCircle, XCircle, AlertCircle, ArrowRight, Info, ExternalLink, Zap, TrendingUp } from 'lucide-react'

// API endpoint
const API_BASE = 'https://api.kuriosbrand.com'

interface CategoryResult {
  name: string
  score: number
  findings: string[]
  recommendations: string[]
}

interface AuditResult {
  success: boolean
  url: string
  business_name: string | null
  ai_visibility_score: number
  local_seo_score: number
  total_score: number
  ai_categories: CategoryResult[]
  local_categories: CategoryResult[]
  quick_wins: string[]
  priority_fixes: string[]
}

// Score gauge component
const ScoreGauge = ({ score, maxScore = 100, label, icon: Icon, color }: { 
  score: number
  maxScore?: number
  label: string
  icon: React.ElementType
  color: string 
}) => {
  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  const getGrade = (s: number, max: number) => {
    const pct = (s / max) * 100
    if (pct >= 80) return { grade: 'A', text: 'Excellent' }
    if (pct >= 70) return { grade: 'B+', text: 'Very Good' }
    if (pct >= 60) return { grade: 'B', text: 'Good' }
    if (pct >= 50) return { grade: 'C+', text: 'Above Average' }
    if (pct >= 40) return { grade: 'C', text: 'Average' }
    if (pct >= 30) return { grade: 'D', text: 'Needs Work' }
    return { grade: 'F', text: 'Poor' }
  }
  
  const gradeInfo = getGrade(score, maxScore)
  
  return (
    <div className="flex flex-col items-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      </div>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-700" />
          <circle
            cx="64" cy="64" r="45" fill="none" stroke="currentColor" strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
            className={color} style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white">{score}</span>
          <span className="text-xs text-slate-400">/{maxScore}</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className={`text-lg font-bold ${color}`}>{gradeInfo.grade}</span>
        <span className="text-sm text-slate-400 ml-2">- {gradeInfo.text}</span>
      </div>
    </div>
  )
}

const CategoryCard = ({ category, type }: { category: CategoryResult; type: 'ai' | 'local' }) => {
  const scoreColor = category.score >= 7 ? 'text-emerald-400' : category.score >= 4 ? 'text-yellow-400' : 'text-red-400'
  const bgColor = category.score >= 7 ? 'bg-emerald-500/10' : category.score >= 4 ? 'bg-yellow-500/10' : 'bg-red-500/10'
  
  return (
    <div className={`p-4 rounded-lg border border-slate-700 ${bgColor}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {type === 'ai' ? <Bot className="w-4 h-4 text-blue-400" /> : <MapPin className="w-4 h-4 text-emerald-400" />}
          <span className="font-medium text-white text-sm">{category.name}</span>
        </div>
        <span className={`font-bold ${scoreColor}`}>{category.score}/10</span>
      </div>
      {category.findings.slice(0, 2).map((finding, idx) => (
        <p key={idx} className="text-xs text-slate-400 mt-1">{finding}</p>
      ))}
    </div>
  )
}

const QuickWin = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
    <Zap className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
    <span className="text-sm text-slate-300">{text}</span>
  </div>
)

const PriorityFix = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
    <span className="text-sm text-slate-300">{text}</span>
  </div>
)

const AiSeo = () => {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState('')

  const analyzeWebsite = async () => {
    if (!url) {
      setError('Please enter a website URL')
      return
    }
    if (!email) {
      setError('Please enter your email to receive the detailed PDF report')
      return
    }

    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = 'https://' + normalizedUrl
    }

    setIsAnalyzing(true)
    setError('')
    setProgress(0)
    setProgressText('Connecting to analysis server...')
    
    // Smooth progress animation - slower increments, never stops
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Asymptotic approach - slows down as it gets higher but never stops
        const remaining = 99 - prev
        const increment = Math.max(0.5, remaining * 0.08 + Math.random() * 0.5)
        const newProgress = Math.min(prev + increment, 99)
        
        if (newProgress < 15) setProgressText('Connecting to analysis server...')
        else if (newProgress < 25) setProgressText('Checking AI crawler access...')
        else if (newProgress < 35) setProgressText('Analyzing structured data...')
        else if (newProgress < 45) setProgressText('Evaluating content structure...')
        else if (newProgress < 55) setProgressText('Checking E-E-A-T signals...')
        else if (newProgress < 65) setProgressText('Analyzing local SEO signals...')
        else if (newProgress < 75) setProgressText('Checking NAP consistency...')
        else if (newProgress < 85) setProgressText('Analyzing reviews & citations...')
        else if (newProgress < 92) setProgressText('Generating recommendations...')
        else setProgressText('Finalizing report...')
        
        return newProgress
      })
    }, 300)

    try {
      const response = await fetch(`${API_BASE}/audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizedUrl, email })
      })

      clearInterval(progressInterval)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Analysis failed (${response.status})`)
      }

      const data = await response.json()
      
      setProgress(100)
      setProgressText('Complete!')
      
      // Transform API response to match our interface
      setResult({
        success: data.success,
        url: data.url,
        business_name: data.business_name,
        ai_visibility_score: data.ai_visibility_score,
        local_seo_score: data.local_seo_score,
        total_score: data.total_score,
        ai_categories: data.ai_categories || [],
        local_categories: data.local_categories || [],
        quick_wins: data.quick_wins || [],
        priority_fixes: data.priority_fixes || []
      })
      
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.')
      setIsAnalyzing(false)
    }
  }

  // Input Screen
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Free AI & Local SEO Audit</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Is Your Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AI-Ready?</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Find out if ChatGPT, Perplexity, and Google can find your business
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-white mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Website URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourfirm.com"
                  className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-lg placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  disabled={isAnalyzing}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email (for detailed PDF report)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@lawfirm.com"
                  className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-700 rounded-lg placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
                  disabled={isAnalyzing}
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
              
              <button
                onClick={analyzeWebsite}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 text-lg transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {progressText}
                  </>
                ) : (
                  <>
                    Get My Free Audit
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-sm text-slate-400 text-center">{Math.round(progress)}% complete</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <Bot className="w-6 h-6 text-blue-400" />
              <div>
                <div className="font-medium text-white text-sm">AI Visibility</div>
                <div className="text-xs text-slate-400">ChatGPT, Claude, Perplexity</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="font-medium text-white text-sm">Local Visibility</div>
                <div className="text-xs text-slate-400">Google Maps, Local Search</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              20-point analysis
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              PDF report
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              100% free
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Results Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Your AI & Local Visibility Report
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Globe className="w-4 h-4" />
            <span>{result.business_name || result.url}</span>
          </div>
        </div>
        
        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ScoreGauge 
            score={result.ai_visibility_score} 
            maxScore={100}
            label="AI Visibility" 
            icon={Bot} 
            color="text-blue-400" 
          />
          <ScoreGauge 
            score={result.local_seo_score} 
            maxScore={100}
            label="Local SEO" 
            icon={MapPin} 
            color="text-emerald-400" 
          />
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-blue-500/30 rounded-xl">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">Total Score</span>
            <span className="text-5xl font-black text-white">{result.total_score}</span>
            <span className="text-lg text-slate-400">/200</span>
            <div className="mt-4 text-sm text-center">
              {result.total_score >= 140 ? (
                <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Above Average</span>
              ) : result.total_score >= 80 ? (
                <span className="text-yellow-400">Room for Improvement</span>
              ) : (
                <span className="text-red-400">Needs Attention</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Wins */}
        {result.quick_wins.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              Quick Wins (Do These First)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.quick_wins.slice(0, 6).map((win, idx) => (
                <QuickWin key={idx} text={win} />
              ))}
            </div>
          </div>
        )}

        {/* Priority Fixes */}
        {result.priority_fixes.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              Priority Fixes (Categories Below 50%)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.priority_fixes.slice(0, 6).map((fix, idx) => (
                <PriorityFix key={idx} text={fix} />
              ))}
            </div>
          </div>
        )}

        {/* AI Visibility Breakdown */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-400" />
            AI Visibility Breakdown ({result.ai_visibility_score}/100)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.ai_categories.map((cat, idx) => (
              <CategoryCard key={idx} category={cat} type="ai" />
            ))}
          </div>
        </div>

        {/* Local SEO Breakdown */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            Local SEO Breakdown ({result.local_seo_score}/100)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.local_categories.map((cat, idx) => (
              <CategoryCard key={idx} category={cat} type="local" />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Dominate AI & Local Search?</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Get a custom implementation plan and expert help to fix these issues and outrank your competitors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://calendly.com/mark-kuriosbrand/mva-discovery-call" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all"
            >
              Book Free Strategy Call
              <ExternalLink className="w-4 h-4" />
            </a>
            <button 
              onClick={() => { setResult(null); setUrl(''); setEmail(''); setIsAnalyzing(false); setProgress(0); }}
              className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Analyze Another Site
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-500">
              <strong className="text-slate-400">About this audit:</strong> We analyzed your website across 20 critical factors that determine visibility in AI search (ChatGPT, Claude, Perplexity) and local search (Google Maps, local results). 
              A detailed PDF report has been sent to your email.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiSeo
