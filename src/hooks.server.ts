// src/hooks.server.ts

import { csrf } from '$lib/server/hooks/csrf'
import { sequence } from '@sveltejs/kit/hooks'

export const handle = sequence(
  // This is necessary because otherwise Slack webhooks don't pass.
  csrf({ bypassedPaths: ['/_webhooks/', '/api/'] })
  // You can add any hook handlers that you might need here
)