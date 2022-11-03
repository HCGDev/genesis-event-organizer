import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoundForm from 'src/components/RoundForm'

import { QUERY } from 'src/components/RoundsCell'

const CREATE_ROUND_MUTATION = gql`
  mutation CreateRoundMutation($input: CreateRoundInput!) {
    createRound(input: $input) {
      id
    }
  }
`

const NewRound = () => {
  const [createRound, { loading, error }] = useMutation(CREATE_ROUND_MUTATION, {
    onCompleted: () => {
      toast.success('Round created')
      navigate(routes.rounds())
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, {
      tournamentId: parseInt(input.tournamentId),
    })
    createRound({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Round</h2>
      </header>
      <div className="rw-segment-main">
        <RoundForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRound
