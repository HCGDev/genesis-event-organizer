import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import SingleBanner from '../SingleBanner/SingleBanner'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const BannerForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.banner?.id)
  }

  return (
    <div className="rw-form-wrapper">
      {props.banner && <SingleBanner banner={props.banner} />}
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="backgroundUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Background url
        </Label>
        <TextField
          name="backgroundUrl"
          defaultValue={props.banner?.backgroundUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="backgroundUrl" className="rw-field-error" />

        <Label
          name="mainText"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Main text
        </Label>
        <TextField
          name="mainText"
          defaultValue={props.banner?.mainText}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="mainText" className="rw-field-error" />

        <Label
          name="mainTextColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Main text color
        </Label>
        <TextField
          name="mainTextColor"
          defaultValue={props.banner?.mainTextColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="mainTextColor" className="rw-field-error" />

        <Label
          name="mainTextFontSize"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Main text font size
        </Label>
        <NumberField
          name="mainTextFontSize"
          defaultValue={props.banner?.mainTextFontSize}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="mainTextFontSize" className="rw-field-error" />

        <Label
          name="subText"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sub text
        </Label>
        <TextField
          name="subText"
          defaultValue={props.banner?.subText}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="subText" className="rw-field-error" />

        <Label
          name="subTextColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sub text color
        </Label>
        <TextField
          name="subTextColor"
          defaultValue={props.banner?.subTextColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="subTextColor" className="rw-field-error" />

        <Label
          name="subTextFontSize"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sub text font size
        </Label>
        <NumberField
          name="subTextFontSize"
          defaultValue={props.banner?.subTextFontSize}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="subTextFontSize" className="rw-field-error" />

        <Label
          name="textPlacement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Text placement
        </Label>
        <TextField
          name="textPlacement"
          defaultValue={props.banner?.textPlacement}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="textPlacement" className="rw-field-error" />

        <Label
          name="button1Link"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button1 link (Ensure Begins with /)
        </Label>
        <TextField
          name="button1Link"
          defaultValue={props.banner?.button1Link}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button1Link" className="rw-field-error" />

        <Label
          name="button1Text"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button1 text
        </Label>
        <TextField
          name="button1Text"
          defaultValue={props.banner?.button1Text}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button1Text" className="rw-field-error" />

        <Label
          name="button1BackgroundColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button1 background color
        </Label>
        <TextField
          name="button1BackgroundColor"
          defaultValue={props.banner?.button1BackgroundColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button1BackgroundColor" className="rw-field-error" />

        <Label
          name="button1TextColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button1 text color
        </Label>
        <TextField
          name="button1TextColor"
          defaultValue={props.banner?.button1TextColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button1TextColor" className="rw-field-error" />

        <Label
          name="button2Link"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button2 link (Ensure Begins with /)
        </Label>
        <TextField
          name="button2Link"
          defaultValue={props.banner?.button2Link}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button2Link" className="rw-field-error" />

        <Label
          name="button2Text"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button2 text
        </Label>
        <TextField
          name="button2Text"
          defaultValue={props.banner?.button2Text}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button2Text" className="rw-field-error" />

        <Label
          name="button2BackgroundColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button2 background color
        </Label>
        <TextField
          name="button2BackgroundColor"
          defaultValue={props.banner?.button2BackgroundColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button2BackgroundColor" className="rw-field-error" />

        <Label
          name="button2TextColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Button2 text color
        </Label>
        <TextField
          name="button2TextColor"
          defaultValue={props.banner?.button2TextColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="button2TextColor" className="rw-field-error" />

        <Label
          name="buttonsFontSize"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Buttons font size
        </Label>
        <NumberField
          name="buttonsFontSize"
          defaultValue={props.banner?.buttonsFontSize}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="buttonsFontSize" className="rw-field-error" />

        <Label
          name="buttonsVerticalPlacement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Buttons vertical placement
        </Label>
        <TextField
          name="buttonsVerticalPlacement"
          defaultValue={props.banner?.buttonsVerticalPlacement}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError
          name="buttonsVerticalPlacement"
          className="rw-field-error"
        />

        <Label
          name="buttonsHorizontalPlacement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Buttons horizontal placement
        </Label>
        <TextField
          name="buttonsHorizontalPlacement"
          defaultValue={props.banner?.buttonsHorizontalPlacement}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError
          name="buttonsHorizontalPlacement"
          className="rw-field-error"
        />

        <Label
          name="condition"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Condition
        </Label>
        <SelectField
          name="condition"
          defaultValue={props.banner?.condition}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        >
          {['ALL', 'GUEST', 'LOGGEDIN', 'EO', 'PLAYER'].map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </SelectField>
        <FieldError name="condition" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>
        <CheckboxField
          name="active"
          defaultChecked={props.banner?.active}
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

export default BannerForm
