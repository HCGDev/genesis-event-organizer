import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name="nickname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nickname *
        </Label>
        <TextField
          name="nickname"
          defaultValue={props.user?.nickname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="nickname" className="rw-field-error" />

        <Label
          name="firstname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Firstname *
        </Label>
        <TextField
          name="firstname"
          defaultValue={props.user?.firstname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="firstname" className="rw-field-error" />

        <Label
          name="lastname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lastname *
        </Label>
        <TextField
          name="lastname"
          defaultValue={props.user?.lastname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="lastname" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email *
        </Label>
        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="email" className="rw-field-error" />

        <Label
          name="dob"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Dob
        </Label>
        <TextField
          name="dob"
          defaultValue={props.user?.dob}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="dob" className="rw-field-error" />

        <Label
          name="gender"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gender
        </Label>
        <TextField
          name="gender"
          defaultValue={props.user?.gender}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="gender" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone *
        </Label>
        <TextField
          name="phone"
          defaultValue={props.user?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="city"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          City
        </Label>
        <TextField
          name="city"
          defaultValue={props.user?.city}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="city" className="rw-field-error" />

        <Label
          name="state"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          State
        </Label>
        <TextField
          name="state"
          defaultValue={props.user?.state}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="state" className="rw-field-error" />

        <Label
          name="country"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Country
        </Label>
        <TextField
          name="country"
          defaultValue={props.user?.country}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="country" className="rw-field-error" />

        <Label
          name="zip"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Zip
        </Label>
        <TextField
          name="zip"
          defaultValue={props.user?.zip}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="zip" className="rw-field-error" />

        <Label
          name="howHeard"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          How heard
        </Label>
        <TextField
          name="howHeard"
          defaultValue={props.user?.howHeard}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="howHeard" className="rw-field-error" />

        <Label
          name="flags"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Flags *
        </Label>
        <NumberField
          name="flags"
          defaultValue={props.user?.flags}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="flags" className="rw-field-error" />

        <Label
          name="adminComments"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Admin comments
        </Label>
        <TextField
          name="adminComments"
          defaultValue={props.user?.adminComments}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="adminComments" className="rw-field-error" />

        <Label
          name="disabled"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Disabled
        </Label>
        <CheckboxField
          name="disabled"
          defaultChecked={props.user?.disabled}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="disabled" className="rw-field-error" />

        <Label
          name="disabledOn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Disabled on
        </Label>
        <DatetimeLocalField
          name="disabledOn"
          defaultValue={formatDatetime(props.user?.disabledOn)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="disabledOn" className="rw-field-error" />

        <Label
          name="userPictureId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User picture id
        </Label>
        <NumberField
          name="userPictureId"
          defaultValue={props.user?.userPictureId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="userPictureId" className="rw-field-error" />

        <Label
          name="disabledBy"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Disabled by
        </Label>
        <TextField
          name="disabledBy"
          defaultValue={props.user?.disabledBy}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="disabledBy" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.user?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="active" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
