import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const PlayerMatchScoreForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.playerMatchScore?.id)
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
          name="score"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Score
        </Label>
        <NumberField
          name="score"
          defaultValue={props.playerMatchScore?.score}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="score" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        <TextField
          name="userId"
          defaultValue={props.playerMatchScore?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="matchId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Match id
        </Label>
        <NumberField
          name="matchId"
          defaultValue={props.playerMatchScore?.matchId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="matchId" className="rw-field-error" />

        <Label
          name="wonMatch"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Won match
        </Label>
        <CheckboxField
          name="wonMatch"
          defaultChecked={props.playerMatchScore?.wonMatch}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="wonMatch" className="rw-field-error" />

        <Label
          name="bye"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bye
        </Label>
        <CheckboxField
          name="bye"
          defaultChecked={props.playerMatchScore?.bye}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="bye" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.playerMatchScore?.active}
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

export default PlayerMatchScoreForm
