// src/lib/server/hooks/csrf.ts

import { error, json, text, type Handle } from '@sveltejs/kit'

/**
 * CSRF protection copied from sveltekit but with the ability to bypass csrf
 * protection for specific routes.
 */
export const csrf =
  ({ bypassedPaths }: { bypassedPaths: string[] }): Handle =>
  async ({ event, resolve }) => {
    const forbidden =
      event.request.method === 'POST' &&
      event.request.headers.get('origin') !== event.url.origin &&
      isFormContentType(event.request) &&
      !bypassedPaths.find((path) => event.url.pathname.startsWith(path))

    if (forbidden) {
      const csrfError = error(
        403,
        `Cross-site ${event.request.method} form submissions are forbidden`,
      )
      if (event.request.headers.get('accept') === 'application/json') {
        return json(csrfError.body, { status: csrfError.status })
      }
      return text(csrfError.body.message, { status: csrfError.status })
    }

    return resolve(event)
  }
const isContentType = (request: Request, ...types: string[]) =>
  types.includes(
    request.headers.get('content-type')?.split(';', 1)[0]?.trim() ?? '',
  )

const isFormContentType = (request: Request) =>
  isContentType(
    request,
    // 'application/x-www-form-urlencoded',
    'multipart/form-data',
  )
