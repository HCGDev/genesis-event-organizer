import TournamentsLayout from 'src/layouts/TournamentsLayout'
import EditTournamentCell from 'src/components/EditTournamentCell'

const EditTournamentPage = ({ id }) => {
  return (
    <TournamentsLayout>
      <EditTournamentCell id={id} />
    </TournamentsLayout>
  )
}

export default EditTournamentPage
