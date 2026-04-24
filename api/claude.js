export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.Voxana_api_key
  console.log('ENV KEY EXISTS:', !!apiKey)
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const { system, messages, max_tokens = 2000, model = 'claude-opus-4-5' } = req.body

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, system, messages }),
    })

    const data = await upstream.json()

    if (!upstream.ok) {
      return res.status(upstream.status).json(data)
    }

    return res.status(200).json(data)
  } catch (err) {
    return res.status(502).json({ error: 'Upstream request failed', detail: err.message })
  }
}
