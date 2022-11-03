import { MetaTags, useQuery } from '@redwoodjs/web'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import GoogleMapWrapper from 'src/components/GoogleMapWrapper/GoogleMapWrapper'
import {
  ClockIcon,
  DesktopComputerIcon,
  LocationMarkerIcon,
  PhoneIcon,
  SpeakerphoneIcon,
  UserIcon,
} from '@heroicons/react/solid'
import { useEffect } from 'react'
import { Link, navigate, routes } from '@redwoodjs/router'
import { format } from 'date-fns'
import { CalendarIcon } from '@heroicons/react/outline'
import { getHoursObject } from 'src/helpers/formatAddress'
import Button from 'src/components/Button/Button'

const FIND_ACTIVE_STORE_BY_ID = gql`
  query activeStore($id: String!) {
    activeStore(id: $id) {
      id
      name
      phone
      email
      street1
      street2
      city
      state
      zip
      country
      lat
      lng
      tournaments {
        name
        active
        startDate
        maxPlayers
        tournamentUrl
        playerList {
          active
          id
        }
      }
    }
  }
`

const ViewStorePage = ({ storeId = '' }) => {
  const [googleStoreDetails, setGoogleStoreDetails] = React.useState({})
  const [formattedHours, setFormattedHours] = React.useState({})
  const [isGoogleInitialized, setIsGoogleInitialized] = React.useState(false)
  const newRef = React.useRef(null)

  const today = format(new Date(), 'EEEE')

  const {
    data: storeData,
    loading,
    error,
  } = useQuery(FIND_ACTIVE_STORE_BY_ID, {
    variables: { id: storeId },
  })

  useEffect(() => {
    const loadData = async () => {
      const service = await new window.google.maps.places.PlacesService(
        newRef.current
      )
      service.findPlaceFromQuery(
        {
          query: `${storeData?.activeStore?.name}, ${storeData?.activeStore?.street1}, ${storeData?.activeStore?.city}, ${storeData?.activeStore?.state}, ${storeData?.activeStore?.country}`,
          fields: ['name', 'place_id'],
        },
        (results, status) => {
          service.getDetails(
            {
              placeId: results[0].place_id,
              fields: [
                'name',
                'geometry',
                'formatted_address',
                'formatted_phone_number',
                'photos',
                'opening_hours',
                'place_id',
                'website',
              ],
            },
            (place, status) => {
              setGoogleStoreDetails({ ...place })
              if (place.opening_hours) {
                const hoursObj = getHoursObject(place.opening_hours)
                setFormattedHours(hoursObj)
              }
            }
          )
        }
      )
    }

    if (isGoogleInitialized && newRef.current && window.google && storeData) {
      loadData()
    }
  }, [isGoogleInitialized, newRef, window.google, storeData])

  if (loading) {
    return <LoadingIcon size={'44px'} />
  }

  const tournamentsAfterToday = storeData?.activeStore?.tournaments
    .filter(
      (tournament) =>
        new Date(tournament.startDate) > new Date() && tournament.active
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

  return (
    <>
      <MetaTags
        title={`View Store ${storeData?.activeStore?.name}`}
        description="View Genesis Store Page"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <div ref={newRef} />
      <div className="min-h-screen container mx-auto flex flex-col bg-gray-100 border-sm py-4 text-sm text-gray-700 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl md:max-w-6xl px-4">
          <h2 className="sm:mt-8 mb-6 text-left text-xl text-gray-900">
            {storeData?.activeStore?.name}
          </h2>
          <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full mt-2 md:mt-0 md:w-2/5">
              <div className="flex w-full items-center">
                <LocationMarkerIcon className="w-4 h-4 mr-2" />
                <p className="font-bold ">{storeData?.activeStore?.name}</p>
              </div>
              <div className="flex flex-col my-4">
                <p className="">
                  {storeData?.activeStore?.street1}{' '}
                  {storeData?.activeStore?.street2}
                </p>
                <p className="">
                  {storeData?.activeStore?.city}
                  {storeData?.activeStore?.city &&
                    storeData?.activeStore?.state &&
                    ','}{' '}
                  {storeData?.activeStore?.state} {storeData?.activeStore?.zip}
                </p>
              </div>
              {googleStoreDetails?.opening_hours?.weekday_text?.length > 0 && (
                <div className="flex flex-col mb-4 w-full">
                  <div className="flex">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <p className="font-bold ml-2">Store Hours:</p>
                  </div>
                  {Object.keys(formattedHours).map((day, index) => (
                    <div key={index} className="flex pr-4">
                      <p className={day === today ? 'text-red-500' : ''}>
                        {day}
                      </p>
                      <p
                        className={
                          day === today ? 'text-red-500 ml-auto' : 'ml-auto'
                        }
                      >
                        {formattedHours[day]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {googleStoreDetails.formatted_phone_number && (
                <div className="flex w-full items-center mb-4">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  <p className="font-bold mr-1">Phone Number: </p>{' '}
                  <a
                    href={`tel:${googleStoreDetails.formatted_phone_number}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {googleStoreDetails.formatted_phone_number}
                  </a>
                </div>
              )}

              {googleStoreDetails.website && (
                <div className="flex w-full items-center">
                  <DesktopComputerIcon className="w-4 h-4 mr-2" />
                  <p className="font-bold mr-1">Website: </p>{' '}
                  <a
                    href={googleStoreDetails.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {googleStoreDetails.website}
                  </a>
                </div>
              )}
            </div>
            <div className="w-full  md:w-3/5">
              <div id="map"></div>
              {storeData?.activeStore.lat && storeData?.activeStore.lng ? (
                <>
                  <GoogleMapWrapper
                    onMapLoad={(mapRef) => {
                      setIsGoogleInitialized(true)
                    }}
                    height={'400px'}
                    center={
                      storeData?.activeStore
                        ? {
                            lat: storeData?.activeStore?.lat,
                            lng: storeData?.activeStore?.lng,
                          }
                        : { lat: 0, lng: 0 }
                    }
                    stores={
                      storeData?.activeStore ? [storeData?.activeStore] : []
                    }
                  />
                </>
              ) : (
                <div className="flex justify-center items-center">
                  Store Does Not Have a Mappable Location
                </div>
              )}
            </div>
          </div>
          {tournamentsAfterToday?.length > 0 && (
            <div className="flex flex-col">
              <div className="flex w-full items-center mb-4 mt-4 md:mt-1">
                <SpeakerphoneIcon className="w-4 h-4 mr-2" />
                <p className="font-bold">Upcoming Tournaments: </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {tournamentsAfterToday?.slice(0, 4).map((tournament) => {
                  return (
                    <Link
                      to={routes.viewTournament({
                        url: tournament.tournamentUrl,
                        tab: 'rounds',
                        tabOptions: 1,
                      })}
                      key={`tournament-${tournament.id}`}
                      className="flex flex-col p-4 bg-white hover:bg-gray-200 cursor-pointer rounded-md drop-shadow-md"
                    >
                      <p className="text-gray-700 mb-1 font-bold text-center">
                        {tournament.name}
                      </p>
                      <div className="flex mb-1">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <p className="text-gray-700">
                          {format(new Date(tournament.startDate), 'PP')}
                        </p>
                      </div>
                      <div className="flex mb-1">
                        <UserIcon className="w-4 h-4 mr-2" />
                        <p className="text-gray-700">
                          {tournament.maxPlayers - tournament.playerList.length}{' '}
                          Spots Available
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
              {tournamentsAfterToday.length > 4 && (
                <div className="ml-auto">
                  <Button
                    onClick={() =>
                      navigate(
                        `/search?dateStart=${format(
                          new Date(),
                          'yyyy-MM-dd'
                        )}&type=ALL&store=${storeData?.activeStore?.name
                          ?.split(' ')
                          .join('%20')}`
                      )
                    }
                  >
                    SEE MORE
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ViewStorePage
