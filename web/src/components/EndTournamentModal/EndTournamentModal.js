import { Fragment, useEffect, useRef, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Dialog, Transition } from '@headlessui/react'
import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { VIEW_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'
import { logError } from 'src/helpers/errorLogger'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import Button from '../Button/Button'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import ToolTip from '../ToolTip/ToolTip'
import { returnTieBreakerText } from 'src/helpers/tournamentHelper'

export const TOURNAMENT_LEADERBOARD_WITHOUT_TIES = gql`
  query tournamentLeaderboardWithoutTies($url: String!) {
    tournamentLeaderboardWithoutTies(url: $url) {
      id
      rank
      score
      wins
      byes
      draws
      losses
      active
      playerName
      matchWinPercentage
      opponentsWinPercentage
      tournamentWinPercentage
      tieBreakerWins
      didCorrectRank
      player {
        id
        nickname
        photo {
          url
          smallUrl
          name
        }
      }
    }
  }
`

export const END_TOURNAMENT = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation endTournament($id: Int!) {
    endTournament: endTournament(id: $id) {
      ...ViewTournamentFields
    }
  }
`

export const CREATE_TIE_BREAKER_ROUND = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation createTieBreakerRound($id: Int!) {
    createTieBreakerRound: createTieBreakerRound(id: $id) {
      ...ViewTournamentFields
    }
  }
`

const EndTournamentModal = ({ onClose, tournament, isOpen, setTournament }) => {
  const cancelButtonRef = useRef(null)
  const [tournamentLeaderboard, setTournamentLeaderboard] = useState([])
  const [playersWithTies, setPlayersWithTies] = useState([])
  const [tournamentLeaderboardWithoutTies, { loading }] = useLazyQuery(
    TOURNAMENT_LEADERBOARD_WITHOUT_TIES,
    {
      onCompleted: (data) => {
        if (data?.tournamentLeaderboardWithoutTies) {
          setTournamentLeaderboard(data?.tournamentLeaderboardWithoutTies)

          const playersNeedingResolution = findUnresolvedTies(
            data?.tournamentLeaderboardWithoutTies.filter(
              (player) => player.rank <= 4
            )
          )

          setPlayersWithTies(playersNeedingResolution)
        }
      },
    }
  )

  const groupBy = (list, keyGetter) => {
    const map = new Map()
    list.forEach((item) => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [item])
      } else {
        collection.push(item)
      }
    })
    return map
  }

  const findUnresolvedTies = (leaderboard = []) => {
    const playersNeedingResolution = []

    let playersGroupedByRank = groupBy(leaderboard, (player) => player.rank)
    playersGroupedByRank.forEach((players) => {
      if (players.length > 1) {
        playersNeedingResolution.push(players)
      }
    })

    return playersNeedingResolution
  }

  const [endTournament, { loading: loadingEndTournament }] = useMutation(
    END_TOURNAMENT,
    {
      onCompleted: (data) => {
        setTournament(data.endTournament)
        onClose()
        toast.success(`Tournament has ended!`)
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

  const [createTieBreakerRound, { loading: loadingCreateTieBreakerRound }] =
    useMutation(CREATE_TIE_BREAKER_ROUND, {
      onCompleted: (data) => {
        setTournament(data.createTieBreakerRound)
        onClose()
        toast.success(`Tie breaker round created!`)
        navigate(
          `/tournament/${tournament.tournamentUrl}/rounds/${data.createTieBreakerRound.round?.length}`
        )
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

  useEffect(() => {
    if (isOpen) {
      tournamentLeaderboardWithoutTies({
        variables: { url: tournament.tournamentUrl },
      })
    }
  }, [isOpen])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-gray-900"
                  >
                    Top 4 Ranks
                  </Dialog.Title>
                  <div className="mt-6">
                    <table className="w-full">
                      <thead className="text-sm font-medium uppercase border-b border-gray-200">
                        <th className="pb-2 font-medium">Rank</th>
                        <th className="pb-2 font-medium">Nickname</th>
                        <th className="pb-2 font-medium">Points</th>
                      </thead>
                      <tbody className="text-sm">
                        {loading ? (
                          <tr>
                            <td colSpan={3} rowSpan={3}>
                              <div className="flex justify-center items-center my-4">
                                <LoadingIcon />
                              </div>
                            </td>
                          </tr>
                        ) : (
                          tournamentLeaderboard
                            .filter((player) => player.rank <= 4)
                            .map((player, index) => (
                              <tr
                                key={player.id}
                                className="border-b border-gray-200"
                              >
                                <td className="py-2">{player.rank}</td>
                                <td className="py-2">{player.playerName}</td>
                                <td className="py-2">
                                  {player.score}
                                  {(player.didCorrectRank ||
                                    (index !==
                                      tournamentLeaderboard.length - 1 &&
                                      tournamentLeaderboard[index + 1].rank !==
                                        player.rank &&
                                      tournamentLeaderboard[index + 1].score ===
                                        player.score)) && (
                                    <ToolTip
                                      text={returnTieBreakerText(player)}
                                      iconClass="h-5 w-5 inline-block ml-2"
                                      place="left"
                                    ></ToolTip>
                                  )}
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <div className="text-sm">
                  Are you sure you would like to end this tournament?
                </div>
                {playersWithTies.length > 0 && (
                  <div className="mt-1 text-sm text-red-900">
                    There {playersWithTies.length > 1 ? 'are' : 'is'} currently{' '}
                    <span className="underline">{playersWithTies.length}</span>{' '}
                    tie{playersWithTies.length > 1 && 's'} within this
                    tournament.
                  </div>
                )}
              </div>
              <div className="mt-3 w-full flex justify-around">
                <Button
                  onClick={() => onClose(true)}
                  className="uppercase w-1/4 text-sm items-center"
                  full={false}
                  colorWeight={500}
                  color="green"
                >
                  Go back
                </Button>
                <Button
                  onClick={() => {
                    endTournament({ variables: { id: tournament.id } })
                  }}
                  loading={loadingEndTournament}
                  color="red"
                  full={false}
                  className="uppercase w-1/4 text-sm items-center"
                >
                  End Tournament
                </Button>
                {playersWithTies.length > 0 && (
                  <Button
                    onClick={() =>
                      createTieBreakerRound({
                        variables: { id: tournament.id },
                      })
                    }
                    loading={loadingCreateTieBreakerRound}
                    color="yellow"
                    colorWeight={500}
                    full={false}
                    className="uppercase w-1/4 text-sm items-center"
                  >
                    Tie Breaker Round
                  </Button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EndTournamentModal
