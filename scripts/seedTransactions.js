/**
 * Seed Nessie with 60+ transactions over 56 days, weighted for luteal-phase overspend.
 * Run from project root: NESSIE_API_KEY=your_key node scripts/seedTransactions.js
 * Optional: NESSIE_CUSTOMER_ID and NESSIE_ACCOUNT_ID to skip create and only seed.
 */

const NESSIE_BASE = 'http://api.nessieisreal.com'
const key = process.env.NESSIE_API_KEY || process.env.VITE_NESSIE_API_KEY
if (!key) {
  console.error('Set NESSIE_API_KEY or VITE_NESSIE_API_KEY')
  process.exit(1)
}

function u(path, q = {}) {
  const params = new URLSearchParams({ key, ...q })
  return `${NESSIE_BASE}${path}?${params}`
}

async function createCustomer() {
  const res = await fetch(u('/customers'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: 'CycleSpend',
      last_name: 'Demo',
      address: {
        street_number: '610',
        street_name: 'Purdue Mall',
        city: 'West Lafayette',
        state: 'IN',
        zip: '47907',
      },
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status}`)
  const id = data.objectCreated?._id || data._id
  if (!id) throw new Error('No customer ID in response: ' + JSON.stringify(data))
  return id
}

async function createAccount(customerId) {
  const res = await fetch(u(`/customers/${customerId}/accounts`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'Checking',
      nickname: 'CycleSpend',
      rewards: 0,
      balance: 0,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status}`)
  const id = data.objectCreated?._id || data._id
  if (!id) throw new Error('No account ID in response: ' + JSON.stringify(data))
  return id
}

// Cycle phases for 28-day: menstrual 1-5, follicular 6-13, ovulatory 14-16, luteal 17-28
function getPhase(day) {
  if (day <= 5) return 'menstrual'
  if (day <= 13) return 'follicular'
  if (day <= 16) return 'ovulatory'
  return 'luteal'
}

const MERCHANTS = [
  { id: '1', name: 'Starbucks', category: 'coffee', base: 5 },
  { id: '2', name: 'DoorDash', category: 'food_delivery', base: 14 },
  { id: '3', name: 'Amazon', category: 'online_shopping', base: 22 },
  { id: '4', name: 'Kroger', category: 'groceries', base: 35 },
  { id: '5', name: 'Target', category: 'online_shopping', base: 18 },
  { id: '6', name: 'Uber Eats', category: 'food_delivery', base: 16 },
  { id: '7', name: 'Chipotle', category: 'dining_out', base: 11 },
  { id: '8', name: 'CVS', category: 'self_care', base: 12 },
  { id: '9', name: 'Lyft', category: 'transport', base: 8 },
]

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function createPurchase(accountId, purchaseDate, amount, description, merchantId) {
  const res = await fetch(u(`/accounts/${accountId}/purchases`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merchant_id: merchantId,
      medium: 'balance',
      purchase_date: purchaseDate,
      amount: -amount,
      description: description || 'Purchase',
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status} - ${JSON.stringify(data)}`)
  return data
}

async function main() {
  let customerId = process.env.NESSIE_CUSTOMER_ID
  let accountId = process.env.NESSIE_ACCOUNT_ID

  if (!customerId || !accountId) {
    console.log('Creating Nessie customer and account...')
    customerId = await createCustomer()
    accountId = await createAccount(customerId)
    console.log('Customer ID:', customerId)
    console.log('Account ID:', accountId)
  }

  // 56 days = 2 cycles; start 56 days ago
  const start = new Date()
  start.setDate(start.getDate() - 56)
  let count = 0

  for (let d = 0; d < 56; d++) {
    const date = new Date(start)
    date.setDate(date.getDate() + d)
    const dateStr = date.toISOString().slice(0, 10)
    const cycleDay = (d % 28) + 1
    const phase = getPhase(cycleDay)
    const isLuteal = phase === 'luteal'
    const multiplier = isLuteal ? 1.4 + Math.random() * 0.2 : 0.9 + Math.random() * 0.2
    const numTxns = isLuteal ? 2 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 2)

    for (let t = 0; t < numTxns; t++) {
      const merchant = randomChoice(MERCHANTS)
      const amount = Math.round(merchant.base * multiplier * (0.8 + Math.random() * 0.4))
      await createPurchase(accountId, dateStr, amount, merchant.name, merchant.id)
      count++
    }
  }

  console.log('Seeded', count, 'transactions. Customer ID:', customerId, 'Account ID:', accountId)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
