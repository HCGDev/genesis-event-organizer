import { useEffect, useRef } from 'react'
import {
  Form,
  TextField,
  Submit,
  Label,
  TextAreaField,
  FormError,
  SelectField,
  useForm,
  Controller,
} from '@redwoodjs/forms'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes, Redirect, useParams } from '@redwoodjs/router'

import NicknameCheckField from 'src/components/NicknameCheckField/NicknameCheckField'
import { getAddress } from 'src/helpers/formatAddress'
import UserPictureSelector from 'src/components/UserPictureSelector/UserPictureSelector'
import PasswordCheck from 'src/components/PasswordCheck/PasswordCheck'
import { GoogleIcon } from 'src/components/Icons/Google'
import Button from 'src/components/Button/Button'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { logError } from 'src/helpers/errorLogger'
import { getNames } from 'country-list'
import Select from 'react-select'

const CREATE_USER = gql`
  mutation CreateUserMutation(
    $input: CreateUserInput!
    $storeInput: CreateUserStoreInput
  ) {
    createUser(input: $input, storeInput: $storeInput) {
      id
    }
  }
`

const distributors = [
  'ABC Blackfire Distribution',
  'ACD Distribution',
  'Alliance Game Distributors',
  'Asmodee',
  'Golden Distribution',
  'Grosnor Distribution Inc',
  'GTS Distribution',
  'Hit Point Sales',
  'Lion Rampant',
  'Luma Games',
  'Prince Wholesalers',
  'Publisher Services Inc',
  'Universal Distribution',
]

const SignupPage = ({ type }) => {
  const [error, setError] = React.useState(null)
  const [step, setStep] = React.useState(1)
  const [form, setForm] = React.useState({})
  const [nicknameValid, setNicknameValid] = React.useState(null)
  const [userPicture, setUserPicture] = React.useState({ url: null })
  const { signUp, loading, currentUser, client } = useAuth()
  const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER)
  const formMethods = useForm()
  const password = useRef()
  password.current = formMethods.watch('password', '')
  const { redirectTo } = useParams()

  React.useEffect(() => {
    if (!type) {
      setForm({
        ...form,
        role: null,
      })
    } else {
      if (!form.role) {
        setForm({
          ...form,
          role: type.toUpperCase(),
        })

        setStep(2)
      }
    }
  }, [type])

  const onSubmit = async (data) => {
    let newData = { ...data, ...form }
    await signUp({ password: newData.password, email: newData.email })
      .then(async () => {
        delete newData.password
        await callCreateUser(newData)
      })
      .catch((error) => {
        logError({
          error,
          showToast: true,
          log: true,
          func: 'onSubmit',
          route: '/signup',
        })
      })
  }

  const onProviderClick = async (provider) => {
    await signUp(provider)
      .then(async () => {
        await callCreateUser({ ...form })
      })
      .catch((error) => {
        logError({
          error,
          showToast: true,
          log: true,
          func: 'onProviderClick',
          route: '/signup',
        })
      })
  }

  const callCreateUser = async (data) => {
    let {
      role,
      email,
      nickname,
      firstname,
      lastname,
      dob,
      gender,
      phone,
      city,
      state,
      country,
      zip,
      howHeard,
    } = data

    let variables = {
      input: {
        role,
        nickname,
        email,
        firstname,
        lastname,
        dob,
        gender,
        phone,
        city,
        state,
        country,
        zip,
        howHeard,
        imageId: userPicture?.id,
      },
    }

    if (role === 'EO') {
      variables.storeInput = {
        name: data['store-name'],
        email: data['store-email'],
        phone: data['store-phone'],
        lat: data.lat,
        lng: data.lng,
        street1: data['formatted_address'],
        city: data['store-city'],
        country: data['store-country'],
        state: data['store-state'],
        zip: data['store-zip'],
        distributor: data.distributor,
      }
    }

    await createUser({
      variables,
    })
      .then(() => {
        setError(null)
        if (role === 'EO') navigate(routes.storePending())
        window.location.reload()
      })
      .catch((error) => {
        var auth = client?.auth()?.currentUser
        auth.delete().then(() => {
          logError({
            error,
            showToast: true,
            log: true,
            func: 'callCreateUser',
            route: '/signup',
          })
        })
      })
  }

  const selectType = (role) => {
    setForm({
      ...form,
      role,
    })
    setStep(2)
    navigate(
      `/signup/${role.toLowerCase()}${
        redirectTo ? '?redirectTo=' + redirectTo : ''
      }`
    )
  }

  const addToForm = (data) => {
    setForm({
      ...form,
      ...data,
    })

    setStep(step + 1)
  }

  const onSelectAddress = async (data) => {
    var addr = await getAddress(data.label)
    setForm({
      ...form,
      'store-zip': addr.postal_code,
      'store-country': addr.country,
      'store-city': addr.locality,
      'store-state': addr.administrative_area_level_1,
      lat: addr.lat,
      lng: addr.lng,
      formatted_address: addr.formatted_address,
    })

    formMethods.setValue('store-zip', addr.postal_code)
    formMethods.setValue('store-country', addr.country)
    formMethods.setValue('store-city', addr.locality)
    formMethods.setValue('store-state', addr.administrative_area_level_1)
    formMethods.setValue('store-street1', addr.formatted_address)
  }

  useEffect(() => {})

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          <button
            className="w-full max-w-sm py-4 px-4 h-24 sm:h-auto border rounded-md text-white bg-green-700 hover:bg-green-800 justify-center items-center flex flex-col sm:flex-row"
            onClick={() => selectType('EO')}
          >
            <div className="mr-0 sm:mr-4">EVENT ORGANIZER</div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </button>

          <button
            className="w-full max-w-sm py-2 px-4 h-24 sm:h-auto border rounded-md text-white bg-green-700 hover:bg-green-800 justify-center items-center flex flex-col sm:flex-row"
            onClick={() => selectType('PLAYER')}
          >
            <div className="mr-0 sm:mr-4">PLAYER</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      )
    } else if (step === 2) {
      if (form.role === 'PLAYER') {
        return (
          <Form
            onSubmit={(data) => {
              nicknameValid && addToForm(data)
            }}
            className="grid grid-cols-2 gap-4"
            validation={{ mode: 'onBlur' }}
            formMethods={formMethods}
          >
            <FormError error={error} className="col-span-2" />
            <div className="flex flex-col col-span-2">
              <span name="image" className="text-center">
                User Image
              </span>
              <UserPictureSelector
                userPicture={userPicture}
                selectImage={(image) => setUserPicture({ ...image })}
              />
              <span name="firstname">Unique Nickname</span>
              <NicknameCheckField
                onChange={(data) => {
                  setForm({
                    ...form,
                    ...data,
                  })
                }}
                setNicknameValid={setNicknameValid}
                defaultValue={form['nickname']}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="firstname">
                First Name
              </Label>
              <TextField
                name="firstname"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['firstname']}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="lastname">
                Last Name
              </Label>
              <TextField
                name="lastname"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['lastname']}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="email" errorClassName="text-red-500">
                Email
              </Label>
              <TextField
                name="email"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['email']}
                validation={{
                  required: true,
                  pattern: {
                    value: /[^@]+@[^\.]+\..+/,
                  },
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="phone" errorClassName="text-red-500">
                Phone Number
              </Label>
              <TextField
                name="phone"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['phone']}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full col-span-2 italic text-gray-500 text-sm">
              Your email and phone number is collected for authentication and
              tournament registration updates and will never be shared with
              anyone.
            </div>
            <div className="flex flex-col w-full">
              <Label name="dob" errorClassName="text-red-500">
                Date of Birth
              </Label>
              <Controller
                control={formMethods.control}
                name="dob"
                rules={{
                  required: true,
                }}
                render={({ field: { name, value, onChange, ref, onBlur } }) => (
                  <DatePicker
                    onChange={onChange}
                    autoComplete="off"
                    selected={value}
                    name={name}
                    customInputRef={ref}
                    onBlur={onBlur}
                    maxDate={new Date()}
                    className="border-2 p-2 mt-2 w-full"
                    errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="gender" errorClassName="text-red-500">
                Gender (Optional)
              </Label>
              <TextField
                name="gender"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['gender']}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="city" errorClassName="text-red-500">
                City (Optional)
              </Label>
              <TextField
                name="city"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['city']}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="state" errorClassName="text-red-500">
                State/Province (Optional)
              </Label>
              <TextField
                name="state"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['state']}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="country" errorClassName="text-red-500">
                Country (Optional)
              </Label>
              <Controller
                control={formMethods.control}
                name="country"
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    name={name}
                    inputRef={ref}
                    styles={{
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      container: (provided) => ({ ...provided, marginTop: 8 }),
                    }}
                    value={{ value, label: value }}
                    onChange={(val) => onChange(val.value)}
                    options={getNames().map((countryName) => ({
                      label: countryName,
                      value: countryName,
                    }))}
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="zip" errorClassName="text-red-500">
                Zip Code/Postal Code (Optional)
              </Label>
              <TextField
                name="zip"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['zip']}
              />
            </div>
            <div className="flex flex-col w-full col-span-2">
              <Label name="howHeard">
                How did you hear about us? (Optional)
              </Label>
              <TextAreaField
                name="howHeard"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['howHeard']}
              />
            </div>
            <div className="flex col-span-2 w-full">
              <Button disabled={!nicknameValid} type="submit">
                Next
              </Button>
            </div>
          </Form>
        )
      } else if (form.role === 'EO') {
        return (
          <Form
            onSubmit={(data) => {
              nicknameValid && addToForm(data)
            }}
            className="grid grid-cols-2 gap-4"
            validation={{ mode: 'onBlur' }}
            formMethods={formMethods}
          >
            <h3 className="col-span-2 mb-4 font-bold underline text-xl">
              Store Owner Information
            </h3>
            <FormError error={error} className="col-span-2" />
            <div className="flex flex-col col-span-2">
              <span name="image" className="text-center">
                User Image
              </span>
              <UserPictureSelector
                userPicture={userPicture}
                selectImage={(image) => setUserPicture({ ...image })}
              />
              <span name="firstname">Unique Nickname</span>
              <NicknameCheckField
                onChange={(data) => {
                  setForm({
                    ...form,
                    ...data,
                  })
                }}
                setNicknameValid={setNicknameValid}
                defaultValue={form.nickname}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="firstname">
                First Name
              </Label>
              <TextField
                name="firstname"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form.firstname}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label errorClassName="text-red-500" name="lastname">
                Last Name
              </Label>
              <TextField
                name="lastname"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form.lastname}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="email" errorClassName="text-red-500">
                Email
              </Label>
              <TextField
                name="email"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form.email}
                validation={{
                  required: true,
                  pattern: {
                    value: /[^@]+@[^\.]+\..+/,
                  },
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="phone" errorClassName="text-red-500">
                Phone Number
              </Label>
              <TextField
                name="phone"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form.phone}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full col-span-2 italic text-gray-500 text-sm">
              Your email and phone number is collected for authentication and
              tournament registration updates and will never be shared with
              anyone.
            </div>
            <h3 className="col-span-2 mb-4 font-bold underline text-xl">
              Store Information
            </h3>
            <div className="flex flex-col w-full col-span-2">
              <Label errorClassName="text-red-500" name="store-name">
                Store Name
              </Label>
              <TextField
                name="store-name"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form['store-name']}
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full col-span-2">
              <Label errorClassName="text-red-500" name="store-street1">
                Store Address
              </Label>
              <Controller
                control={formMethods.control}
                name="store-street1"
                rules={{
                  required: true,
                }}
                render={({ field: { name, ref } }) => (
                  <GooglePlacesAutocomplete
                    apiKey={process.env.GOOGLE_API_KEY}
                    ref={ref}
                    name={name}
                    selectProps={{
                      value: form.address,
                      placeholder: '',
                      onChange: onSelectAddress,
                      styles: {
                        control: (provide) => ({
                          ...provide,
                          borderColor: formMethods.formState.errors[
                            'store-street1'
                          ]
                            ? 'rgba(239, 68, 68, 1)'
                            : 'rgba(229, 231, 235, 0.5)',
                          borderWidth: formMethods.formState.errors[
                            'store-street1'
                          ]
                            ? '2px'
                            : '1px',
                        }),
                      },
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-email" errorClassName="text-red-500">
                Store Email Address
              </Label>
              <TextField
                name="store-email"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                  pattern: {
                    value: /[^@]+@[^\.]+\..+/,
                  },
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-phone" errorClassName="text-red-500">
                Store Phone Number
              </Label>
              <TextField
                name="store-phone"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-city" errorClassName="text-red-500">
                Store City
              </Label>
              <TextField
                name="store-city"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-state" errorClassName="text-red-500">
                Store State/Province
              </Label>
              <TextField
                name="store-state"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-country" errorClassName="text-red-500">
                Store Country
              </Label>
              <TextField
                name="store-country"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="store-zip" errorClassName="text-red-500">
                Store Zip Code/Postal Code
              </Label>
              <TextField
                name="store-zip"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                validation={{
                  required: true,
                }}
              />
            </div>
            <div className="flex flex-col w-full col-span-2">
              <Label name="distributor" errorClassName="text-red-500">
                Distributor
              </Label>
              <SelectField
                name="distributor"
                className="border-2 p-2 mt-2 w-full"
                errorClassName="border-2 p-2 mt-2 w-full border-red-500"
                defaultValue={form.distributor ? form.distributor : ''}
                validation={{
                  required: true,
                  matchesInitialValue: (value) => {
                    return value !== '' || 'Select an Option'
                  },
                }}
              >
                <option disabled value="">
                  Please select an option
                </option>
                {distributors.map((dist) => (
                  <option value={dist} key={`dist-${dist}`}>
                    {dist}
                  </option>
                ))}
              </SelectField>
            </div>

            <Submit className="col-span-2 my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Next
            </Submit>
          </Form>
        )
      }
    } else if (step === 3) {
      return (
        <PasswordCheck
          loading={loading || createUserLoading}
          onSubmit={onSubmit}
          submitText={'Sign Up'}
          onBack={() => setStep(2)}
          backButtonText={'Back'}
        />
      )
    }
  }

  if (!currentUser?.user) {
    return (
      <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-200 border-sm py-4 text-sm text-gray-700">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2
            className={
              'text-center text-2xl text-gray-900' +
              (step !== 1 ? ' hidden sm:block' : '')
            }
          >
            Create Account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl p-4">
          {error && <p>{error}</p>}
          {renderStep()}
          {step === 3 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-200 text-gray-500">
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
          )}
        </div>
      </div>
    )
  } else {
    return <Redirect to={redirectTo ? redirectTo : '/'} />
  }
}

export default SignupPage
