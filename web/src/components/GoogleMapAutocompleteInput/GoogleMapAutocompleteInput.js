import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { getAddress } from 'src/helpers/formatAddress'

const GoogleMapAutocompleteInput = ({
  inputText = '',
  onSelectAddress = () => {},
  onChangeInput = () => {},
  placeholderText = 'Enter Address or Postal Code',
  latLngBias = { lat: 0, lng: 0 },
}) => {
  const [address, setAddress] = React.useState('')

  React.useEffect(() => {
    if (inputText !== address) {
      setAddress(inputText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText])

  const onSelect = async (data) => {
    setAddress(data)
    const addressObj = await getAddress(data)
    onSelectAddress({ ...addressObj, input: data })
  }

  const searchOptions = {
    location:
      window.google.maps &&
      new window.google.maps.LatLng(latLngBias.lat, latLngBias.lng),
    radius: 2000,
    types: ['address'],
  }

  return (
    <PlacesAutocomplete
      value={address}
      searchOptions={searchOptions}
      onChange={(e) => {
        setAddress(e)
        onChangeInput(e)
      }}
      onSelect={(e) => onSelect(e)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative flex w-full">
          <input
            {...getInputProps({
              placeholder: placeholderText,
              className:
                'w-full shadow-sm border-gray-300 border rounded-md p-2',
            })}
          />
          <div
            className={
              'w-full rounded-md absolute z-10 bg-white' +
              (!loading && suggestions.length === 0 ? ' hidden' : '')
            }
            style={{ marginTop: '38px', padding: '4px' }}
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span className="text-gray-700 p-2">
                      {suggestion.description}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

export default GoogleMapAutocompleteInput
