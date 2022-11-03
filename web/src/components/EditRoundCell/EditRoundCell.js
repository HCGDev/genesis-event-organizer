import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoundForm from 'src/components/RoundForm'

export const QUERY = gql`
  query FIND_ROUND_BY_ID($id: Int!) {
    round: round(id: $id) {
      id
      createdAt
      updatedAt
      tournamentId
      roundNumber
      active
      startingTimerInSeconds
      roundTimerLeftInSeconds
    }
  }
`
const UPDATE_ROUND_MUTATION = gql`
  mutation UpdateRoundMutation($id: Int!, $input: UpdateRoundInput!) {
    updateRound(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      tournamentId
      roundNumber
      active
      startingTimerInSeconds
      roundTimerLeftInSeconds
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ round }) => {
  const [updateRound, { loading, error }] = useMutation(UPDATE_ROUND_MUTATION, {
    onCompleted: () => {
      toast.success('Round updated')
      navigate(routes.rounds())
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      tournamentId: parseInt(input.tournamentId),
    })
    updateRound({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Round {round.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RoundForm
          round={round}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
