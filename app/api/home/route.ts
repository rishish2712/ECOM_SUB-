export async function GET() {
  return new Response(JSON.stringify({ message: "API testing" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
