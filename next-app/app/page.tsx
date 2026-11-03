// Slice 2's SSR conformance fixture: force-dynamic so Next emits this as a
// real appPages/nodejs output (not an auto-static prerender, which Slice 2's
// adapter deliberately rejects — ISR/prerendering is Slice 4 scope). Content
// stays fixed and deterministic despite rendering fresh on every request, so

import { MessageContent } from "./components/MessageContent";

// a conformance transcript's body digest stays stable across runs.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main style={{'background': 'red'}}>
      <h1>NBO Slice 2 SSR fixture</h1>
      <p>This page is server-rendered on every request.</p>
      <MessageContent />
    </main>
  );
}
