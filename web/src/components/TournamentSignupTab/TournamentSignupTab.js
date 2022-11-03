import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { VIEW_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import { logError } from 'src/helpers/errorLogger'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import Button from '../Button/Button'
import { FacebookIcon } from '../Icons/Facebook'
import { TwitterIcon } from '../Icons/Twitter'

export const REGISTER_TOURNAMENT = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation registerForTournament($id: Int!) {
    registerForTournament: registerForTournament(id: $id) {
      ...ViewTournamentFields
    }
  }
`

export const LEAVE_TOURNAMENT = gql`
  mutation leaveTournament($id: Int!) {
    leaveTournament: leaveTournament(id: $id)
  }
`

const TournamentSignupTab = ({ tournament, setTournament }) => {
  const { currentUser, hasRole } = useAuth()
  const [registerForTournament, { loading }] = useMutation(
    REGISTER_TOURNAMENT,
    {
      onCompleted: (data) => {
        setTournament(data.registerForTournament)
        toast.success('Successfully Registered for Tournament')
        navigate(`/tournament/${tournament.tournamentUrl}/leaderboard`)
      },
      onError: (error) => {
        logError({
          error,
          log: true,
          showToast: true,
        })
      },
      refetchQueries: [
        {
          query: TOURNAMENT_BY_URL,
          variables: { url: tournament.tournamentUrl },
        },
      ],
    }
  )

  const [
    leaveTournament,
    { loading: loadingLeaveTournament, error: errorLeaveTournament },
  ] = useMutation(LEAVE_TOURNAMENT, {
    onCompleted: () => {
      toast.success('Successfully Left Tournament')
      navigate(`/tournament/${tournament.tournamentUrl}/rounds`)
    },
    onError: (error) => {
      logError({
        error,
        log: true,
        showToast: true,
      })
    },
    refetchQueries: [
      {
        query: TOURNAMENT_BY_URL,
        variables: { url: tournament.tournamentUrl },
      },
    ],
  })

  const checkIfSignupActive = (tourney) => {
    // Tournament is active
    let tournamentIsActive = tourney.active

    // Tournament not full
    let tournamentNotFull = tourney?.players?.length < tourney?.maxPlayers

    let tournamentNotEnded = !tourney.dateEnded

    if (tournamentNotFull && tournamentIsActive && tournamentNotEnded) {
      return true
    }

    return false
  }

  const checkIfCanSignup = (tourney, currUser) => {
    // Can sign up if:

    //Not previously in tournament
    let notJoinedBefore = !hasBeenInTournament(tourney, currUser)

    // Not in Tournament
    let notInTournament = !isInTournament(tourney, currUser)

    // User is a player (and signed in)
    let userEligible = currentUser?.user.id && hasRole('PLAYER')

    //Check if admin only
    let publicRegistration = tourney.publicRegistration

    if (
      notJoinedBefore &&
      notInTournament &&
      userEligible &&
      checkIfSignupActive(tourney) &&
      publicRegistration
    ) {
      return true
    }

    return false
  }

  const returnInfoText = (tourney, currUser) => {
    // Tournament has been cancelled
    if (!tourney.active) return 'Event has been cancelled'
    // Tournament has Ended
    if (tourney.dateEnded) return 'Event has already ended'
    // Not a player
    if (!hasRole('PLAYER')) return 'Only players may register for this event'
    // Wants to rejoin
    if (hasBeenInTournament(tourney, currUser))
      return 'You cannot rejoin a tournament'
    // Already registered
    if (isInTournament(tourney, currUser))
      return 'You have already registered for this event'
    // Tournament full
    if (tourney?.players?.length >= tourney?.maxPlayers) return 'Event is full'
    if (!tourney.publicRegistration)
      return 'Only admins may register players for this tournament. Please speak to the organizer'

    return 'You have not signed up for this event'
  }

  //Check if applicable to register
  const isInTournament = (tourney, currUser) => {
    var playerList = {}
    tourney.players?.forEach(({ player }) => {
      if (player?.id) playerList[player.id] = { ...player }
    })

    if (
      playerList &&
      currUser?.user?.id in playerList &&
      playerList[currUser?.user?.id].active
    ) {
      return true
    }

    return false
  }

  const hasBeenInTournament = (tourney, currUser) => {
    var playerList = {}
    tourney.players?.forEach(({ player }) => {
      if (player?.id) playerList[player.id] = { ...player }
    })

    if (
      playerList &&
      currUser?.user?.id in playerList &&
      !playerList[currUser?.user?.id].active
    ) {
      return true
    }

    return false
  }

  const generateUrl = (tourney, stringify = true) => {
    let url =
      process.env.FRONTEND_URL +
      '/tournament/' +
      tourney.tournamentUrl +
      '/signup'

    if (stringify) {
      url = url.replaceAll(':', '%3A')
      url = url.replaceAll('/', '%2F')
    }

    return url
  }

  const generateUrlText = (tourney) => {
    let text = `Sign Up for the ${tourney.name} genesis tournament here!`
    return text.replaceAll(' ', '%20')
  }

  const copyText = (tourney) => {
    let text = generateUrl(tourney, false)

    navigator.clipboard.writeText(text).then(
      function () {
        toast.success('Successfully copied tournament url')
      },
      function () {
        toast.error(
          'There was an error in copying the tournament url, please try again'
        )
      }
    )
  }

  const confirmLeaveTournament = () => {
    if (confirm('Are you sure you would like to leave this tournament')) {
      leaveTournament({ variables: { id: tournament.id } })
    }
  }

  return (
    <div className="w-full py-10 flex flex-col items-center justify-center">
      <h2 className="text-center text-2xl uppercase text-gray-900 mb-6 font-normal">
        User Sign Ups
      </h2>
      <p className="text-gray-500 mb-6">
        Sign Ups for this event are{' '}
        <strong>{checkIfSignupActive(tournament) ? 'open' : 'closed'}</strong>.
      </p>
      <p className="text-gray-500">{returnInfoText(tournament, currentUser)}</p>
      {isInTournament(tournament, currentUser) && (
        <Button
          onClick={() => confirmLeaveTournament()}
          loading={loadingLeaveTournament}
          full={false}
          className="w-1/2 sm:w-1/4 mb-0"
          color="red"
        >
          <p className="text-center">Leave Tournament</p>
        </Button>
      )}
      {checkIfSignupActive(tournament) && !currentUser && (
        <div className="grid gap-x-2 grid-cols-2">
          <Button
            onClick={() =>
              navigate(
                routes.login({
                  redirectTo: `/tournament/${tournament.tournamentUrl}/signup`,
                })
              )
            }
            loading={loading}
            full={true}
            className="mb-0"
          >
            Login
          </Button>
          <Button
            onClick={() =>
              navigate(
                routes.signup({
                  redirectTo: `/tournament/${tournament.tournamentUrl}/signup`,
                })
              )
            }
            loading={loading}
            full={true}
            className="mb-0"
          >
            <p className="text-center v">Create an account here</p>
          </Button>
        </div>
      )}
      {checkIfCanSignup(tournament, currentUser) && (
        <Button
          onClick={() =>
            registerForTournament({ variables: { id: tournament.id } })
          }
          loading={loading}
          disabled={loading}
          full={false}
          className="w-1/2 sm:w-1/4"
        >
          <p className="text-center v">Sign up</p>
        </Button>
      )}
      <div className="mt-10" id="share">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Share via</span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${generateUrl(
                tournament
              )}`}
              target="_blank"
              className="h-10 w-full inline-flex justify-center py-2 px-10 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              rel="noreferrer"
            >
              <span className="sr-only">Sign in with Facebook</span>
              <FacebookIcon />
            </a>
          </div>

          <div>
            <a
              href={`https://twitter.com/intent/tweet?url=${generateUrl(
                tournament
              )}&text=${generateUrlText(
                tournament
              )}&hashtags=Genesis%2CTournament`}
              target="_blank"
              className="h-10 w-full inline-flex justify-center py-2 px-10 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              rel="noreferrer"
            >
              <span className="sr-only">Sign in with Twitter</span>
              <TwitterIcon />
            </a>
          </div>

          <div>
            <button
              onClick={async () => copyText(tournament)}
              className="h-10 w-full inline-flex justify-center py-2 px-10 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Copy Link</span>
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentSignupTab
