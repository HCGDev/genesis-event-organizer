import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const MatchForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.match?.id)
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
          name="roundId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Round id
        </Label>
        <NumberField
          name="roundId"
          defaultValue={props.match?.roundId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="roundId" className="rw-field-error" />

        <Label
          name="tournamentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tournament id
        </Label>
        <NumberField
          name="tournamentId"
          defaultValue={props.match?.tournamentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tournamentId" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.match?.active}
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

export default MatchForm
