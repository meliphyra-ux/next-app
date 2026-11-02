import { createHmac, timingSafeEqual } from "node:crypto";

// Module-level, process-lifetime counter — the NBO function host
// (internal/nodehost) runs one long-lived Node process per pod/
// instance and keeps this module loaded across requests, so this
// survives exactly as long as the scheduler's own cron deliveries do.
// It's reset on redeploy/restart, which is fine: it's a conformance
// probe, not real application state.
let validHits = 0;

function sign(secret: string, cronId: string, timestamp: string): string {
  return createHmac("sha256", secret).update(`${cronId}:${timestamp}`).digest("hex");
}

export async function POST(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const cronId = request.headers.get("x-nbo-cron") ?? "";
  const timestamp = request.headers.get("x-nbo-cron-timestamp") ?? "";
  const secret = process.env.NBO_CRON_SIGNING_SECRET ?? "";

  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
  const want = secret ? sign(secret, cronId, timestamp) : "";

  const a = Buffer.from(token);
  const b = Buffer.from(want);
  const validSignature = secret !== "" && a.length === b.length && timingSafeEqual(a, b);

  if (!validSignature) {
    return Response.json({ ok: false }, { status: 401 });
  }
  validHits++;
  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json({ hits: validHits });
}
