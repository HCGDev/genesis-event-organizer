import TournamentsLayout from 'src/layouts/TournamentsLayout'
import TournamentCell from 'src/components/TournamentCell'

const TournamentPage = ({ id }) => {
  return (
    <TournamentsLayout>
      <TournamentCell id={id} />
    </TournamentsLayout>
  )
}

export default TournamentPage
