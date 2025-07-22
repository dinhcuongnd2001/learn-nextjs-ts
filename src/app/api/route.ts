export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('request :', data);
    return Response.json({ messageId: 'call r nha' });
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : 'Unexpected exception';

    return new Response(message, { status: 500 });
  }
}
