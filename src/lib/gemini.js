import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

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
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const prompt = `You are CycleSpend, a supportive financial wellness assistant for women. Generate a 3-4 sentence cycle report summary based on this data. Be encouraging, warm, and empowering. Never shame spending habits. Frame luteal overspending as a biological pattern to manage, not a personal failure. Use specific numbers from the data. Give one concrete, actionable tip for the next cycle.

Data:
${JSON.stringify(cycleData, null, 2)}`
  const result = await model.generateContent(prompt)
  const response = result.response
  return response.text()
}
