import { useAuth } from '@redwoodjs/auth'
import {
  FieldError,
  Form,
  TextField,
  Label,
  Submit,
  TextAreaField,
} from '@redwoodjs/forms/dist'
import FormError from '@redwoodjs/forms/dist/FormError'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { useForm } from '@redwoodjs/forms'
import Button from 'src/components/Button/Button'
import { logError } from 'src/helpers/errorLogger'

export const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const UserContactPage = () => {
  const { currentUser } = useAuth()
  const formMethods = useForm()

  const [createContact, { loading, error }] = useMutation(
    CREATE_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Your form has been submitted!')
        formMethods.reset()
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
      },
    }
  )

  const onSave = (input) => {
    createContact({ variables: { input } })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/Logo.png"
          alt="GenesisEventOrganizer"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Contact Us
        </h2>
      </div>
      <div className="mt-8 mx-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        {error && <p>{error}</p>}
        <Form onSubmit={onSave} error={error} formMethods={formMethods}>
          <FormError
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <Label
            name="name"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Nickname
          </Label>
          <TextField
            name="name"
            defaultValue={currentUser?.user?.nickname}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
          <FieldError name="name" className="rw-field-error" />

          <>
            <Label
              name="email"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Email
            </Label>
            <TextField
              name="email"
              defaultValue={currentUser?.user?.email}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="email" className="rw-field-error" />
          </>

          <Label
            name="text"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Message
          </Label>
          <TextAreaField
            name="text"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
          <FieldError name="text" className="rw-field-error" />

          <div className="rw-button-group">
            <Button
              type="submit"
              loading={loading}
              full={false}
              className="w-1/2"
            >
              <p className="text-center">Send</p>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default UserContactPage
