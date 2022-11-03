import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  SelectField,
  TextField,
  FormError,
  Submit,
} from '@redwoodjs/forms/dist'
import { useMutation } from '@redwoodjs/web'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useForm, Controller } from '@redwoodjs/forms'
import toast from 'react-hot-toast'
import { getAddress } from 'src/helpers/formatAddress'

const distributors = [
  'Alliance Game Distributors',
  'Prince Wholesalers',
  'ACD Distribution',
  'GTS Distribution',
  'Publisher Services Inc',
  'Lion Rampant',
  'Hit Point Sales',
  'Universal Distribution',
  'Grosnor Distribution Inc',
  'Asmodee',
  'Luma Games',
  'Golden Distribution',
  'ABC Blackfire Distribution',
]

const UPDATE_STORE_MUTATION = gql`
  mutation UpdatStoreMutation($id: String!, $input: UpdateStoreInput!) {
    updateStore(id: $id, input: $input) {
      id
      phone
      city
      state
      country
      zip
    }
  }
`

const StoreSettingsTab = () => {
  const formMethods = useForm()
  const [street1, setStreet1] = React.useState('')
  const { currentUser, reauthenticate } = useAuth()
  const [editSettings, setEditSettings] = React.useState(false)
  let currentStore =
    currentUser?.stores.length > 0 ? currentUser?.stores[0] : {}

  const [updateStore, { loading, error: updateUserError }] = useMutation(
    UPDATE_STORE_MUTATION,
    {
      onCompleted: () => {
        toast.success('User updated')
        reauthenticate()
        setEditSettings(false)
      },
    }
  )

  const onSubmit = (data) => {
    updateStore({
      variables: {
        id: currentStore.id,
        input: {
          ...data,
          street1,
        },
      },
    })
  }

  const onSelectAddress = async (data) => {
    var addr = await getAddress(data.label)
    setStreet1(addr.formatted_address)
    formMethods.setValue('zip', addr.postal_code)
    formMethods.setValue('country', addr.country)
    formMethods.setValue('city', addr.locality)
    formMethods.setValue('state', addr.administrative_area_level_1)
    formMethods.setValue('lat', addr.lat)
    formMethods.setValue('lng', addr.lng)
  }

  React.useEffect(() => {
    let currentStore = currentUser.stores[0]
    setStreet1(currentStore?.street1 || '')
  }, [])

  return (
    <Form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      validation={{ mode: 'onBlur' }}
      formMethods={formMethods}
    >
      <div className="flex flex-col w-full col-span-1 sm:col-span-2">
        <Label errorClassName="text-red-500" name="name">
          Store Name
        </Label>
        <TextField
          name="name"
          placeholder="Store Name"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          defaultValue={currentStore?.name}
          disabled={!editSettings}
          validation={{
            required: true,
          }}
        />
      </div>
      <div className="flex flex-col w-full col-span-1 sm:col-span-2">
        <Label errorClassName="text-red-500" name="address">
          Store Address
        </Label>
        <GooglePlacesAutocomplete
          apiKey={process.env.GOOGLE_API_KEY}
          selectProps={{
            value: {
              label: street1,
              value: { description: street1, place_id: '' },
            },
            disabled: !editSettings,
            onChange: onSelectAddress,
          }}
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
        />
      </div>
      <div className="flex flex-col w-full">
        <Label name="email" errorClassName="text-red-500">
          Store Email
        </Label>
        <TextField
          name="email"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          defaultValue={currentStore?.email}
          disabled={!editSettings}
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
          Store Phone Number
        </Label>
        <TextField
          name="phone"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          defaultValue={currentStore?.phone}
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          disabled={!editSettings}
          validation={{
            required: true,
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <Label name="city" errorClassName="text-red-500">
          Store City
        </Label>
        <TextField
          name="city"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          disabled={!editSettings}
          defaultValue={currentStore?.city}
        />
      </div>
      <div className="flex flex-col w-full">
        <Label name="state" errorClassName="text-red-500">
          Store State/Province
        </Label>
        <TextField
          name="state"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          disabled={!editSettings}
          defaultValue={currentStore?.state}
        />
      </div>
      <div className="flex flex-col w-full">
        <Label name="country" errorClassName="text-red-500">
          Store Country
        </Label>
        <TextField
          name="country"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          disabled={!editSettings}
          defaultValue={currentStore?.country}
        />
      </div>
      <div className="flex flex-col w-full">
        <Label name="zip" errorClassName="text-red-500">
          Store Zip Code/Postal Code
        </Label>
        <TextField
          name="zip"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          disabled={!editSettings}
          defaultValue={currentStore?.zip}
        />
      </div>

      <div className="flex flex-col w-full col-span-1 sm:col-span-2">
        <Label name="distributor" errorClassName="text-red-500">
          Distributor
        </Label>
        <SelectField
          name="distributor"
          className="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md"
          errorClassName="border-2 p-2 mt-2 w-full shadow-sm border-gray-200 rounded-md border-red-500"
          disabled={!editSettings}
          defaultValue={currentStore?.distributor}
          validation={{
            required: true,
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
      {editSettings ? (
        <>
          <button
            className="my-2 sm:my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => setEditSettings(false)}
          >
            Cancel
          </button>
          <Submit
            disabled={loading}
            className="my-2 sm:my-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:green-indigo-500"
          >
            Submit
          </Submit>
        </>
      ) : (
        <button
          className="col-span-1 sm:col-span-2 my-8 w-1/2 mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => setEditSettings(true)}
        >
          Edit
        </button>
      )}
    </Form>
  )
}

export default StoreSettingsTab
