import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

/**
 * Generate AI insights for the calendar/heatmap page.
 * @param {Object} params - { transactions, monthlyBudget, phaseSpends, currentPhase }
 * @returns {Promise<string>} 2-3 sentence insight about spending, budget, or cycle patterns
 */
export async function generateCalendarInsights({ transactions = [], monthlyBudget = 0, phaseSpends = {}, currentPhase = '' }) {
  if (!genAI || !apiKey) {
    const total = transactions.reduce((s, t) => s + (t.amount || 0), 0)
    return `Your spending this period: $${total.toFixed(0)}. ${monthlyBudget ? `Budget: $${monthlyBudget}. ` : ''}Add VITE_GEMINI_API_KEY for personalized AI insights.`
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const byCategory = {}
  transactions.forEach((t) => {
    const c = t.category || 'other'
    byCategory[c] = (byCategory[c] || 0) + (t.amount || 0)
  })
  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const prompt = `You are CycleSpend, a supportive financial wellness assistant. In 2-3 short sentences, give ONE actionable insight about this user's spending or budget. Be warm and encouraging. Never shame. Use their data if available.

Data: monthly budget $${monthlyBudget || 'not set'}, current phase: ${currentPhase || 'unknown'}. Phase spends: ${JSON.stringify(phaseSpends)}. Top categories: ${JSON.stringify(topCategories)}. Recent txns: ${transactions.slice(-10).map((t) => `${t.description} $${t.amount}`).join(', ') || 'none'}`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

/**
 * Generate AI cycle report summary.
 * @param {Object} cycleData - phaseSpends, categoryBreakdowns, cushionStats, topCorrelations
 * @returns {Promise<string>} 3-4 sentence summary
 */
export async function generateCycleSummary(cycleData) {
  if (!genAI || !apiKey) {
    return "Add VITE_GEMINI_API_KEY to enable AI summaries. Here's your cycle data: " +
      Object.entries(cycleData.phaseSpends || {}).map(([p, v]) => `${p}: $${v}`).join(', ')
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
  const prompt = `You are CycleSpend, a supportive financial wellness assistant for women. Generate a 3-4 sentence cycle report summary based on this data. Be encouraging, warm, and empowering. Never shame spending habits. Frame luteal overspending as a biological pattern to manage, not a personal failure. Use specific numbers from the data. Give one concrete, actionable tip for the next cycle.

Data:
${JSON.stringify(cycleData, null, 2)}`
  const result = await model.generateContent(prompt)
  const response = result.response
  return response.text()
}
