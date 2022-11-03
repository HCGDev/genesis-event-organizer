import { useAuth } from '@redwoodjs/auth'
import { navigate, Redirect } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { checkTournamentPermissions } from 'src/helpers/tournamentHelper'
import MatchDetails from '../MatchDetails/MatchDetails'
import TournamentNotStarted from '../TournamentNotStarted/TournamentNotStarted'
import Button from '../Button/Button'
import ReactToPrint from 'react-to-print'
import PrintRound from '../PrintRound/PrintRound'
import { logError } from 'src/helpers/errorLogger'
import { VIEW_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import AddMatchForm from '../AddMatchForm/AddMatchForm'
import EndTournamentModal from '../EndTournamentModal/EndTournamentModal'
import CutOffModal from '../CutOffModal/CutOffModal'

export const ADVANCE_ROUND = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation advanceRound($id: Int!, $roundNumber: Int!) {
    advanceRound: advanceRound(id: $id, roundNumber: $roundNumber) {
      ...ViewTournamentFields
    }
  }
`

const CREATE_TOURNAMENT_MATCH = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation createTournamentMatch($input: CreateTournamentMatchInput!) {
    createTournamentMatch(input: $input) {
      ...ViewTournamentFields
    }
  }
`

const TournamentRoundsTab = ({ tournament, roundNumber, setTournament }) => {
  const componentRef = React.useRef()
  const [started, setStarted] = React.useState(false)
  const [isEndTournamentModalOpen, setIsEndTournamentModalOpen] =
    React.useState(false)
  const [isCutoffRoundModalOpen, setIsCutoffRoundModalOpen] =
    React.useState(false)
  const { hasRole, currentUser } = useAuth()

  React.useEffect(() => {
    if (!started && tournament.dateStarted) {
      setStarted(true)
    }
  }, [tournament, started])

  const [advanceRound, { loading: loadingAdvanceRound }] = useMutation(
    ADVANCE_ROUND,
    {
      onCompleted: (data) => {
        setTournament(data.advanceRound)
        const newRound =
          data.advanceRound?.round[data.advanceRound?.round?.length - 1]
            ?.roundNumber
        toast.success(`Tournament has advanced to round ${newRound}`)
        navigate(`/tournament/${tournament?.tournamentUrl}/rounds/${newRound}`)
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

  const [createTournamentMatch, { loading: loadingCreateMatch }] = useMutation(
    CREATE_TOURNAMENT_MATCH,
    {
      onCompleted: (data) => {
        setTournament(data.createTournamentMatch)
        toast.success(`Match added!`)
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

  const grabRound = () => {
    let round = {}

    tournament?.round?.map((rnd) => {
      if (rnd.roundNumber === roundNumber) {
        round = { ...rnd }
      }
    })

    return round
  }

  const renderRound = () => {
    let round = grabRound()
    let matches = []

    if (round?.matches) {
      ;[...round?.matches]
        .sort((a, b) => b.players.length - a.players.length)
        .map((match, index) => {
          matches.push(
            <MatchDetails
              match={match}
              index={index}
              tournament={tournament}
              setTournament={setTournament}
              key={`round-${round}-match-${match.id}`}
            />
          )
        })
    }

    return matches
  }

  const checkScoresSubmitted = () => {
    let round = grabRound()
    let scoresSubmitted = true

    round.matches?.forEach((match) => {
      match.players.forEach((player) => {
        if (player.score !== 0 && !player.score >= 1 && !player.bye) {
          scoresSubmitted = false
        }
      })
    })

    return scoresSubmitted
  }

  if ((!roundNumber || roundNumber === '') && tournament?.round?.length > 0) {
    return (
      <Redirect
        to={`/tournament/${tournament?.tournamentUrl}/rounds/${
          tournament?.round[tournament.round.length - 1]?.roundNumber
        }`}
      />
    )
  }

  if (!tournament.dateStarted && !started) {
    return (
      <TournamentNotStarted
        tournament={tournament}
        setTournament={setTournament}
        setStarted={setStarted}
        started={started}
      />
    )
  }

  return (
    <>
      <div className="w-full">
        <div className="w-full flex border-b border-gray-500">
          <div className="flex sm:w-10/12 overflow-x-auto">
            {tournament?.round?.map((round) => {
              return (
                <div
                  key={round.id}
                  onClick={() =>
                    navigate(
                      `/tournament/${tournament?.tournamentUrl}/rounds/${round.roundNumber}`
                    )
                  }
                  className={
                    'py-4 px-8 border-gray-100 cursor-pointer hover:bg-gray-100 sm:hover:bg-blue-500 text-gray-900 text-sm w-36 text-center sm:w-auto flex items-center' +
                    (round.roundNumber === roundNumber ? ' bg-gray-200' : '')
                  }
                >
                  Round {round.roundNumber}{' '}
                  {round.isTieBreakerRound ? '- Tiebreaker' : ''}
                </div>
              )
            })}
          </div>
          {checkTournamentPermissions({ hasRole, tournament, currentUser }) && (
            <div className="flex sm:w-2/12 ml-2">
              <ReactToPrint
                trigger={() => (
                  <Button className="uppercase" my={'2'}>
                    Print Round Sheet
                  </Button>
                )}
                content={() => componentRef.current}
              />
              <PrintRound
                round={grabRound()}
                tournament={tournament}
                ref={componentRef}
              />
            </div>
          )}
        </div>

        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-12 gap-y-4 my-4 w-max sm:w-full">
            <div className="text-gray-500 text-xs bg-gray-200 col-span-12 grid grid-cols-12 px-2">
              <div className="py-4 col-span-1 text-center uppercase">
                Table #
              </div>
              <div className="py-4 col-span-11 text-center uppercase">
                Result
              </div>
            </div>
            {renderRound()}
            <AddMatchForm
              onSubmit={(data) => {
                createTournamentMatch({
                  variables: {
                    input: {
                      tournamentId: tournament.id,
                      roundId: grabRound().id,
                      proposedMatch: data.filter((player) => !!player),
                    },
                  },
                })
              }}
              tournament={tournament}
              loading={loadingCreateMatch}
            />
          </div>
        </div>

        {tournament.round[tournament.round.length - 1]?.roundNumber ===
          grabRound()?.roundNumber &&
          checkScoresSubmitted() &&
          checkTournamentPermissions({ hasRole, currentUser, tournament }) &&
          !tournament.dateEnded && (
            <div className="flex w-full gap-4">
              <Button
                className="uppercase col-span-1"
                color="red"
                full
                disabled={!checkScoresSubmitted()}
                loading={loadingAdvanceRound}
                onClick={() => setIsEndTournamentModalOpen(true)}
              >
                End Tournament
              </Button>
              {tournament.players.length > 4 && (
                <Button
                  className="uppercase col-span-1"
                  color="yellow"
                  full
                  disabled={!checkScoresSubmitted()}
                  loading={loadingAdvanceRound}
                  onClick={() => {
                    setIsCutoffRoundModalOpen(true)
                  }}
                >
                  Cut Off Round
                </Button>
              )}
              {!tournament.round[tournament.round.length - 1]
                ?.isTieBreakerRound && (
                <Button
                  className="uppercase col-span-1"
                  full
                  disabled={!checkScoresSubmitted()}
                  loading={loadingAdvanceRound}
                  onClick={() => {
                    advanceRound({
                      variables: {
                        id: tournament.id,
                        roundNumber: grabRound().roundNumber + 1,
                      },
                    })
                  }}
                >
                  Advance to next round
                </Button>
              )}
            </div>
          )}
      </div>
      <EndTournamentModal
        isOpen={isEndTournamentModalOpen}
        tournament={tournament}
        onClose={() => setIsEndTournamentModalOpen(false)}
        setTournament={setTournament}
      />
      <CutOffModal
        isOpen={isCutoffRoundModalOpen}
        tournament={tournament}
        onClose={() => setIsCutoffRoundModalOpen(false)}
        setTournament={setTournament}
      />
    </>
  )
}

export default TournamentRoundsTab
