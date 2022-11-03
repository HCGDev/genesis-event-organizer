import { useAuth } from '@redwoodjs/auth'
import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { VIEW_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import { logError } from 'src/helpers/errorLogger'
import {
  checkTournamentPermissions,
  timeUntilTournament,
} from 'src/helpers/tournamentHelper'

import Button from '../Button/Button'

const START_TOURNAMENT_MUTATION = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation startTournament($id: Int!) {
    startTournament(id: $id) {
      ...ViewTournamentFields
    }
  }
`

const TournamentNotStarted = ({
  tournament,
  setTournament,
  setStarted,
  started,
}) => {
  const { currentUser, hasRole } = useAuth()
  const [startConfirmation, setStartConfirmation] = React.useState(false)
  const [timeUntilTourney, setTimeUntilTourney] = React.useState(
    timeUntilTournament(tournament.startDate)
  )

  const [startTournament, { loading }] = useMutation(
    START_TOURNAMENT_MUTATION,
    {
      onCompleted: (data) => {
        console.log(data)
        setTournament(data.startTournament)
        toast.success(
          'Tournament started! Please wait for this page to reload...'
        )
        setStarted(true)
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
    let interval = null

    if (tournament && !tournament.dateStarted) {
      setInterval(() => {
        setTimeUntilTourney({ ...timeUntilTournament(tournament.startDate) })
      }, 1000)
    } else if (tournament && interval && tournament.dateStarted) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [tournament])

  return (
    <div className="w-full h-full flex items-center">
      <div className="w-0 sm:w-1/4 h-1 bg-black hidden sm:flex" />
      {startConfirmation ? (
        <div className="w-full bg-white rounded-lg mx-4 my-12 py-8 shadow-md p-8 flex flex-col items-center">
          <h1 className="text-black text-2xl text-center">{tournament.name}</h1>
          <p className="text-gray-500 text-sm my-8">
            Are you sure you want to start this tournament?
          </p>
          <p className="text-gray-500 text-sm mb-8">
            You cannot undo this action.{' '}
          </p>
          <div className="flex justify-around w-full">
            <Button
              color="red"
              className="w-1/3"
              full={false}
              onClick={() => setStartConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-1/3"
              onClick={() =>
                startTournament({ variables: { id: tournament.id } })
              }
              full={false}
              loading={loading || started}
              disabled={started}
            >
              Start Tournament
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full sm:w-11/12 bg-green-700 rounded-lg mx-auto my-12 py-8">
          <h1 className="text-white sm:text-2xl uppercase text-center text-xl">
            Tournament Starting In
          </h1>
          <div className="border-2 border-white sm:p-4 flex mx-2 sm:mx-8 text-sm sm:text-xl text-gray-300 my-4">
            <div className="w-1/4 py-4 sm:p-4 flex flex-col justify-center items-center  border-r-2 border-white">
              <p>{timeUntilTourney.days}</p>
              <p>Days</p>
            </div>
            <div className="w-1/4 py-4 sm:p-4 flex flex-col justify-center items-center  border-r-2 border-white">
              <p>{timeUntilTourney.hours}</p>
              <p>Hours</p>
            </div>
            <div className="w-1/4 py-4 sm:p-4 flex flex-col justify-center items-center  border-r-2 border-white">
              <p>{timeUntilTourney.minutes}</p>
              <p>Minutes</p>
            </div>
            <div className="w-1/4 py-4 sm:p-4 flex flex-col justify-center items-center">
              <p>{timeUntilTourney.seconds}</p>
              <p>Seconds</p>
            </div>
          </div>
          {checkTournamentPermissions({ hasRole, currentUser, tournament }) &&
          tournament?.players?.length > 1 ? (
            <button
              className="flex items-center mx-auto py-2 px-8 text-center bg-white rounded-md border-2 cursor-pointer hover:bg-green-600 uppercase"
              onClick={() => setStartConfirmation(true)}
            >
              Start
            </button>
          ) : (
            checkTournamentPermissions({ hasRole, currentUser, tournament }) &&
            tournament?.players?.length < 2 && (
              <div className="text-center text-white my-4">
                Tournaments require a minimum of 2 players to Start
              </div>
            )
          )}

          {(hasRole('PLAYER') || !currentUser) && (
            <button
              className="flex items-center mx-auto py-2 px-8 text-center bg-white rounded-md border-2 cursor-pointer hover:bg-green-600 uppercase"
              onClick={() =>
                navigate(`/tournament/${tournament.tournamentUrl}/signup`)
              }
            >
              Sign Up Here
            </button>
          )}
        </div>
      )}

      <div className="w-0 sm:w-1/4 h-1 bg-black hidden sm:flex" />
    </div>
  )
}

export default TournamentNotStarted
