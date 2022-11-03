import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import { db } from 'src/lib/db'
import services from 'src/services/**/*.{js,ts}'
import * as Sentry from '@sentry/node'
import { logger } from 'src/lib/logger'

import { getCurrentUser } from 'src/lib/auth'

Sentry.init({
  dsn: 'https://1ef8976c56a4482d821c43d8e607947f@o937181.ingest.sentry.io/5888060',
  tracesSampleRate: 1.0,
})

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  getCurrentUser,
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
