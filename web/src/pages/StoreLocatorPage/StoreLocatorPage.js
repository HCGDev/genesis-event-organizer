import {
  Form,
  FormError,
  TextAreaField,
  TextField,
  useForm,
  Label,
  FieldError,
} from '@redwoodjs/forms'
import { useLazyQuery } from '@apollo/client'
import GoogleMapWrapper from 'src/components/GoogleMapWrapper/GoogleMapWrapper'
import { useEffect, useRef } from 'react'
import { logError } from 'src/helpers/errorLogger'
import StoreLocatorItem from 'src/components/StoreLocatorItem/StoreLocatorItem'
import GoogleMapAutocompleteInput from 'src/components/GoogleMapAutocompleteInput/GoogleMapAutocompleteInput'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Button from 'src/components/Button/Button'
import { CREATE_CONTACT_MUTATION } from '../UserContactPage/UserContactPage'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useAuth } from '@redwoodjs/auth'
import axios from 'axios'

export const SEARCH_STORES = gql`
  query storeLocator($input: SearchStoresInput!) {
    storeLocator: storeLocator(input: $input) {
      totalCount
      more
      stores {
        id
        name
        lat
        lng
        tournaments {
          startDate
        }
        distance
        website
        street1
        street2
        city
        country
        state
        zip
      }
    }
  }
`
const StoreLocatorPage = () => {
  const formMethods = useForm()
  const contactUsFormMethods = useForm()
  const { currentUser } = useAuth()
  const mapRef = useRef(null)

  const takeAmount = 8

  const [startingLocation, setStartingLocation] = React.useState({
    lat: 0,
    lng: 0,
  })
  const [isGoogleInitialized, setIsGoogleInitialized] = React.useState(false)
  const [prevDistance, setPrevDistance] = React.useState(0)
  const [maxDistance, setMaxDistance] = React.useState(3000)
  const [take, setTake] = React.useState(takeAmount)
  const [storeList, setStoreList] = React.useState([])
  const [currentSearch, setCurrentSearch] = React.useState('')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [didSearchLocation, setDidSearchLocation] = React.useState(false)
  const [hasBeenCalled, setHasBeenCalled] = React.useState(false)
  const [fetchingMore, setFetchingMore] = React.useState(false)
  const [isLoadingCurrentLocation, setIsLoadingCurrentLocation] =
    React.useState(false)

  const [searchStores, { loading, data }] = useLazyQuery(SEARCH_STORES, {
    onCompleted: (res) => {
      setHasBeenCalled(true)
      setPrevDistance(maxDistance)
      if (fetchingMore) {
        setStoreList((prev) => [...prev, ...res.storeLocator.stores])
      } else {
        setStoreList(res.storeLocator.stores)
        if (!didSearchLocation) {
          // Find first store with a location
          const firstStore = res.storeLocator.stores.find(
            (store) => store.lat && store.lng
          )

          !!firstStore &&
            setStartingLocation({ lat: firstStore.lat, lng: firstStore.lng })
        }
      }
    },
    onError: (error) => {
      logError({
        error,
        log: true,
        showToast: true,
      })
    },
  })

  const [createContact, { loading: loadingContact, error }] = useMutation(
    CREATE_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Your form has been submitted!')
        formMethods.reset()
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
      },
    }
  )

  const onSave = (input) => {
    createContact({ variables: { input } })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      getUserSpecificLocation()
    } else {
      getUserGeneralLocation()
    }
  }, [])

  const onSubmit = (submitData) => {
    setHasBeenCalled(false)
    setTake(takeAmount)
    setStartingLocation({ lat: submitData.lat, lng: submitData.lng })
    setFetchingMore(false)
    setCurrentSearch(submitData.input)
    setSearchTerm(submitData.input)
    setDidSearchLocation(true)

    searchStores({
      variables: {
        input: {
          lat: submitData.lat,
          lng: submitData.lng,
          skip: 0,
          take: takeAmount,
          includeOnline: false,
          distance: maxDistance,
        },
      },
    })
  }

  const onSubmitQuery = () => {
    setHasBeenCalled(false)
    setTake(takeAmount)
    setFetchingMore(false)
    setCurrentSearch(searchTerm)
    setDidSearchLocation(false)

    searchStores({
      variables: {
        input: {
          searchTerm,
          skip: 0,
          take: takeAmount,
          includeOnline: true,
          distance: maxDistance,
        },
      },
    })
  }

  const loadMore = () => {
    setTake(take + takeAmount)
    setFetchingMore(true)

    searchStores({
      variables: {
        input: {
          lat: startingLocation.lat,
          lng: startingLocation.lng,
          skip: take,
          take: takeAmount,
          includeOnline: false,
          distance: maxDistance,
        },
      },
    })
  }

  const getUserGeneralLocation = () => {
    fetch('https://api.ipify.org/?format=json', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        console.log('IP: ', data.ip)
      })
      .catch((err) => console.log(err))

    fetch('https://ip.nf/me.json', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        const lat = data.ip.latitude
        const lng = data.ip.longitude

        setStartingLocation({ lat, lng })
        searchStores({
          variables: {
            input: {
              lat,
              lng,
              take: takeAmount,
              skip: 0,
              includeOnline: true,
              distance: maxDistance,
            },
          },
        })
      })
      .catch((err) => console.log(err))
  }

  const getUserSpecificLocation = (includeOnline = false) => {
    setIsLoadingCurrentLocation(true)
    if (navigator?.geolocation) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          setStartingLocation({ lat, lng })
          setCurrentSearch('Your Location')
          setSearchTerm('Your Location')
          setDidSearchLocation(true)
          setHasBeenCalled(false)
          setTake(takeAmount)
          searchStores({
            variables: {
              input: {
                lat,
                lng,
                take: takeAmount,
                skip: 0,
                includeOnline,
                distance: maxDistance,
              },
            },
          })

          setIsLoadingCurrentLocation(false)
        },
        () => {
          toast.error('There was an error in getting your coordinates')
          setIsLoadingCurrentLocation(false)
        }
      )
    } else {
      toast.error('Your browser does not support geolocation')
      setIsLoadingCurrentLocation(false)
    }
  }

  return (
    <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-100 border-sm py-4 text-sm text-gray-700 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl md:max-w-6xl px-4">
        <h2 className="sm:mt-8 mb-6 text-left text-xl text-gray-900">
          Find a store
        </h2>
        <div className="flex flex-wrap items-center">
          <p className="text-sm mb-1">Enter Address or Postal Code</p>
          <div className="flex ml-auto items-center">
            <p>Distance:</p>
            <select
              name="distance"
              onChange={(e) => setMaxDistance(parseInt(e.target.value))}
              className="ml-1 rw-input"
              defaultValue={maxDistance}
            >
              {[25, 50, 100, 250, 500, 1000, 2000, 3000].map((val) => (
                <option value={val} key={val}>
                  {val} KM
                </option>
              ))}
            </select>
          </div>
        </div>
        <Form
          onSubmit={onSubmitQuery}
          formMethods={formMethods}
          className="flex items-center mb-4 mt-1"
        >
          <GoogleMapAutocompleteInput
            onSelectAddress={onSubmit}
            onChangeInput={(text) => setSearchTerm(text)}
            latLngBias={startingLocation}
            inputText={currentSearch}
          />
          <div className="ml-2 h-auto">
            <Button
              full={false}
              disabled={
                currentSearch === searchTerm && maxDistance === prevDistance
              }
              type="submit"
              onClick={onSubmitQuery}
              loading={loading}
              my={0}
              px={6}
            >
              Search
            </Button>
          </div>
          <div className="ml-2 h-auto">
            <Button
              full={false}
              onClick={() => getUserSpecificLocation()}
              loading={loading || isLoadingCurrentLocation}
              my={0}
              px={2}
            >
              <svg
                width="18"
                height="19"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.90625 12C7.90625 10.0145 9.51445 8.40625 11.5 8.40625C13.4855 8.40625 15.0938 10.0145 15.0938 12C15.0938 13.9855 13.4855 15.5938 11.5 15.5938C9.51445 15.5938 7.90625 13.9855 7.90625 12ZM11.5 0.5C12.2951 0.5 12.9375 1.14373 12.9375 1.9375V3.49404C16.5492 4.10004 19.4018 6.95078 20.0037 10.5625H21.5625C22.3576 10.5625 23 11.2049 23 12C23 12.7951 22.3576 13.4375 21.5625 13.4375H20.0037C19.4018 17.0492 16.5492 19.9018 12.9375 20.5037V22.0625C12.9375 22.8576 12.2951 23.5 11.5 23.5C10.7049 23.5 10.0625 22.8576 10.0625 22.0625V20.5037C6.45078 19.9018 3.60004 17.0492 2.99404 13.4375H1.4375C0.64373 13.4375 0 12.7951 0 12C0 11.2049 0.64373 10.5625 1.4375 10.5625H2.99404C3.60004 6.95078 6.45078 4.10004 10.0625 3.49404V1.9375C10.0625 1.14373 10.7049 0.5 11.5 0.5ZM5.75 12C5.75 15.176 8.32402 17.75 11.5 17.75C14.676 17.75 17.25 15.176 17.25 12C17.25 8.82402 14.676 6.25 11.5 6.25C8.32402 6.25 5.75 8.82402 5.75 12Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </Form>
        <div className="w-full flex flex-col-reverse md:flex-row">
          <div className="w-full mt-2 md:mt-0 md:w-2/5 flex flex-col">
            <div className="flex flex-col h-auto mb-6">
              <h4 className="text-gray-700 font-bold mb-1">Search Results</h4>
              {hasBeenCalled &&
                (storeList.length > 0 ? (
                  <p>
                    Showing {storeList.length} of{' '}
                    {data?.storeLocator.totalCount}{' '}
                    {didSearchLocation ? (
                      <span>locations near </span>
                    ) : (
                      <span>stores that match</span>
                    )}
                    {currentSearch ? (
                      <span className="text-red-400 ml-1">{currentSearch}</span>
                    ) : (
                      <span className="text-red-400 ml-1">
                        your approximate location
                      </span>
                    )}
                  </p>
                ) : (
                  <p>
                    <span className="text-red-400 mr-1">No results found.</span>{' '}
                    Drop us a line with the store details to be included in our
                    database!{' '}
                  </p>
                ))}
            </div>
            <div
              className={
                'flex-flex-col max-h-[60vh] overflow-y-auto' +
                (storeList.length > 0 ? ' border-t-2 border-gray-400' : '')
              }
            >
              {storeList && storeList.length > 0 ? (
                storeList.map((store) => (
                  <StoreLocatorItem
                    store={store}
                    mapRef={mapRef}
                    key={store.id}
                    isGoogleInitialized={isGoogleInitialized}
                    showDistance={didSearchLocation}
                  />
                ))
              ) : hasBeenCalled ? (
                <Form
                  onSubmit={onSave}
                  error={error}
                  formMethods={contactUsFormMethods}
                  className="flex flex-col"
                >
                  <FormError
                    wrapperClassName="rw-form-error-wrapper"
                    titleClassName="rw-form-error-title"
                    listClassName="rw-form-error-list"
                  />

                  <Label
                    name="text-gray-700 mt-2"
                    className="text-gray-700"
                    errorClassName="rw-label rw-label-error"
                  >
                    Name
                  </Label>
                  <TextField
                    name="name"
                    defaultValue={currentUser?.user?.name}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                  />
                  <FieldError name="name" className="rw-field-error" />

                  <Label
                    name="email"
                    className="text-gray-700 mt-2"
                    errorClassName="text-gray-700 rw-label-error"
                  >
                    Email Address
                  </Label>
                  <TextField
                    name="email"
                    defaultValue={currentUser?.user?.email}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                  />
                  <FieldError name="email" className="rw-field-error" />
                  <Label
                    name="text"
                    className="text-gray-700 mt-2"
                    errorClassName="text-gray-700 rw-label-error"
                  >
                    Message
                  </Label>
                  <TextAreaField
                    name="text"
                    className="rw-input"
                    rows={6}
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                    defaultValue={
                      didSearchLocation
                        ? `I'm looking for a store near ${currentSearch}\n\nStore Name: \nStore Address: ${currentSearch}`
                        : `I'm looking for a store with the name: ${searchTerm}\n\nStoreName: ${searchTerm} \nStore Address: ${currentSearch}`
                    }
                  />
                  <FieldError name="text" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Button
                      type="submit"
                      loading={loading}
                      full={false}
                      className="w-1/2"
                    >
                      <p className="text-center">Send</p>
                    </Button>
                  </div>
                </Form>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <LoadingIcon size={12} />
                </div>
              )}
            </div>
            {data?.storeLocator?.more && (
              <Button onClick={loadMore} px={4} py={4} disabled={loading}>
                Load More
              </Button>
            )}
          </div>
          <div className="w-full overflow-hidden max-h-52 md:max-h-max md:pl-8 md:w-3/5">
            <GoogleMapWrapper
              mapRef={mapRef}
              onMapLoad={() => setIsGoogleInitialized(true)}
              center={startingLocation}
              stores={storeList}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLocatorPage
