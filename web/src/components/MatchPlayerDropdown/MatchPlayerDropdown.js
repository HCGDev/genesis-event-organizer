import { useQuery } from '@apollo/client'
import Select from 'react-select'

export const TOURNAMENT_PLAYERS = gql`
  query tournamentPlayers($url: String!, $searchTerm: String) {
    tournamentPlayers: tournamentPlayers(url: $url, searchTerm: $searchTerm) {
      id
      score
      wins
      byes
      draws
      losses
      active
      playerName
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

const MatchPlayerDropdown = ({
  onSelectPlayer = () => {},
  tournament = {},
  selectedPlayer = {},
}) => {
  const { loading, data: { tournamentPlayers } = [] } = useQuery(
    TOURNAMENT_PLAYERS,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        url: tournament.tournamentUrl,
      },
    }
  )

  const selectUser = ({ value }) => {
    onSelectPlayer(value)
  }

  return (
    <Select
      className="w-full mx-4"
      options={[
        { label: 'No player', value: null },
        ...(tournamentPlayers?.map((player) => ({
          label: player?.playerName,
          value: player,
        })) || []),
      ]}
      isSearchable
      isLoading={loading}
      onChange={selectUser}
      value={{ label: selectedPlayer.playerName, value: selectedPlayer }}
    />
  )
}

export default MatchPlayerDropdown
