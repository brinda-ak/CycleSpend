/**
 * Nessie (Capital One Hackathon) API client.
 * Base URL: http://api.nessieisreal.com
 * Auth: key as query param (?key=...)
 */

const NESSIE_BASE = 'http://api.nessieisreal.com'

function getKey() {
  const key = import.meta.env?.VITE_NESSIE_API_KEY
  if (!key) throw new Error('VITE_NESSIE_API_KEY is not set')
  return key
}

function url(path, query = {}) {
  const params = new URLSearchParams({ key: getKey(), ...query })
  return `${NESSIE_BASE}${path}?${params}`
}

/**
 * Create a Nessie customer.
 * @param {{ first_name: string, last_name: string, address: { street_number, street_name, city, state, zip } }} payload
 * @returns {Promise<{ objectCreated?: { _id?: string }, code?: number }>}
 */
export async function createCustomer(payload) {
  const res = await fetch(url('/customers'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status}`)
  return data
}

/**
 * Create a checking account for a customer.
 * @param {string} customerId - Nessie customer _id
 * @param {{ type?: string, nickname?: string, rewards?: number, balance?: number }} payload
 * @returns {Promise<{ objectCreated?: { _id?: string } }>}
 */
export async function createAccount(customerId, payload = {}) {
  const body = {
    type: 'Checking',
    nickname: payload.nickname || 'CycleSpend',
    rewards: payload.rewards ?? 0,
    balance: payload.balance ?? 0,
    ...payload,
  }
  const res = await fetch(url(`/customers/${customerId}/accounts`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status}`)
  return data
}

/**
 * Get account details.
 * @param {string} accountId
 * @returns {Promise<{ balance?: number }>}
 */
export async function getAccount(accountId) {
  const res = await fetch(url(`/accounts/${accountId}`))
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status}`)
  return data
}

/**
 * Get purchases (transactions) for an account.
 * Nessie may return an array or { purchases: [] }; we normalize to an array.
 * @param {string} accountId
 * @returns {Promise<Array<{ _id?: string, purchase_date?: string, amount?: number, description?: string, merchant_id?: string, type?: string }>>}
 */
export async function getPurchases(accountId) {
  const res = await fetch(url(`/accounts/${accountId}/purchases`))
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status}`)
  const list = Array.isArray(data) ? data : (data.purchases || data.transactions || [])
  return list
}

/**
 * Create a purchase (for seeding).
 * @param {string} accountId
 * @param {{ merchant_id: string, medium: string, purchase_date: string, amount: number, description?: string }} payload
 * @returns {Promise<{ objectCreated?: { _id?: string } }>}
 */
export async function createPurchase(accountId, payload) {
  const res = await fetch(url(`/accounts/${accountId}/purchases`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Nessie error: ${res.status}`)
  return data
}
