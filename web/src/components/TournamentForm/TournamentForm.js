import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  CheckboxField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { TOURNAMENT_TYPES } from 'src/constants/tournaments'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TournamentForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.tournament?.id)
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
          defaultValue={props.tournament?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="tournamentUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tournament url
        </Label>
        <TextField
          name="tournamentUrl"
          defaultValue={props.tournament?.tournamentUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tournamentUrl" className="rw-field-error" />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>
        <DatetimeLocalField
          name="startDate"
          defaultValue={formatDatetime(props.tournament?.startDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>
        <SelectField
          name="type"
          defaultValue={props.tournament?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          {TOURNAMENT_TYPES.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </SelectField>
        <FieldError name="type" className="rw-field-error" />

        <Label
          name="dateStarted"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date started
        </Label>
        <DatetimeLocalField
          name="dateStarted"
          defaultValue={formatDatetime(props.tournament?.dateStarted)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="dateStarted" className="rw-field-error" />

        <Label
          name="dateEnded"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date ended
        </Label>
        <DatetimeLocalField
          name="dateEnded"
          defaultValue={formatDatetime(props.tournament?.dateEnded)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="dateEnded" className="rw-field-error" />

        <Label
          name="maxPlayers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max players
        </Label>
        <NumberField
          name="maxPlayers"
          defaultValue={props.tournament?.maxPlayers}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="maxPlayers" className="rw-field-error" />

        <Label
          name="locationName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location name
        </Label>
        <TextField
          name="locationName"
          defaultValue={props.tournament?.locationName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="locationName" className="rw-field-error" />

        <Label
          name="infoUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Info url
        </Label>
        <TextField
          name="infoUrl"
          defaultValue={props.tournament?.infoUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="infoUrl" className="rw-field-error" />

        <Label
          name="street1"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Street1
        </Label>
        <TextField
          name="street1"
          defaultValue={props.tournament?.street1}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="street1" className="rw-field-error" />

        <Label
          name="street2"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Street2
        </Label>
        <TextField
          name="street2"
          defaultValue={props.tournament?.street2}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="street2" className="rw-field-error" />

        <Label
          name="city"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          City
        </Label>
        <TextField
          name="city"
          defaultValue={props.tournament?.city}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="city" className="rw-field-error" />

        <Label
          name="country"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Country
        </Label>
        <TextField
          name="country"
          defaultValue={props.tournament?.country}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="country" className="rw-field-error" />

        <Label
          name="state"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          State
        </Label>
        <TextField
          name="state"
          defaultValue={props.tournament?.state}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="state" className="rw-field-error" />

        <Label
          name="zip"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Zip
        </Label>
        <TextField
          name="zip"
          defaultValue={props.tournament?.zip}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="zip" className="rw-field-error" />

        <Label
          name="lat"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lat
        </Label>
        <TextField
          name="lat"
          defaultValue={props.tournament?.lat}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          dataType="Float"
        />
        <FieldError name="lat" className="rw-field-error" />

        <Label
          name="lng"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lng
        </Label>
        <TextField
          name="lng"
          defaultValue={props.tournament?.lng}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          dataType="Float"
        />
        <FieldError name="lng" className="rw-field-error" />

        <Label
          name="storeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Store id
        </Label>
        <TextField
          name="storeId"
          defaultValue={props.tournament?.storeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="storeId" className="rw-field-error" />

        <Label
          name="ownerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner id
        </Label>
        <TextField
          name="ownerId"
          defaultValue={props.tournament?.ownerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="ownerId" className="rw-field-error" />

        <Label
          name="desc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Desc
        </Label>
        <TextField
          name="desc"
          defaultValue={props.tournament?.desc}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="desc" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.tournament?.active}
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
          defaultValue={props.tournament?.startingTimerInSeconds}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="startingTimerInSeconds" className="rw-field-error" />

        <Label
          name="timerLeftInSeconds"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Timer left in seconds
        </Label>
        <NumberField
          name="timerLeftInSeconds"
          defaultValue={props.tournament?.timerLeftInSeconds}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="timerLeftInSeconds" className="rw-field-error" />

        <Label
          name="timerStatus"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Timer status
        </Label>
        <SelectField
          name="timerStatus"
          defaultValue={props.tournament?.timerStatus}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          {['PENDING', 'INPROGRESS', 'PAUSED', 'STOPPED'].map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </SelectField>
        <FieldError name="timerStatus" className="rw-field-error" />

        <Label
          name="timerLastUpdated"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Timer last updated
        </Label>
        <DatetimeLocalField
          name="timerLastUpdated"
          defaultValue={formatDatetime(props.tournament?.timerLastUpdated)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="timerLastUpdated" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TournamentForm
