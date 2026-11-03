// Slice 4's ISR conformance fixture: a non-dynamic page (no route
// segment, so the pre-existing dynamic-segment scope cut in
// translate-routing.js's assertSlice2Scope stays untouched by this
// fixture) revalidated on a short, real interval so fresh vs. stale vs.
// regenerated is externally observable from a conformance transcript's
// own body-digest/contains check.
export const revalidate = 2;

export default function IsrDemoPage() {
  return (
    <main>
      <h1>{process.env.ORG_NAME} Slice 4 ISR fixture</h1>
      {/* eslint-disable-next-line react-hooks/purity -- deliberate: this fixture's whole job is an externally observable value that changes on every real render, to distinguish fresh/stale/regenerated from outside */}
      <p data-testid="isr-rendered-at">{process.env.NEXT_API_NAME} {Date.now()}</p>
    </main>
  );
}
