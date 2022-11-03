import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  Submit,
  TextField,
  useForm,
  Controller,
} from '@redwoodjs/forms'
import FormError from '@redwoodjs/forms/dist/FormError'
import NicknameCheckField from '../NicknameCheckField/NicknameCheckField'
import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UserPictureSelector from '../UserPictureSelector/UserPictureSelector'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstname
      lastname
      gender
      phone
      city
      state
      country
      zip
      createdAt
      updatedAt
      howHeard
      flags
      adminComments
      disabled
      disabledOn
      nickname
      userPictureId
      disabledBy
      email
      dob
      active
    }
  }
`

const UserSettingsTab = () => {
  const [editSettings, setEditSettings] = React.useState(false)
  const { currentUser, reauthenticate, hasRole } = useAuth()
  const [currentPicture, setCurrentPicture] = React.useState({})
  const [nicknameValid, setNicknameValid] = React.useState(null)
  const [nickname, setNickname] = React.useState()
  const formMethods = useForm()
  const [error, setError] = React.useState(null)
  const toggleEditSettings = (state) => {
    if (state === true) {
      setCurrentPicture(
        currentUser?.user?.photo ? { ...currentUser?.user?.photo } : {}
      )

      setNickname(currentUser?.user?.nickname)
    }

    setEditSettings(state)
  }

  const [updateUser, { loading, error: updateUserError }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('User updated')
        reauthenticate()
        setEditSettings(false)
      },
    }
  )

  const onSubmit = async (data) => {
    console.log(data)
    updateUser({
      variables: {
        id: currentUser?.user?.id,
        input: {
          ...data,
          imageId: currentPicture?.id,
          nickname,
        },
      },
    })
  }

  React.useEffect(() => {
    if (currentUser?.user?.dob) {
      formMethods.setValue('dob', new Date(currentUser?.user?.dob))
    }
  }, [currentUser])

  return (
    <>
      <div className="flex justify-center">
        {editSettings ? (
          <UserPictureSelector
            userPicture={currentPicture}
            selectImage={(img) => setCurrentPicture({ ...img })}
          />
        ) : (
          <ProfilePicture pic={currentUser?.user?.photo} />
        )}
      </div>
      <Form
        onSubmit={(data) => {
          ;(nicknameValid || nickname === currentUser?.user?.nickname) &&
            onSubmit(data)
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
      >
        <FormError error={error} className="col-span-1 sm:col-span-2" />
        <div className="flex flex-col col-span-1 sm:col-span-2">
          <span name="firstname">Nickname</span>
          {editSettings ? (
            <NicknameCheckField
              onChange={(data) => {
                setNickname(data.nickname)
              }}
              defaultValue={currentUser?.user?.nickname}
              value={nickname}
              setNicknameValid={setNicknameValid}
            />
          ) : (
            <input
              className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md flex focus:outline-none"
              disabled
              value={currentUser?.user?.nickname}
            />
          )}
        </div>
        <div className="flex flex-col w-full">
          <Label errorClassName="text-red-500" name="firstname">
            First Name
          </Label>
          <TextField
            name="firstname"
            placeholder="First name"
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.firstname}
            disabled={!editSettings}
            validation={{
              minLength: 1,
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          <Label errorClassName="text-red-500" name="lastname">
            Last Name
          </Label>
          <TextField
            name="lastname"
            placeholder="Last name"
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.lastname}
            disabled={!editSettings}
            validation={{
              minLength: 1,
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          <Label name="email" errorClassName="text-red-500">
            Email
          </Label>
          <TextField
            name="email"
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.email}
            disabled
            validation={{
              minLength: 1,
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
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.phone}
            disabled={!editSettings}
            validation={{
              minLength: 1,
            }}
          />
        </div>
        {hasRole('PLAYER') && (
          <>
            <div className="flex flex-col w-full">
              <Label name="gender" errorClassName="text-red-500">
                Gender
              </Label>
              <TextField
                name="gender"
                className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
                errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
                defaultValue={currentUser?.user?.gender}
                disabled={!editSettings}
                validation={{
                  minLength: 1,
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <Label name="dob" errorClassName="text-red-500">
                Date of Birth
              </Label>
              <Controller
                control={formMethods.control}
                name="dob"
                rules={{
                  minLength: 1,
                }}
                render={({ field: { name, value, onChange, ref, onBlur } }) => (
                  <DatePicker
                    onChange={onChange}
                    selected={value}
                    disabled={!editSettings}
                    name={name}
                    customInputRef={ref}
                    onBlur={onBlur}
                    maxDate={new Date()}
                    className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
                    errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                )}
              />
            </div>
          </>
        )}

        <div className="flex flex-col w-full">
          <Label name="city" errorClassName="text-red-500">
            City
          </Label>
          <TextField
            name="city"
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.city}
            disabled={!editSettings}
          />
        </div>
        <div className="flex flex-col w-full">
          <Label name="state" errorClassName="text-red-500">
            State/Province
          </Label>
          <TextField
            name="state"
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.state}
            disabled={!editSettings}
          />
        </div>
        <div className="flex flex-col w-full">
          <Label name="country" errorClassName="text-red-500">
            Country
          </Label>
          <TextField
            name="country"
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.country}
            disabled={!editSettings}
          />
        </div>
        <div className="flex flex-col w-full">
          <Label name="zip" errorClassName="text-red-500">
            Zip Code/Postal Code
          </Label>
          <TextField
            name="zip"
            className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
            errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
            defaultValue={currentUser?.user?.zip}
            disabled={!editSettings}
          />
        </div>

        {editSettings ? (
          <>
            <button
              className="my-2 sm:my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => toggleEditSettings(false)}
            >
              Cancel
            </button>
            <Submit
              disabled={
                !nicknameValid && nickname !== currentUser?.user?.nickname
              }
              className="my-2 sm:my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </Submit>
          </>
        ) : (
          <button
            className="col-span-1 sm:col-span-2 my-8 w-1/2 flex justify-center mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => toggleEditSettings(true)}
          >
            Edit
          </button>
        )}
      </Form>
    </>
  )
}

export default UserSettingsTab
