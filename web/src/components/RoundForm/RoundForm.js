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

const RoundForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.round?.id)
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
          name="tournamentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tournament id
        </Label>
        <NumberField
          name="tournamentId"
          defaultValue={props.round?.tournamentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tournamentId" className="rw-field-error" />

        <Label
          name="roundNumber"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Round number
        </Label>
        <NumberField
          name="roundNumber"
          defaultValue={props.round?.roundNumber}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="roundNumber" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.round?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="active" className="rw-field-error" />

        <Label
          name="startingTimerInSeconds"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Starting timer in seconds
        </Label>
        <NumberField
          name="startingTimerInSeconds"
          defaultValue={props.round?.startingTimerInSeconds}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="startingTimerInSeconds" className="rw-field-error" />

        <Label
          name="roundTimerLeftInSeconds"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Round timer left in seconds
        </Label>
        <NumberField
          name="roundTimerLeftInSeconds"
          defaultValue={props.round?.roundTimerLeftInSeconds}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="roundTimerLeftInSeconds" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RoundForm
