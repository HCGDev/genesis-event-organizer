import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { useLazyQuery } from '@apollo/client'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { Switch } from '@headlessui/react'

import 'react-datepicker/dist/react-datepicker.css'
import { getAddress } from 'src/helpers/formatAddress'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import { ReactComponent as LocationIcon } from 'src/components/Icons/LocationIcon.svg'
import { ReactComponent as CalendarIcon } from 'src/components/Icons/CalendarIcon.svg'
import { ReactComponent as SearchIcon } from 'src/components/Icons/SearchIcon.svg'
import { ReactComponent as PlayersIcon } from 'src/components/Icons/PlayersIcon.svg'
import { ReactComponent as TrophyIcon } from 'src/components/Icons/TrophyIcon.svg'
import Button from 'src/components/Button/Button'

import { logError } from 'src/helpers/errorLogger'
import { format } from 'date-fns'
import { TOURNAMENT_TYPES } from 'src/constants/tournaments'
import { BookOpenIcon, HomeIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const SEARCH_TOURNAMENTS = gql`
  query searchTournaments($input: SearchTournamentInput!) {
    searchTournaments: searchTournaments(input: $input) {
      totalCount
      more
      tournaments {
        id
        name
        tournamentUrl
        startDate
        maxPlayers
        playerCount
        type
        distance
        store {
          name
        }
        winners {
          id
          playerName
          player {
            nickname
          }
        }
        players {
          active
          id
        }
        lat
        lng
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

export const ACTIVE_STORES = gql`
  query activeStores($searchTerm: String) {
    activeStores(searchTerm: $searchTerm) {
      name
    }
  }
`

const TournamentSearchPage = () => {
  const { pathname, search } = useLocation()
  const [mobileMenu, showMobileMenu] = React.useState(true)
  const takeAmount = 12
  const [take, setTake] = React.useState(takeAmount)
  const [storeList, setStoreList] = React.useState([])

  const [filters, setFilters] = React.useState({
    lat: null,
    lng: null,
    country: null,
    city: null,
    name: null,
    location: null,
    dateStart: format(new Date(), 'yyyy-MM-dd'),
    dateEnd: null,
    type: 'ALL',
    store: null,
    openSpotsOnly: false,
    finishedTournaments: false,
  })

  const [newFilters, setNewFilters] = React.useState({
    ...filters,
    openSpotsOnly: false,
  })

  const [loadingLocation, setLoadingLocation] = React.useState(false)
  const [data, setData] = React.useState([])

  const [searchTournaments, { called, loading }] = useLazyQuery(
    SEARCH_TOURNAMENTS,
    {
      onCompleted: (res) => {
        setData(res.searchTournaments)
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

  const [searchStores, { loading: loadingStores }] = useLazyQuery(
    ACTIVE_STORES,
    {
      onCompleted: ({ activeStores }) => {
        setStoreList(activeStores ? activeStores.map(({ name }) => name) : [])
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

  React.useEffect(() => {
    breakdownSearch()
    getUserGeneralLocation()
  }, [])

  const breakdownSearch = () => {
    if (search) {
      let query = {}
      let brokeSearch = search.slice(1, search.length)
      brokeSearch = brokeSearch.split('&')
      brokeSearch.forEach((param) => {
        let brokeParam = param.split('=')
        if (
          brokeParam.length === 2 &&
          brokeParam[0] in filters &&
          brokeParam[1] !== ''
        ) {
          let val = brokeParam[1]
          if (brokeParam[0] === 'lat' || brokeParam[0] === 'lng')
            val = parseFloat(val)

          if (brokeParam[0] === 'location') val = val.replaceAll('%20', ' ')

          if (brokeParam[0] === 'type') val = val.replaceAll('%20', ' ')

          if (brokeParam[0] === 'store') val = val.replaceAll('%20', ' ')

          if (brokeParam[0] === 'openSpotsOnly') val = val === 'true'

          if (brokeParam[0] === 'finishedTournaments') val = val === 'true'

          if (brokeParam[0] === 'dateStart' || brokeParam[0] === 'dateEnded') {
            val = format(new Date(val), 'yyyy-MM-dd')
          }

          query[brokeParam[0]] = val
        }
      })

      let newQuery = {
        ...filters,
        ...query,
      }

      setFilters({
        ...newQuery,
      })

      setNewFilters({
        ...newQuery,
      })

      searchTournaments({
        variables: { input: { ...newQuery, take, skip: 0 } },
      })
    } else {
      searchTournaments({
        variables: { input: { ...filters, take, skip: 0 } },
      })
    }
  }

  const getUserGeneralLocation = () => {
    fetch('https://ip.nf/me.json', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true)
      navigator.geolocation.getCurrentPosition((pos) => {
        setNewFilters({
          ...newFilters,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          location: 'Current Location',
          country: null,
        })
        setLoadingLocation(false)
      })
    }
  }

  const searchTourneys = () => {
    setTake(takeAmount)

    searchTournaments({
      variables: {
        input: {
          ...newFilters,
          dateStart: newFilters.dateStart
            ? format(new Date(newFilters.dateStart), 'yyyy-MM-dd')
            : null,
          dateEnd: newFilters.dateEnd
            ? format(new Date(newFilters.dateEnd), 'yyyy-MM-dd')
            : null,
          take: takeAmount,
          skip: 0,
        },
      },
    })
    setFilters({
      ...newFilters,
    })
    showMobileMenu(false)
    stringifyParams({
      ...newFilters,
      dateStart: newFilters.dateStart
        ? format(new Date(newFilters.dateStart), 'yyyy-MM-dd')
        : null,
      dateEnd: newFilters.dateEnd
        ? format(new Date(newFilters.dateEnd), 'yyyy-MM-dd')
        : null,
    })
  }

  const convertToKM = (km) => {
    if (km <= 1) {
      return 'Less than a km away'
    } else {
      return `${Math.floor(km)} km away`
    }
  }

  const onSelectAddress = async (data) => {
    var addr = await getAddress(data.label)
    setNewFilters({
      ...filters,
      location: addr.formatted_address,
      country: addr.country,
      lat: addr.lat,
      lng: addr.lng,
    })
  }

  const addFilter = (key, value) => {
    setNewFilters({
      ...newFilters,
      [key]: value,
    })
  }

  const stringifyParams = (queryFilter) => {
    let queryString = ''
    let queryArray = []
    Object.keys(queryFilter).forEach((queryKey) => {
      if (queryFilter[queryKey] && (queryKey !== 'lat' || queryKey !== 'lng')) {
        queryArray.push([queryKey, queryFilter[queryKey]])
      }
    })

    if (queryArray.length > 0) {
      queryString = '?'
      queryArray.forEach((query, index) => {
        queryString += `${index > 0 ? `&` : ``}${query[0]}=${query[1]}`
      })
    }

    navigate(`${pathname}${queryString}`)
  }

  return (
    <div className="min-h-screen container mx-auto flex flex-col bg-gray-100 border-sm text-sm text-gray-700 p-4 sm:p-12">
      <div>
        <div className="flex mb-3 text-xl">
          <h1>Tournament Search</h1>
          <button
            className="ml-auto my-auto rounded-full w-6 h-6 bg-gray-400 cursor-pointer sm:hidden flex justify-center items-center"
            onClick={() => showMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-4 ${
            mobileMenu ? '' : ' hidden sm:grid'
          }`}
        >
          <div className="cols-span-1">
            <div className="relative flex flex-col border border-gray-400 rounded-md w-full bg-white">
              <p className="bg-white text-sm text-gray-400 ml-2 rounded-md mt-2">
                Tournament Name
              </p>
              <input
                onChange={(e) => addFilter('name', e.target.value)}
                value={newFilters.name}
                className="focus:outline-none px-2 h-8  rounded-md "
              />
            </div>
          </div>
          <div className="cols-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">
            <div className="cols-span-1">
              <div className="relative flex flex-col border border-gray-400 rounded-md w-full bg-white">
                <p className="bg-white text-sm text-gray-400 ml-2 rounded-md mt-2">
                  From
                </p>
                <div className="flex">
                  <div className="mx-2">
                    <CalendarIcon />
                  </div>

                  <DatePicker
                    onChange={(val) => {
                      addFilter(
                        'dateStart',
                        format(new Date(val), 'yyyy/MM/dd')
                      )
                    }}
                    selected={
                      newFilters.dateStart
                        ? new Date(newFilters.dateStart)
                        : null
                    }
                    name={'dateStart'}
                    className="focus:outline-none px-2 h-8 w-11/12"
                    dropdownMode="select"
                  />
                </div>
              </div>
            </div>

            <div className="cols-span-1">
              <div className="relative flex flex-col border border-gray-400 rounded-md w-full bg-white">
                <p className="bg-white text-sm text-gray-400 ml-2 rounded-md mt-2">
                  To
                </p>
                <div className="flex">
                  <div className="mx-2">
                    <CalendarIcon />
                  </div>

                  <DatePicker
                    onChange={(val) =>
                      addFilter('dateEnd', format(new Date(val), 'yyyy/MM/dd'))
                    }
                    selected={
                      newFilters.dateEnd ? new Date(newFilters.dateEnd) : null
                    }
                    name={'dateEnd'}
                    className="focus:outline-none px-2 h-8 w-11/12"
                    dropdownMode="select"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="cols-span-1">
            <div className="relative flex flex-col border border-gray-400 rounded-md w-full bg-white">
              <p className="bg-white text-sm text-gray-400 ml-2 rounded-md mt-2">
                Tournament Store
              </p>
              <Select
                styles={{
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  control: (provided) => ({
                    ...provided,
                    border: 'none',
                    minHeight: '30px',
                    height: '30px',
                  }),
                }}
                isLoading={loadingStores}
                value={{ value: newFilters.store, label: newFilters.store }}
                onInputChange={(val) => {
                  if (val.length > 1)
                    searchStores({ variables: { searchTerm: val } })
                }}
                onChange={(val) => addFilter('store', val?.value)}
                isClearable
                options={storeList.map((name) => ({
                  value: name,
                  label: name,
                }))}
                className="focus:outline-none px-2 h-8  rounded-md "
              />
            </div>
          </div>
          <div className="cols-span-1">
            <div className="relative flex flex-col border border-gray-400 rounded-md w-full bg-white">
              <p className="bg-white text-sm text-gray-400 ml-2 rounded-md mt-2">
                Tournament Type
              </p>
              <Select
                styles={{
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  control: (provided) => ({
                    ...provided,
                    border: 'none',
                    minHeight: '30px',
                    height: '30px',
                  }),
                }}
                value={{ value: newFilters.type, label: newFilters.type }}
                onChange={(val) => addFilter('type', val.value)}
                options={['ALL', ...TOURNAMENT_TYPES].map((type) => ({
                  label: type,
                  value: type,
                }))}
                className="focus:outline-none px-2 h-8  rounded-md "
              />
            </div>
          </div>
          <div className="cols-span-1">
            <div className="relative flex flex-col border border-gray-400 rounded-md w-full bg-white">
              <p className="bg-white text-sm text-gray-400 ml-2 rounded-md mt-2">
                Tournament Location
              </p>
              <div className="flex">
                <button
                  className="mx-2"
                  onClick={getUserLocation}
                  disabled={loadingLocation}
                >
                  <LocationIcon />
                </button>
                <GooglePlacesAutocomplete
                  apiKey={process.env.GOOGLE_API_KEY}
                  selectProps={{
                    value: {
                      label: newFilters.location,
                      value: { description: newFilters.location, place_id: '' },
                    },
                    styles: {
                      container: (provided) => ({
                        border: 'none',
                      }),
                      control: (provide) => ({
                        border: 'none',
                      }),
                      dropdownIndicator: (provided) => ({
                        borderLeft: 'none',
                        display: 'none',
                      }),
                      indicatorSeparator: (provided) => ({
                        display: 'none',
                      }),
                      menu: (provided) => ({
                        ...provided,
                        marginLeft: '-41px',
                      }),
                    },
                    onChange: onSelectAddress,
                    className: 'w-full',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="cols-span-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="flex flex-col justify-around">
              <Switch.Group as="div" className="flex justify-between">
                <span className="flex flex-col items-center">
                  <Switch.Label
                    as="span"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Spots Available
                  </Switch.Label>
                </span>
                <Switch
                  checked={newFilters.openSpotsOnly}
                  onChange={(e) =>
                    setNewFilters({
                      ...newFilters,
                      openSpotsOnly: e,
                    })
                  }
                  className={classNames(
                    newFilters.openSpotsOnly ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      newFilters.openSpotsOnly
                        ? 'translate-x-5'
                        : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  />
                </Switch>
              </Switch.Group>
              <Switch.Group as="div" className="flex justify-between">
                <span className="flex flex-col items-center">
                  <Switch.Label
                    as="span"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Finished Tournaments
                  </Switch.Label>
                </span>
                <Switch
                  checked={newFilters.finishedTournaments}
                  onChange={(e) =>
                    setNewFilters({
                      ...newFilters,
                      finishedTournaments: e,
                    })
                  }
                  className={classNames(
                    newFilters.finishedTournaments
                      ? 'bg-indigo-600'
                      : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      newFilters.finishedTournaments
                        ? 'translate-x-5'
                        : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
            <Button
              disabled={
                called && JSON.stringify(filters) === JSON.stringify(newFilters)
              }
              loading={loading || loadingLocation}
              onClick={searchTourneys}
              className="my-2 sm:m-4 px-4 py-2"
            >
              Find it now
            </Button>
          </div>
        </div>
      </div>
      <div>
        {called ? (
          loading ? (
            <div className="w-full py-16 flex justify-center items-center">
              <LoadingIcon size={'44px'} />
            </div>
          ) : (
            <div className="flex flex-col p-4">
              <p className="mb-4">
                {data.totalCount
                  ? `${data.totalCount} search result${
                      data.totalCount > 1 ? 's' : ''
                    } found`
                  : '0 search results found'}{' '}
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-12">
                {data?.tournaments?.map((tournament) => (
                  <Link
                    to={routes.viewTournament({
                      url: tournament.tournamentUrl,
                      tab: 'rounds',
                      tabOptions: 1,
                    })}
                    key={tournament.id}
                    className="bg-white rounded-md drop-shadow-lg flex flex-col p-4 cursor-pointer border hover:border-blue-400 col-span-1 text-center w-full h-full"
                  >
                    <div className="cursor-pointer uppercase text-sm text-black w-auto font-semibold mb-2">
                      {tournament.name}
                    </div>
                    <div className="flex flex-col text-gray-400 text-sm h-full">
                      <p className="flex items-center">
                        <div className="w-6 h-6 flex font-bold">
                          <CalendarIcon />
                        </div>{' '}
                        <span className="ml-1 text-left">
                          {format(new Date(tournament.startDate), 'PP')}
                        </span>
                      </p>
                      {tournament?.store?.name && (
                        <div className="flex items-center">
                          <div className="w-6 h-6 flex font-bold">
                            <HomeIcon />
                          </div>{' '}
                          <span className="ml-1 text-left">
                            {tournament?.store?.name}
                          </span>
                        </div>
                      )}
                      {tournament.type && (
                        <div className="flex items-center">
                          <div className="w-6 h-6 flex font-bold">
                            <BookOpenIcon />
                          </div>{' '}
                          <span className="ml-1 text-left">
                            {tournament?.type}
                          </span>
                        </div>
                      )}
                      <p className="flex items-center">
                        <div className="w-6 h-6 flex font-bold">
                          <PlayersIcon />
                        </div>{' '}
                        <span className="ml-1 text-left">
                          {
                            tournament.players?.filter(
                              (player) => player.active
                            ).length
                          }
                          /{tournament.maxPlayers} Players Registered
                        </span>
                      </p>
                      {tournament.street1 && (
                        <p className="flex items-center">
                          <div className="w-6 h-6 flex font-bold">
                            <LocationIcon />
                          </div>{' '}
                          <span className="ml-1 text-left">
                            {tournament.city}, {tournament.state},{' '}
                            {tournament.country}
                          </span>
                        </p>
                      )}
                      {tournament.winners.length > 0 && (
                        <p className="flex items-center font-bold mb-2">
                          <div className="w-6 h-6 flex justify-center items-center">
                            <TrophyIcon />
                          </div>{' '}
                          <span className="ml-1">
                            {tournament.winners.map((winner, index) => (
                              <span
                                key={`winner-${tournament.id}-${winner.id}`}
                              >
                                {index > 0 && ', '}
                                {winner.player?.nickname || winner.playerName}
                              </span>
                            ))}
                          </span>
                        </p>
                      )}

                      {filters.lat &&
                        filters.lng &&
                        (tournament.lat && tournament.lng ? (
                          <div className="bg-green-500 text-white rounded-md mx-auto p-2 mt-auto text-sm">
                            {Math.floor(tournament.distance)} KM Away
                          </div>
                        ) : (
                          <div className="bg-yellow-700 text-white rounded-md mx-auto p-2 mt-auto text-sm">
                            No location
                          </div>
                        ))}
                    </div>
                  </Link>
                ))}
              </div>
              {data?.more && (
                <Button
                  full={false}
                  className={'w-full sm:w-1/4 mx-auto mt-4'}
                  loading={loading}
                  onClick={() => {
                    searchTournaments({
                      variables: {
                        input: {
                          ...filters,
                          dateStart: filters.dateStart
                            ? format(new Date(filters.dateStart), 'yyyy-MM-dd')
                            : null,
                          dateEnd: filters.dateEnd
                            ? format(new Date(filters.dateEnd), 'yyyy-MM-dd')
                            : null,
                          take: take + takeAmount,
                          skip: 0,
                        },
                      },
                    })
                    setTake(take + takeAmount)
                  }}
                >
                  Load More
                </Button>
              )}
            </div>
          )
        ) : (
          <div className="w-full h-60 flex flex-col justify-center items-center">
            <div className="mt-8">
              <SearchIcon />
            </div>
            <p className="mt-8 text-2xl">Ready to find a tournament?</p>
            <p className="mt-8 text-2xl">Search above!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TournamentSearchPage
