// Minimal, safe-as-possible frontend calls for AT (demo only)
const API_KEY = import.meta.env.VITE_AT_API_KEY as string;
const USERNAME = import.meta.env.VITE_AT_USERNAME as string;
const SHORTCODE = import.meta.env.VITE_AT_SHORTCODE as string;

// AT Sandbox base for SMS (sending). In production you'd secure this behind a backend.
const AT_BASE = "https://api.sandbox.africastalking.com/version1";

// Send an SMS (works in Sandbox if your phone is opted-in)
export async function sendSMS(to: string | string[], message: string) {
  const recipients = Array.isArray(to) ? to.join(",") : to;
  const body = new URLSearchParams({ username: USERNAME, to: recipients, message });

  const res = await fetch(`${AT_BASE}/messaging`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      apiKey: API_KEY,          // AT expects "apiKey" header (case sensitive)
      Accept: "application/json",
    },
    body,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`SMS failed: ${res.status} ${txt}`);
  }
  return res.json();
}

// NOTE: USSD & WhatsApp inbound require callbacks (backend).
// We provide a USSD client-side simulator so you can demo the flow without a server.
export const AT_CONFIG = { USERNAME, SHORTCODE };
