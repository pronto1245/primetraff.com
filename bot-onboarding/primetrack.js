// PrimeTrack API client (advertiser API key, scope partners:write)

function createPrimeTrack({ baseUrl, apiKey }) {
  const root = baseUrl.replace(/\/+$/, "") + "/api/v1/advertiser";

  async function call(method, path, body) {
    const res = await fetch(root + path, {
      method,
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    let json = null;
    try { json = await res.json(); } catch { /* empty body */ }
    if (!res.ok || json?.success === false) {
      throw new Error(`PrimeTrack ${method} ${path}: ${res.status} ${json?.error || json?.message || ""}`.trim());
    }
    return json?.data;
  }

  return {
    listPartners: (since) => call("GET", `/partners/onboarding?since=${encodeURIComponent(since)}`),
    saveOnboarding: (publisherId, patch) => call("POST", `/partners/${encodeURIComponent(publisherId)}/onboarding`, patch),
    activate: (publisherId) => call("POST", `/partners/${encodeURIComponent(publisherId)}/activate`),
  };
}

module.exports = { createPrimeTrack };
