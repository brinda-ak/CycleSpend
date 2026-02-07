/**
 * Shared types / shapes for CycleSpend (JSDoc only; no runtime types).
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} [id]
 * @property {string} name
 * @property {string} email
 * @property {number} cycleLength
 * @property {string} lastPeriodStart - ISO date YYYY-MM-DD
 * @property {number} monthlyBudget
 * @property {Record<string, number>} phaseAllocations - menstrual, follicular, ovulatory, luteal
 * @property {string|null} nessieCustomerId
 * @property {string|null} nessieAccountId
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} Transaction
 * @property {string} [id]
 * @property {number} amount - positive = spend
 * @property {string} category
 * @property {string} date - YYYY-MM-DD
 * @property {'nessie'|'manual'} source
 * @property {string} [description]
 * @property {number} [cycleDay]
 * @property {string} [phase]
 */

/**
 * @typedef {Object} SymptomLog
 * @property {number} mood - 1-4
 * @property {number} energy - 1-4
 * @property {number} craving - 1-4
 * @property {number} [cycleDay]
 * @property {string} [phase]
 * @property {string} [timestamp]
 */

/**
 * @typedef {Object} ChallengeEntry
 * @property {string} date
 * @property {string} description
 * @property {number} savedAmount
 * @property {boolean} completed
 */

/**
 * @typedef {Object} CycleReport
 * @property {string} cycleStart
 * @property {string} cycleEnd
 * @property {Record<string, number>} phaseSpends
 * @property {Record<string, number>} categoryBreakdowns
 * @property {Object} cushionStats
 * @property {Array<Object>} topCorrelations
 * @property {string} [aiSummary]
 * @property {Object} [forecast]
 */
