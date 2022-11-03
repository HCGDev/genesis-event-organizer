import {
  ClockIcon,
  DesktopComputerIcon,
  LocationMarkerIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/solid'
import { Link, routes } from '@redwoodjs/router'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { getHoursObject } from 'src/helpers/formatAddress'

const StoreLocatorItem = ({
  store,
  showDistance = true,
  isGoogleInitialized = false,
}) => {
  const [googleStoreDetails, setGoogleStoreDetails] = React.useState({})
  const newRef = React.useRef(null)
  const [todayHours, setTodayHours] = React.useState(null)

  useEffect(() => {
    const loadData = async () => {
      const service = await new window.google.maps.places.PlacesService(
        newRef.current
      )
      service.findPlaceFromQuery(
        {
          query: `${store.name}, ${store.street1}, ${store.city}, ${store.state}, ${store.country}`,
          fields: ['name', 'place_id'],
        },
        (results, status) => {
          if (results && results.length > 0) {
            service.getDetails(
              {
                placeId: results[0].place_id,
                fields: [
                  'name',
                  'geometry',
                  'formatted_address',
                  'photos',
                  'opening_hours',
                  'place_id',
                  'website',
                ],
              },
              (place, status) => {
                setGoogleStoreDetails({ ...place })
                if (place && place.opening_hours) {
                  const hoursObj = getHoursObject(place.opening_hours)
                  const today = format(new Date(), 'EEEE')
                  if (hoursObj[today]) {
                    setTodayHours(hoursObj[today])
                  }
                }
              }
            )
          }
        }
      )
    }

    if (isGoogleInitialized && newRef.current && window.google) {
      loadData()
    }
  }, [isGoogleInitialized, newRef, window.google])

  const tournamentsAfterToday = store.tournaments
    .filter(
      (tournament) =>
        new Date(tournament.startDate) > new Date() && tournament.active
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

  return (
    <Link
      to={routes.viewStore({
        storeId: store.id,
      })}
      className="flex flex-col border-b-2 border-gray-400 py-3 text-gray-700 hover:bg-gray-300 cursor-pointer px-2"
    >
      <div id="google-map" ref={newRef} />
      <div className="flex w-full items-center">
        <LocationMarkerIcon className="w-4 h-4 mr-2" />
        <p className="font-bold ">{store.name}</p>
        {showDistance && store.distance >= 0 && (
          <p className="ml-auto ">{Math.floor(store.distance)} km away</p>
        )}
      </div>
      <div className="flex flex-col my-4">
        <p className="">
          {store.street1} {store.street2}
        </p>
        <p className="">
          {store.city} {store.city && store.state && ','} {store.state}{' '}
          {store.zip}
        </p>
      </div>
      {/*todayHours && (
        <div className="flex">
          <ClockIcon className="w-4 h-4 mr-2" />
          <p className="font-bold">Store Hours:</p>{' '}
          <p className="ml-1"> {todayHours}</p>
        </div>
      )*/}

      {tournamentsAfterToday.length > 0 && (
        <div className="flex mt-4">
          <SpeakerphoneIcon className="w-4 h-4 mr-2" />
          <p className="font-bold ">Next Tournament Date: </p>{' '}
          <p className="ml-1">
            {' '}
            {format(new Date(tournamentsAfterToday[0].startDate), 'PP')} at{' '}
            {format(new Date(tournamentsAfterToday[0].startDate), 'p')}
          </p>
        </div>
      )}
      {/*googleStoreDetails.website && (
        <div className="flex mt-4">
          <DesktopComputerIcon className="w-4 h-4 mr-2" />
          <p className="font-bold">Website: </p>{' '}
          <a className="ml-1" href={googleStoreDetails.website}>
            {' '}
            {googleStoreDetails.website}
          </a>
        </div>
      )*/}
    </Link>
  )
}

export default StoreLocatorItem
