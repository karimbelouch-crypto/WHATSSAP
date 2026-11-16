// Vercel serverless function: sends one WhatsApp message (template, or free-form text/image within the 24h window) via Meta Cloud API.
// Env vars (Vercel > Settings > Environment Variables):
//   WA_TOKEN       Meta access token (permanent)
//   WA_PHONE_ID    WhatsApp phone number ID
//   APP_PASSWORD   password that protects this endpoint
//   GRAPH_VERSION  optional, default v23.0

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!process.env.APP_PASSWORD || req.headers["x-password"] !== process.env.APP_PASSWORD) {
    return res.status(401).json({ error: "mot de passe ghalat" });
  }
  if (!process.env.WA_TOKEN || !process.env.WA_PHONE_ID) {
    return res.status(500).json({ error: "WA_TOKEN wla WA_PHONE_ID naqsin f Vercel" });
  }
  const { to, template, lang, name, mediaType, mediaUrl,
