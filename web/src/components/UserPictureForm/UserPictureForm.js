import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const UserPictureForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.userPicture?.id)
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.userPicture?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="name" className="rw-field-error" />
        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url*
        </Label>
        <TextField
          name="url"
          defaultValue={props.userPicture?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="url" className="rw-field-error" />
        Preview:
        <Label
          name="smallUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Small url
        </Label>
        <TextField
          name="smallUrl"
          defaultValue={props.userPicture?.smallUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="smallUrl" className="rw-field-error" />
        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.userPicture?.active !== null || true}
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

export default UserPictureForm
