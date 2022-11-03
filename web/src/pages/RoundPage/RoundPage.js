import RoundsLayout from 'src/layouts/RoundsLayout'
import RoundCell from 'src/components/RoundCell'

const RoundPage = ({ id }) => {
  return (
    <RoundsLayout>
      <RoundCell id={id} />
    </RoundsLayout>
  )
}

export default RoundPage
