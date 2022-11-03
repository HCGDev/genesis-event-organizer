import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import InputMask from 'react-input-mask'
import { checkTournamentPermissions } from 'src/helpers/tournamentHelper'
import { ReactComponent as ClockIcon } from 'src/components/Icons/ClockIcon.svg'
import { VIEW_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import { logError } from 'src/helpers/errorLogger'

export const UPDATE_TIMER = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation updateTimer($input: TimerInput!) {
    updateTimer: updateTimer(input: $input) {
      ...ViewTournamentFields
    }
  }
`

const TournamentTimer = ({ tournament, setTournament }) => {
  const [timerInput, setTimerInput] = React.useState('060:00')
  const [timerStatus, setTimerStatus] = React.useState('PENDING')
  const [startingTimerInSeconds, setStartingTimerInSeconds] =
    React.useState(null)
  const [timerInSeconds, setTimerSeconds] = React.useState(null)
  const [confirmStop, setConfirmStop] = React.useState(false)
  const { currentUser, hasRole } = useAuth()
  const [updateTimer, { loading }] = useMutation(UPDATE_TIMER, {
    onCompleted: (data) => {
      setTournament(data.updateTimer)
    },
    onError: (error) => {
      logError({
        error,
        log: true,
        showToast: true,
      })
    },
  })

  React.useEffect(() => {
    if (
      timerInSeconds !== tournament.timerLeftInSeconds ||
      timerStatus !== tournament.timerStatus ||
      startingTimerInSeconds !== tournament.startingTimerInSeconds
    ) {
      let timeElapsed = 0

      if (tournament.timerStatus === 'INPROGRESS') {
        timeElapsed = Math.floor(
          (new Date() - new Date(tournament.timerLastUpdated)) / 1000
        )
      }

      if (timeElapsed > tournament.timerLeftInSeconds) {
        timeElapsed = tournament.timerLeftInSeconds
      }

      setTimerSeconds(tournament.timerLeftInSeconds - timeElapsed)
      setTimerStatus(tournament.timerStatus)
      setStartingTimerInSeconds(tournament.startingTimerInSeconds)
    }
  }, [tournament])

  React.useEffect(() => {
    let timerInterval = null

    if (timerStatus === 'INPROGRESS' && timerInterval === null) {
      timerInterval = setInterval(() => {
        setTimerSeconds((timerInSeconds) => timerInSeconds - 1)
      }, 1000)
    } else if (
      (timerStatus === 'PAUSED' || timerStatus === 'STOPPED') &&
      timerInterval
    ) {
      clearInterval(timerInterval)
    }

    return () => clearInterval(timerInterval)
  }, [timerStatus, timerInSeconds])

  const startTimer = (timerValue) => {
    const timerSplit = timerValue.split(':')
    const seconds = parseInt(timerSplit[1]) + parseInt(timerSplit[0]) * 60
    let localStartingTimerInSeconds = startingTimerInSeconds
    if (timerValue === timerInput) {
      localStartingTimerInSeconds = seconds
      setStartingTimerInSeconds(seconds)
    }

    setTimerSeconds(seconds)
    setTimerStatus('INPROGRESS')
    updateTimer({
      variables: {
        input: {
          tournamentId: tournament.id,
          startingTimerInSeconds: localStartingTimerInSeconds,
          timerLeftInSeconds: seconds,
          timerStatus: 'INPROGRESS',
        },
      },
    })
  }

  const pauseTimer = () => {
    setTimerStatus('PAUSED')
    updateTimer({
      variables: {
        input: {
          tournamentId: tournament.id,
          startingTimerInSeconds,
          timerLeftInSeconds: timerInSeconds,
          timerStatus: 'PAUSED',
        },
      },
    })
  }

  const endTimer = () => {
    setTimerStatus('STOPPED')
    setConfirmStop(false)
    updateTimer({
      variables: {
        input: {
          tournamentId: tournament.id,
          startingTimerInSeconds: timerInSeconds,
          timerLeftInSeconds: null,
          timerStatus: 'STOPPED',
        },
      },
    })
    setStartingTimerInSeconds(timerInSeconds)
    setTimerSeconds(null)
  }

  const formatTime = (timerInSeconds) => {
    if (timerInSeconds > 0) {
      let minutes = Math.floor(timerInSeconds / 60)
      let seconds = timerInSeconds - minutes * 60

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      return `${minutes}:${seconds}`
    }

    return `00:00`
  }

  const renderButtons = () => {
    if (checkTournamentPermissions({ hasRole, currentUser, tournament })) {
      let buttonClasses = (color) =>
        `flex w-full justify-center uppercase my-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-${color}-400 cursor-pointer hover:bg-${color}-500 focus:ring-${color}-600`

      if (timerInSeconds) {
        if (confirmStop) {
          return (
            <>
              <button
                className={buttonClasses('green')}
                onClick={() => setConfirmStop(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className={buttonClasses('red')}
                onClick={endTimer}
                disabled={loading}
              >
                Confirm Stop
              </button>
            </>
          )
        } else {
          return (
            <>
              {timerStatus === 'INPROGRESS' ? (
                <button
                  className={buttonClasses('yellow')}
                  onClick={pauseTimer}
                  disabled={loading}
                >
                  Pause
                </button>
              ) : (
                <button
                  className={buttonClasses('yellow')}
                  onClick={() => startTimer(formatTime(timerInSeconds))}
                  disabled={loading}
                >
                  Continue
                </button>
              )}

              {timerStatus !== 'STOPPED' && (
                <button
                  className={buttonClasses('red')}
                  onClick={() => setConfirmStop(true)}
                  disabled={loading}
                >
                  Stop
                </button>
              )}
            </>
          )
        }
      } else {
        return (
          <button
            className={buttonClasses('green')}
            onClick={() => startTimer(timerInput)}
            disabled={loading}
          >
            Start
          </button>
        )
      }
    }

    return null
  }

  let timerWidth = 100 - (timerInSeconds / startingTimerInSeconds) * 100

  return (
    <>
      {timerInSeconds ? (
        <div className="flex flex-col justify-center  items-center">
          <div className="text-xl flex border-gray-100 border-b-2 pb-1 mb-2 w-full justify-center items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            {formatTime(timerInSeconds)}
          </div>
          <div className="w-full rounded-sm border border-red-400">
            <div
              className="bg-red-300 h-4 rounded-l-sm border-red-300 border-l"
              style={{
                width: `${timerWidth > 100 ? 100 : timerWidth}%`,
              }}
            />
          </div>
          {renderButtons()}
        </div>
      ) : checkTournamentPermissions({ hasRole, currentUser, tournament }) ? (
        <div className="flex flex-col">
          <div className="border-gray-100 border-b-2 pb-1 flex flex-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <InputMask
              className="border-black border text-xl w-full px-1 rounded-l"
              mask={'?99:99'}
              formatChars={{ 9: '[0-9]', t: '[0-9-]', '?': '[0-9 ]' }}
              maskChar={null}
              value={timerInput}
              onChange={(e) => setTimerInput(e.target.value)}
            />
          </div>

          {renderButtons()}
        </div>
      ) : null}
    </>
  )
}

export default TournamentTimer
