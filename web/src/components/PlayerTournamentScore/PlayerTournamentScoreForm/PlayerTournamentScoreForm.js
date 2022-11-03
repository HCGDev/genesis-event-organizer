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

const PlayerTournamentScoreForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.playerTournamentScore?.id)
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
          name="wins"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Wins
        </Label>
        <NumberField
          name="wins"
          defaultValue={props.playerTournamentScore?.wins}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="wins" className="rw-field-error" />

        <Label
          name="losses"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Losses
        </Label>
        <NumberField
          name="losses"
          defaultValue={props.playerTournamentScore?.losses}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="losses" className="rw-field-error" />

        <Label
          name="score"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Score
        </Label>
        <TextField
          name="score"
          defaultValue={props.playerTournamentScore?.score}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          dataType="Float"
        />
        <FieldError name="score" className="rw-field-error" />

        <Label
          name="playerName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Player Name
        </Label>
        <TextField
          name="playerId"
          defaultValue={props.playerTournamentScore?.playerName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="playerName" className="rw-field-error" />

        <Label
          name="playerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Player id
        </Label>
        <TextField
          name="playerId"
          defaultValue={props.playerTournamentScore?.playerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="playerId" className="rw-field-error" />

        <Label
          name="tournamentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tournament id
        </Label>
        <NumberField
          name="tournamentId"
          defaultValue={props.playerTournamentScore?.tournamentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tournamentId" className="rw-field-error" />

        <Label
          name="draws"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Draws
        </Label>
        <NumberField
          name="draws"
          defaultValue={props.playerTournamentScore?.draws}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="draws" className="rw-field-error" />

        <Label
          name="byes"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Byes
        </Label>
        <NumberField
          name="byes"
          defaultValue={props.playerTournamentScore?.byes}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="byes" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.playerTournamentScore?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="active" className="rw-field-error" />

        <Label
          name="wonTournament"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Won tournament
        </Label>
        <CheckboxField
          name="wonTournament"
          defaultChecked={props.playerTournamentScore?.wonTournament}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="wonTournament" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PlayerTournamentScoreForm
