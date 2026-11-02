export async function GET(request: Request) {
  return Response.json({ echoed: request.headers.get("x-mw-echo") });
}
