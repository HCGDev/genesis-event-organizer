import { Form, TextField, Label } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { Link, Redirect, routes } from '@redwoodjs/router'
import { logError } from 'src/helpers/errorLogger'
import Button from 'src/components/Button/Button'
import { sendPasswordResetEmail } from 'firebase/auth'

const ForgotPasswordPage = () => {
  const [sentSendPassword, setSentSendPassword] = React.useState(false)
  const { loading, currentUser, client } = useAuth()
  const [loadingPasswordReset, setLoadingPasswordReset] = React.useState(false)

  const onForgotPassword = async (data) => {
    var auth = client.firebaseAuth.getAuth()
    setLoadingPasswordReset(true)

    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setSentSendPassword(true)
        setLoadingPasswordReset(false)
      })
      .catch((error) => {
        setLoadingPasswordReset(false)
        logError({
          error,
          showToast: true,
          log: true,
        })
      })
  }

  if (!currentUser?.user) {
    return (
      <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-200 border-sm py-4 text-sm text-gray-700 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-20 w-auto"
            src="/Logo.png"
            alt="GenesisEventOrganizer"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {sentSendPassword ? 'Check your email' : 'Forgot your Password?'}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {sentSendPassword ? (
              <>
                <p className="text-center text-sm mb-6">
                  We have sent password recovery information to your email
                </p>
                <Link
                  to={routes.login()}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  BACK TO LOGIN
                </Link>
              </>
            ) : (
              <Form onSubmit={onForgotPassword} className="flex flex-col">
                <p className="text-center text-sm mb-6">
                  Enter the email address associated with your acccount to
                  recieve password reset instructions
                </p>
                <Label errorClassName="text-red-500" name="email">
                  Email Address
                </Label>
                <TextField
                  name="email"
                  className="border-2 p-2 mb-4"
                  errorClassName="border-2 p-2 mb-4 border-red-500"
                  validation={{
                    required: true,
                  }}
                />
                <Button
                  type="submit"
                  loading={loading || loadingPasswordReset}
                  className="mt-2"
                >
                  Submit
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default ForgotPasswordPage
