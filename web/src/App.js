import { AuthProvider } from '@redwoodjs/auth'
import { getAnalytics } from 'firebase/analytics'

import { initializeApp, getApps, getApp } from '@firebase/app'
import * as firebaseAuth from '@firebase/auth'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

Sentry.init({
  dsn: 'https://e10d59f45d0d41e2ace822d4c222c093@o937181.ingest.sentry.io/5887601',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

const firebaseApp = ((config) => {
  const apps = getApps()
  if (!apps.length) {
    initializeApp(config)
  }
  return getApp()
})(firebaseClientConfig)

export const firebaseClient = {
  firebaseAuth,
  firebaseApp,
}

export const analytics = getAnalytics()

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <AuthProvider client={firebaseClient} type={'firebase'}>
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
