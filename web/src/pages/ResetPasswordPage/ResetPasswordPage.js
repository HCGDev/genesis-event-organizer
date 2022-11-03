import { useAuth } from '@redwoodjs/auth'
import { navigate, Redirect, routes, useParams } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'
import PasswordCheck from 'src/components/PasswordCheck/PasswordCheck'
import { logError } from 'src/helpers/errorLogger'
import { confirmPasswordReset } from 'firebase/auth'

const ResetPasswordPage = () => {
  const [loadingPasswordReset, setLoadingPasswordReset] = React.useState(false)
  const { client } = useAuth()

  let { mode, oobCode } = useParams()

  if (mode !== 'resetPassword') {
    return <Redirect to="/" />
  }

  if (!oobCode) {
    navigate(routes.forgotPassword())
    toast.error(
      'No reset password code provided, please follow the email link after resetting your password.'
    )
  }

  const onResetPassword = async (data) => {
    var auth = client.firebaseAuth.getAuth()
    setLoadingPasswordReset(true)

    confirmPasswordReset(auth, oobCode, data.password)
      .then(() => {
        setLoadingPasswordReset(false)
        toast.success(
          'Password successfully changed! Redirecting you to login...'
        )
        setTimeout(() => {
          navigate(routes.login())
        }, 3000)
      })
      .catch((error) => {
        setLoadingPasswordReset(false)
        logError({
          error,
          showToast: true,
          log: true,
          route: 'resetPassword',
        })
      })
  }

  return (
    <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-200 border-sm py-4 text-sm text-gray-700 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src="/Logo.png"
          alt="GenesisEventOrganizer"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 mx-4 sm:mx-auto sm:w-full sm:max-w-3xl">
        <PasswordCheck
          onSubmit={onResetPassword}
          submitColor="green"
          loading={loadingPasswordReset}
          submitText={'Reset Password'}
        />
      </div>
    </div>
  )
}

export default ResetPasswordPage
