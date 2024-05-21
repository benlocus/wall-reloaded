import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
  const json = await event.request.json()
  console.log(json)
}