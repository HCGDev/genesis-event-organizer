import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const StoreForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.store?.id)
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
          defaultValue={props.store?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="ownerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner id
        </Label>
        <TextField
          name="ownerId"
          defaultValue={props.store?.ownerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="ownerId" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={props.store?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="email" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone
        </Label>
        <TextField
          name="phone"
          defaultValue={props.store?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="lat"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lat
        </Label>
        <NumberField
          name="lat"
          defaultValue={props.store?.lat}
          className="rw-input"
          step="0.00000001"
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
        <NumberField
          name="lng"
          defaultValue={props.store?.lng}
          step="0.00000001"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          dataType="Float"
        />
        <FieldError name="lng" className="rw-field-error" />

        <Label
          name="street1"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Street1
        </Label>
        <TextField
          name="street1"
          defaultValue={props.store?.street1}
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
          defaultValue={props.store?.street2}
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
          defaultValue={props.store?.city}
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
          defaultValue={props.store?.country}
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
          defaultValue={props.store?.state}
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
          defaultValue={props.store?.zip}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="zip" className="rw-field-error" />

        <Label
          name="placeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Place ID (Google)
        </Label>
        <TextField
          name="placeId"
          defaultValue={props.store?.placeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="placeId" className="rw-field-error" />

        <Label
          name="distributor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Distributor
        </Label>
        <TextField
          name="distributor"
          defaultValue={props.store?.distributor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="distributor" className="rw-field-error" />

        <Label
          name="hidden"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hidden
        </Label>
        <CheckboxField
          name="hidden"
          defaultChecked={props.store?.hidden || false}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="hidden" className="rw-field-error" />

        <Label
          name="approved"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Approved
        </Label>
        <CheckboxField
          name="approved"
          defaultChecked={props.store?.approved}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="approved" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default StoreForm
