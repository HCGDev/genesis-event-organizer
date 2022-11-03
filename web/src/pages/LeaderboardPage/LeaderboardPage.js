import { useQuery } from '@redwoodjs/web'
import PlayerProfileItem from 'src/components/PlayerProfileItem/PlayerProfileItem'

import { ReactComponent as SearchIcon } from 'src/components/Icons/SearchIcon.svg'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Button from 'src/components/Button/Button'
import ToolTip from 'src/components/ToolTip/ToolTip'

const PLAYER_LEADERBOARD = gql`
  query playerLeaderboard($nicknameSearch: String, $skip: Int, $take: Int) {
    playerLeaderboard: playerLeaderboard(
      nicknameSearch: $nicknameSearch
      skip: $skip
      take: $take
    ) {
      leaderboard {
        playerId
        playerName
        player {
          nickname
          photo {
            url
            name
          }
          country
        }
        rank
        totalScore
        totalPoints
        totalTournamentsPlayed
      }
      totalCount
      more
    }
  }
`

const LeaderboardPage = () => {
  const [nicknameSearch, setNicknameSearch] = React.useState('')
  const takeAmount = 20
  const [take, setTake] = React.useState(takeAmount)

  const {
    loading,
    error,
    data: { playerLeaderboard } = {},
  } = useQuery(PLAYER_LEADERBOARD, {
    variables: { nicknameSearch, skip: 0, take },
  })

  return (
    <div className="flex flex-col container max-w-7xl mx-auto px-2">
      <h1 className="text-xl mt-8 sm:mt-4 mb-4 sm:mb-0 border-b-2 border-gray-100 pb-4">
        Leaderboard
      </h1>
      <div className="relative w-11/12 sm:w-1/4 mx-auto sm:ml-auto sm:mr-0 border-2 p-2 my-6 rounded-md text-gray-500 text-base leading-6">
        <div className="absolute left-2">
          <SearchIcon />
        </div>
        <input
          placeholder="Nickname Search"
          className="ml-8 w-10/12 focus:outline-none"
          onChange={(e) => {
            setTake(takeAmount)
            setNicknameSearch(e.target.value)
          }}
          value={nicknameSearch}
        />
      </div>

      <table className="border-gray-200 border-2 rounded-md p-4 border-collapse">
        <tr className="text-center text-gray-500 text-xs bg-gray-100 uppercase">
          <th className="py-2">Rank</th>
          <th className="px-2" />
          <th className="py-2">Nickname</th>
          <th className="px-2" />
          <th className="py-2">Country</th>
          <th className="py-2">
            Score
            <ToolTip
              text="Score = # Wins/Byes + # Tournaments Played + (0.5 x # Draws)"
              iconClass="h-5 w-5 inline-block ml-2"
            ></ToolTip>
          </th>
        </tr>
        {loading &&
          (playerLeaderboard?.leaderboard?.length === 0 ||
            !playerLeaderboard?.leaderboard) && (
            <tr>
              <td rowSpan="6" colSpan="6" className="py-8 w-full">
                <div className="w-full flex flex-col justify-center items-center">
                  <LoadingIcon size={'44px'} />
                </div>
              </td>
            </tr>
          )}
        {playerLeaderboard?.leaderboard?.length === 0 &&
          !loading &&
          (nicknameSearch ? (
            <td
              rowSpan="6"
              colSpan="6"
              className="text-gray-500 text-lg text-center py-8"
            >
              No players found with that nickname.
            </td>
          ) : (
            <td
              rowSpan="6"
              colSpan="6"
              className="text-gray-500 text-lg text-center py-8"
            >
              No tournaments have been completed.
            </td>
          ))}
        {!loading &&
          playerLeaderboard?.leaderboard?.map((player) => (
            <tr
              key={`leaderboard-player-${player.playerId}`}
              className="text-center border-b-2 border-black py-4 text-sm"
            >
              <td className="py-2">{player.rank}</td>
              <td className="px-2" />
              <td className="py-2 flex">
                <PlayerProfileItem
                  player={player.player || {}}
                  playerName={player.playerName}
                />
              </td>
              <td className="px-2" />
              <td className="py-2">{player.player?.country}</td>
              <td className="py-2">{player.totalScore}</td>
            </tr>
          ))}
      </table>
      {playerLeaderboard?.more && (
        <Button
          className="w-full mt-4 sm:mx-auto sm:w-1/4"
          full={false}
          onClick={() => {
            setTake(take + takeAmount)
          }}
          loading={loading}
        >
          Load More
        </Button>
      )}
    </div>
  )
}

export default LeaderboardPage
