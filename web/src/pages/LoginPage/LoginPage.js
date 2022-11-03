import { Form, TextField, PasswordField, Submit, Label } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes, Link, navigate, useParams } from '@redwoodjs/router'
import { GoogleIcon } from 'src/components/Icons/Google'
import { FacebookIcon } from 'src/components/Icons/Facebook'
import { TwitterIcon } from 'src/components/Icons/Twitter'
import { logError } from 'src/helpers/errorLogger'
import Button from 'src/components/Button/Button'

const LoginPage = () => {
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { logIn, loading, currentUser, logOut, client } = useAuth()
  const { redirectTo } = useParams()

  const onSubmit = async (data) => {
    setIsLoading(true)
    await logIn({ ...data }).catch((error) => {
      setIsLoading(false)
      logError({
        error,
        showToast: true,
        log: true,
      })
    })
    setError(null)
  }

  const onProviderClick = async (provider) => {
    setIsLoading(true)
    await logIn(provider)
      .then(async (res) => {
        setIsLoading(false)
        if (res.additionalUserInfo.isNewUser) {
          await client
            .auth()
            ?.currentUser?.delete()
            .then(() => {
              logError({
                error: null,
                customMessage:
                  'A GEO account could not be found with this social login. Please Sign Up first.',
                showToast: true,
                log: false,
              })
            })
          await logOut().then(navigate(routes.login()))
        }
      })
      .catch((error) => {
        setIsLoading(false)
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form onSubmit={onSubmit} className="flex flex-col">
              {error && <p>{error}</p>}
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
              <Label errorClassName="text-red-500" name="password">
                Password
              </Label>
              <PasswordField
                name="password"
                className="border-2 p-2"
                errorClassName="border-2 p-2 border-red-500"
                validation={{
                  required: true,
                }}
              />
              <div className="text-sm my-4 text-center">
                <Link
                  to={routes.forgotPassword()}
                  className="text-sm text-green-700 hover:text-green-600"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button type="submit" loading={isLoading} className="mt-0 mb-0">
                Sign in
              </Button>
            </Form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <div>
                  <button
                    disabled={loading}
                    onClick={async () =>
                      await onProviderClick('google.com', 'GOOGLE')
                    }
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <GoogleIcon />
                  </button>
                </div>
                {/*

                <div>
                  <button
                    disabled={loading}
                    onClick={async () =>
                      await onProviderClick('twitter.com', 'TWITTER')
                    }
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <TwitterIcon />
                  </button>
                </div>

                <div>
                  <button
                    disabled={loading}
                    onClick={async () =>
                      await onProviderClick('facebook.com', 'FACEBOOK')
                    }
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <FacebookIcon />
                  </button>
                </div>
                  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <Redirect to={redirectTo ? redirectTo : '/'} />
  }
}

export default LoginPage
