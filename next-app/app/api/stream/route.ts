export async function GET() {
  const encoder = new TextEncoder();
  let i = 0;
  const stream = new ReadableStream({
    async pull(controller) {
      if (i >= 3) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(`chunk${i}\n`));
      i++;
      await new Promise((r) => setTimeout(r, 100));
    },
  });
  return new Response(stream, { headers: { "content-type": "text/plain" } });
}
