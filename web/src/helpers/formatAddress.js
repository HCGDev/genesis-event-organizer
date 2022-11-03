//Given an address, format address into an object, get lat/lng
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

export const getAddress = async (address) => {
  var addressObj = {}

  await geocodeByAddress(address).then(async (results) => {
    results[0]?.address_components?.forEach((item) => {
      item?.types?.forEach((type) => {
        addressObj[type] = item.long_name
      })
    })

    addressObj['formatted_address'] = results[0].formatted_address

    await getLatLng(results[0]).then(
      ({ lat, lng }) =>
        (addressObj = {
          ...addressObj,
          lat,
          lng,
        })
    )
  })

  return addressObj
}

// Given a period
export const getHoursObject = (hours) => {
  const hoursObj = {}

  hours.weekday_text.forEach((day) => {
    const [dayOfWeek, hours] = day.split(': ')
    hoursObj[dayOfWeek] = hours
  })

  return hoursObj
}
