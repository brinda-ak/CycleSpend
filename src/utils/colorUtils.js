/**
 * Spending-to-color mapping for heatmap and visualizations.
 * Linear interpolation: $0 → warm bg, median → dark tan, max → cranberry.
 */

const LOW_COLOR = '#F0E6DD'   // warm-bg
const MID_COLOR = '#C4A088'   // dark-tan
const HIGH_COLOR = '#8B2942'  // cranberry

/**
 * Parse hex color to r,g,b (0-255).
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 240, g: 230, b: 221 }
}

/**
 * Interpolate between two hex colors by t (0–1).
 */
function lerpHex(hex1, hex2, t) {
  const a = hexToRgb(hex1)
  const b = hexToRgb(hex2)
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const b_ = Math.round(a.b + (b.b - a.b) * t)
  return `#${[r, g, b_].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Map spending amount to heatmap color.
 * Uses min/max for scale; if all same, returns mid color.
 * @param {number} amount - Spend for the day
 * @param {number} min - Min spend in dataset (or 0)
 * @param {number} max - Max spend in dataset
 * @returns {string} Hex color
 */
export function spendToColor(amount, min, max) {
  if (amount == null || Number.isNaN(amount)) return LOW_COLOR
  if (max <= min) return MID_COLOR
  const t = (amount - min) / (max - min)
  if (t <= 0.5) {
    return lerpHex(LOW_COLOR, MID_COLOR, t * 2)
  }
  return lerpHex(MID_COLOR, HIGH_COLOR, (t - 0.5) * 2)
}

/**
 * Same as spendToColor but with explicit median for 3-point scale.
 * @param {number} amount
 * @param {number} min
 * @param {number} median
 * @param {number} max
 */
export function spendToColorWithMedian(amount, min, median, max) {
  if (amount == null || Number.isNaN(amount)) return LOW_COLOR
  if (max <= min) return MID_COLOR
  const t = (amount - min) / (max - min)
  if (t <= 0.5) {
    return lerpHex(LOW_COLOR, MID_COLOR, t * 2)
  }
  return lerpHex(MID_COLOR, HIGH_COLOR, (t - 0.5) * 2)
}
