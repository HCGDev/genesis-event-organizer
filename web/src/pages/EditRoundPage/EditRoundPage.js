import RoundsLayout from 'src/layouts/RoundsLayout'
import EditRoundCell from 'src/components/EditRoundCell'

const EditRoundPage = ({ id }) => {
  return (
    <RoundsLayout>
      <EditRoundCell id={id} />
    </RoundsLayout>
  )
}

export default EditRoundPage
