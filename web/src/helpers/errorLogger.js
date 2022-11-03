import * as Sentry from '@sentry/react'
import { toast } from '@redwoodjs/web/dist/toast'

export const logError = ({
  error,
  showToast = false,
  customMessage = null,
  log = false,
  route = '',
  func = '',
  extraData = {},
}) => {
  console.log('Error, ', error)

  if (showToast) {
    toast.error(
      customMessage ||
        error.message ||
        'An unexpected error has occured, the admin team has been notified.'
    )
  }

  if (log || (!error.message && !customMessage)) {
    Sentry.captureException(error, {
      func,
      route,
      ...extraData,
    })
  }
}
