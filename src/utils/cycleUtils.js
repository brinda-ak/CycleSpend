/**
 * Cycle phase logic for CycleSpend.
 * Default 28-day model: Menstrual 1–5, Follicular 6–13, Ovulatory 14–16, Luteal 17–28.
 */

export const PHASES = Object.freeze({
  MENSTRUAL: 'menstrual',
  FOLLICULAR: 'follicular',
  OVULATORY: 'ovulatory',
  LUTEAL: 'luteal',
})

/** Day ranges per phase (1-based), for default 28-day cycle. */
const DEFAULT_PHASE_DAYS = {
  [PHASES.MENSTRUAL]: { start: 1, end: 5 },
  [PHASES.FOLLICULAR]: { start: 6, end: 13 },
  [PHASES.OVULATORY]: { start: 14, end: 16 },
  [PHASES.LUTEAL]: { start: 17, end: 28 },
}

/**
 * Get cycle day (1–cycleLength) for a date given last period start.
 * @param {string} cycleStartDate - ISO date string (YYYY-MM-DD) of last period start
 * @param {string|Date} forDate - Date to compute cycle day for
 * @param {number} cycleLength - Average cycle length (default 28)
 * @returns {{ day: number, phase: string }}
 */
export function getCycleDayAndPhase(cycleStartDate, forDate, cycleLength = 28) {
  const start = new Date(cycleStartDate)
  const date = typeof forDate === 'string' ? new Date(forDate) : forDate
  const diff = Math.floor((date - start) / (24 * 60 * 60 * 1000))
  if (diff < 0) {
    return { day: 1, phase: PHASES.MENSTRUAL }
  }
  const day = (diff % cycleLength) + 1
  const phase = getPhaseForDay(day, cycleLength)
  return { day, phase }
}

/**
 * Get cycle day only (1–cycleLength).
 */
export function getCycleDay(cycleStartDate, forDate, cycleLength = 28) {
  return getCycleDayAndPhase(cycleStartDate, forDate, cycleLength).day
}

/**
 * Get phase name for a cycle day.
 * @param {number} day - 1-based cycle day
 * @param {number} cycleLength - Default 28
 */
export function getPhaseForDay(day, cycleLength = 28) {
  const phaseRanges = getPhaseRanges(cycleLength)
  for (const [phase, { start, end }] of Object.entries(phaseRanges)) {
    if (day >= start && day <= end) return phase
  }
  return PHASES.LUTEAL
}

/**
 * Phase day ranges for a given cycle length.
 * Menstrual ~18%, Follicular ~29%, Ovulatory ~11%, Luteal ~43% (research-based proportions).
 */
function getPhaseRanges(cycleLength) {
  const m = Math.round(cycleLength * 0.18) || 5
  const f = Math.round(cycleLength * 0.29) || 8
  const o = Math.round(cycleLength * 0.11) || 3
  const lutealStart = m + f + o + 1
  return {
    [PHASES.MENSTRUAL]: { start: 1, end: m },
    [PHASES.FOLLICULAR]: { start: m + 1, end: m + f },
    [PHASES.OVULATORY]: { start: m + f + 1, end: m + f + o },
    [PHASES.LUTEAL]: { start: lutealStart, end: cycleLength },
  }
}

/**
 * Get current phase and day for today given user's last period start.
 * @param {string} cycleStartDate - ISO date (YYYY-MM-DD)
 * @param {number} cycleLength
 * @returns {{ phase: string, day: number, phaseLabel: string }}
 */
export function getCurrentPhase(cycleStartDate, cycleLength = 28) {
  const today = new Date().toISOString().slice(0, 10)
  const { day, phase } = getCycleDayAndPhase(cycleStartDate, today, cycleLength)
  const phaseLabel = phase.charAt(0).toUpperCase() + phase.slice(1)
  return { phase, day, phaseLabel }
}

/**
 * Map phase name to hex color (for bands, badges, charts).
 */
export function getPhaseColor(phase) {
  const colors = {
    [PHASES.MENSTRUAL]: '#5B1A2E',
    [PHASES.FOLLICULAR]: '#7A4B5E',
    [PHASES.OVULATORY]: '#8B2942',
    [PHASES.LUTEAL]: '#B56B4A',
  }
  return colors[phase] || '#7A4B5E'
}

/**
 * Convert a calendar date to cycle day given last period start (alias for getCycleDay).
 */
export function dateToCycleDay(cycleStartDate, date, cycleLength = 28) {
  return getCycleDay(cycleStartDate, date, cycleLength)
}

/**
 * Default phase budget ratios from research (Pine & Fletcher, etc.).
 */
export const DEFAULT_PHASE_ALLOCATIONS = {
  [PHASES.MENSTRUAL]: 0.25,
  [PHASES.FOLLICULAR]: 0.22,
  [PHASES.OVULATORY]: 0.13,
  [PHASES.LUTEAL]: 0.40,
}

/**
 * Number of days in each phase for default 28-day cycle.
 */
export function getPhaseDayCounts(cycleLength = 28) {
  const r = getPhaseRanges(cycleLength)
  return {
    [PHASES.MENSTRUAL]: r[PHASES.MENSTRUAL].end - r[PHASES.MENSTRUAL].start + 1,
    [PHASES.FOLLICULAR]: r[PHASES.FOLLICULAR].end - r[PHASES.FOLLICULAR].start + 1,
    [PHASES.OVULATORY]: r[PHASES.OVULATORY].end - r[PHASES.OVULATORY].start + 1,
    [PHASES.LUTEAL]: r[PHASES.LUTEAL].end - r[PHASES.LUTEAL].start + 1,
  }
}
