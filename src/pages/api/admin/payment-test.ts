export const prerender = false

import type { APIRoute } from 'astro'
import { testPayPalConnection } from '../../../lib/paypalService'
import { testSquareConnection } from '../../../lib/squareService'

function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return false
  return authHeader.slice(7) === import.meta.env.ADMIN_PASSWORD
}

// POST: test the payment credentials currently in the admin form (they don't need to be saved)
export const POST: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) return json({ error: 'Unauthorized' }, 401)

  let body: any
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  const { provider } = body

  if (provider === 'paypal') {
    const clientId = String(body.paypal_client_id || '').trim()
    const secret = String(body.paypal_secret || '').trim()
    if (!clientId || !secret) return json({ error: 'Enter the PayPal Client ID and Secret first' }, 400)

    try {
      const result = await testPayPalConnection(clientId, secret, body.paypal_sandbox !== false)
      return json({ success: true, provider, ...result })
    } catch (err: any) {
      return json({ error: err.message }, 502)
    }
  }

  if (provider === 'square') {
    const accessToken = String(body.square_access_token || '').trim()
    const locationId = String(body.square_location_id || '').trim()
    if (!accessToken || !locationId) return json({ error: 'Enter the Square Access Token and Location ID first' }, 400)

    try {
      const result = await testSquareConnection(accessToken, locationId, body.square_sandbox !== false)
      return json({ success: true, provider, ...result })
    } catch (err: any) {
      return json({ error: err.message }, 502)
    }
  }

  return json({ error: 'On-site payments have nothing to test' }, 400)
}

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
}
