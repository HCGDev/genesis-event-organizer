import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { useAuth } from '@redwoodjs/auth'
import { Form, NumberField } from '@redwoodjs/forms/dist'
import { useMutation } from '@redwoodjs/web'
import { useForm } from '@redwoodjs/forms'
import toast from 'react-hot-toast'
import { VIEW_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import { logError } from 'src/helpers/errorLogger'
import { checkTournamentPermissions } from 'src/helpers/tournamentHelper'
import Button from '../Button/Button'
import EditMatchDetails from '../EditMatchDetails/EditMatchDetails'
import PlayerProfileItem from '../PlayerProfileItem/PlayerProfileItem'

const SUBMIT_MATCH_DETAILS = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation addMatchScore($input: TournamentMatchScoreInput!) {
    addMatchScore(input: $input) {
      ...ViewTournamentFields
    }
  }
`

const UPDATE_MATCH_DETAILS = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation updateMatchScore($input: TournamentMatchScoreInput!) {
    updateMatchScore(input: $input) {
      ...ViewTournamentFields
    }
  }
`

const DELETE_MATCH = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation deleteTournamentMatch($id: Int!) {
    deleteTournamentMatch(id: $id) {
      ...ViewTournamentFields
    }
  }
`

const MatchDetails = ({
  index,
  match = { players: [] },
  tournament,
  setTournament,
}) => {
  const { currentUser, hasRole } = useAuth()
  const [edit, setEdit] = React.useState(false)
  const [addedScore, setAddedScore] = React.useState(false)
  const [currentMatch, setCurrentMatch] = React.useState({ players: [] })

  const [addMatchScore, { loading: addMatchScoreLoading }] = useMutation(
    SUBMIT_MATCH_DETAILS,
    {
      onCompleted: (data) => {
        setTournament(data.addMatchScore)
        toast.success(`Successfully Added Score`)
        setAddedScore(true)
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

  const [updateMatchScore, { loading: updateMatchScoreLoading }] = useMutation(
    UPDATE_MATCH_DETAILS,
    {
      onCompleted: (data) => {
        setTournament(data.updateMatchScore)
        toast.success(`Successfully Updated Match`)
        setEdit(false)
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

  const [deleteTournamentMatch, { loading: deleteMatchLoading }] = useMutation(
    DELETE_MATCH,
    {
      onCompleted: (data) => {
        setTournament(data.deleteTournamentMatch)
        toast.success('Successfully Deleted Match')
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
    setCurrentMatch({ ...match })
  }, [match])

  const onSubmit = (data) => {
    let input = {
      matchId: match?.id,
      matches: [
        {
          userId: match?.players[0]?.user?.id,
          playerName: match?.players[0]?.playerName,
          playerMatchScoreId: match?.players[0]?.id,
          score: data.player1,
          result: returnResult(data.player1, data.player2),
        },
        {
          userId: match?.players[1]?.user?.id,
          playerMatchScoreId: match?.players[1]?.id,
          playerName: match?.players[1]?.playerName,
          score: data.player2,
          result: returnResult(data.player2, data.player1),
        },
      ],
    }
    addMatchScore({ variables: { input } })
  }

  const onSubmitEdit = (data) => {
    const input = {
      matchId: match?.id,
      matches: [
        {
          userId: match?.players[0]?.user?.id,
          updatedUserId: data.player1UserId,
          previousBye: match?.players[0]?.bye,
          playerName: match?.players[0]?.playerName,
          updatedPlayerName: data.player1PlayerName,
          playerMatchScoreId: match?.players[0]?.id,
          score: data.player1,
          result: returnResult(data.player1, data.player2),
        },
        data.player2PlayerName
          ? {
              userId: match?.players[1]?.user?.id,
              updatedUserId: data.player2UserId,
              playerName: match?.players[1]?.playerName,
              updatedPlayerName: data.player2PlayerName,
              playerMatchScoreId: match?.players[1]?.id,
              score: data.player2,
              result: returnResult(data.player2, data.player1),
            }
          : null,
      ],
    }

    updateMatchScore({ variables: { input } })
  }

  const returnResult = (currPlayer, otherPlayer) => {
    if (currPlayer >= 0 && otherPlayer >= 0) {
      if (currPlayer > otherPlayer) {
        return 'WIN'
      } else if (currPlayer === otherPlayer) {
        return 'TIED'
      } else {
        return 'LOSS'
      }
    } else return null
  }

  const returnIcons = () => {
    const icons = []

    if (currentMatch?.players[0]?.score) {
      const result = returnResult(
        currentMatch?.players[0]?.score,
        currentMatch?.players[1]?.score
      )
      if (result === 'WIN') {
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 text-white flex justify-center items-center">
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
        )
      } else if (result === 'LOSS') {
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 text-white flex justify-center items-center">
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )
      } else if (result === 'TIED') {
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 flex justify-center items-center text-white mr-2">
            {' '}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
        )
        icons.push(
          <div className="rounded-full bg-gray-900 w-10 h-10 flex justify-center items-center text-white ">
            {' '}
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )
      }
    } else {
      icons.push(<div className="rounded-full bg-gray-900 w-10 h-10"></div>)
    }

    return icons
  }

  const scoreSubmitted = (playerScore) => {
    if (playerScore === 0 || playerScore >= 1) {
      return true
    }

    return false
  }

  const formMethods = useForm()
  const player1 = formMethods.watch('player1', '')
  const player2 = formMethods.watch('player2', '')

  return (
    <div className="col-span-12 border-b border-black pb-2 w-full">
      {!edit ? (
        <Form
          onSubmit={onSubmit}
          formMethods={formMethods}
          className="grid grid-cols-12"
        >
          <div className="col-span-1 flex justify-center items-center ">
            {index + 1}.
          </div>
          <div className="col-span-3 flex justify-center items-center">
            <PlayerProfileItem
              player={currentMatch?.players[0]?.user || {}}
              playerName={currentMatch?.players[0]?.playerName}
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            {!currentMatch?.players[0]?.bye && (
              <div>
                {scoreSubmitted(currentMatch?.players[0]?.score) ? (
                  <div
                    className={`rounded-full flex justify-center items-center h-8 w-8 ${
                      returnResult(
                        currentMatch?.players[0]?.score,
                        currentMatch?.players[1]?.score
                      ) === 'WIN'
                        ? 'bg-green-300'
                        : returnResult(
                            currentMatch?.players[0]?.score,
                            currentMatch?.players[1]?.score
                          ) === 'LOSS'
                        ? 'bg-red-300'
                        : 'bg-yellow-200'
                    }`}
                  >
                    {currentMatch?.players[0]?.score}
                  </div>
                ) : (
                  checkTournamentPermissions({
                    hasRole,
                    currentUser,
                    tournament,
                  }) && (
                    <NumberField
                      className="border border-gray-500 p-2 mt-2 w-14"
                      errorClassName="border p-2 mt-2 w-full border-red-500"
                      validation={{ required: true, min: 0 }}
                      name="player1"
                      min={0}
                    />
                  )
                )}
              </div>
            )}
          </div>
          <div className="col-span-2 flex justify-center items-center">
            {currentMatch?.players[0]?.bye ? <div>BYE</div> : returnIcons()}
          </div>
          {currentMatch?.players.length > 1 ? (
            <>
              <div className="col-span-1 flex justify-center items-center">
                {scoreSubmitted(currentMatch?.players[1]?.score) ? (
                  <div
                    className={`rounded-full flex justify-center items-center h-8 w-8 ${
                      returnResult(
                        currentMatch?.players[1]?.score,
                        currentMatch?.players[0]?.score
                      ) === 'WIN'
                        ? 'bg-green-300'
                        : returnResult(
                            currentMatch?.players[1]?.score,
                            currentMatch?.players[0]?.score
                          ) === 'LOSS'
                        ? 'bg-red-300'
                        : 'bg-yellow-200'
                    }`}
                  >
                    {currentMatch?.players[1]?.score}
                  </div>
                ) : (
                  checkTournamentPermissions({
                    hasRole,
                    currentUser,
                    tournament,
                  }) && (
                    <NumberField
                      className="border border-gray-500 p-2 mt-2 w-14"
                      errorClassName="border p-2 mt-2 w-full border-red-500"
                      validation={{ required: true, min: 0 }}
                      name="player2"
                      min={0}
                    />
                  )
                )}
              </div>
              <div className="col-span-3 flex justify-center items-center">
                <PlayerProfileItem
                  player={currentMatch?.players[1]?.user || {}}
                  playerName={currentMatch?.players[1]?.playerName}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-span-1 flex justify-center items-center"></div>
              <div className="col-span-3 flex justify-center items-center"></div>
            </>
          )}

          <div className="col-span-1 flex justify-around items-center">
            {checkTournamentPermissions({
              hasRole,
              currentUser,
              tournament,
            }) &&
              !tournament.dateEnded && (
                <>
                  <Button
                    onClick={() => setEdit(true)}
                    loading={addMatchScoreLoading}
                    rounded
                    color={'blue'}
                    my="0"
                    py="2"
                    px="2"
                    full={false}
                    colorWeight={400}
                  >
                    <PencilIcon className="h-6 w-6" />
                  </Button>
                  {!addedScore &&
                  player1 >= 0 &&
                  player2 >= 0 &&
                  !scoreSubmitted(currentMatch?.players[0]?.score) ? (
                    <Button
                      type="submit"
                      loading={addMatchScoreLoading}
                      rounded
                      my="0"
                      py="2"
                      px="2"
                      full={false}
                      colorWeight={400}
                    >
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </Button>
                  ) : (
                    <Button
                      loading={deleteMatchLoading}
                      rounded
                      color={'red'}
                      my="0"
                      py="2"
                      px="2"
                      full={false}
                      colorWeight={400}
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you would like to delete this match?'
                          )
                        ) {
                          deleteTournamentMatch({ variables: { id: match.id } })
                        }
                      }}
                    >
                      <TrashIcon className="h-6 w-6" />
                    </Button>
                  )}
                </>
              )}
          </div>
        </Form>
      ) : (
        <EditMatchDetails
          index={index}
          match={match}
          onSubmit={onSubmitEdit}
          onCancel={() => setEdit(false)}
          loading={updateMatchScoreLoading}
          tournament={tournament}
        />
      )}
    </div>
  )
}

export default MatchDetails
