import { useQuery } from '@redwoodjs/web'
import TournamentEOForm from 'src/components/TournamentEoForm/TournamentEoForm'

export const TOURNAMENT_BY_URL_SIMPLE = gql`
  query tournamentByUrl($url: String!) {
    tournamentByUrl: tournamentByUrl(url: $url) {
      id
      tournamentUrl
      name
      desc
      type
      startDate
      maxPlayers
      publicRegistration
      players {
        playerId
        active
      }
      locationName
      lat
      lng
      street1
      city
      country
      state
      zip
      ownerId
      storeId
      store {
        name
      }
    }
  }
`

const EOEditTournamentPage = ({ url }) => {
  const {
    loading,
    error,
    data: { tournamentByUrl: tournament } = {},
  } = useQuery(TOURNAMENT_BY_URL_SIMPLE, {
    variables: { url },
  })

  return (
    <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-100 border-sm py-4 text-sm text-gray-700 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl px-4">
        <h2 className="sm:mt-8 text-left text-2xl text-gray-900 uppercase">
          Edit Tournament: {tournament?.name}
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl px-4">
        <TournamentEOForm tournament={tournament} />
      </div>
    </div>
  )
}

export default EOEditTournamentPage
