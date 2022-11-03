import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import MatchForm from 'src/components/Match/MatchForm'

export const QUERY = gql`
  query FindMatchById($id: Int!) {
    match: match(id: $id) {
      id
      roundId
      createdAt
      updatedAt
      tournamentId
      active
    }
  }
`
const UPDATE_MATCH_MUTATION = gql`
  mutation UpdateMatchMutation($id: Int!, $input: UpdateMatchInput!) {
    updateMatch(id: $id, input: $input) {
      id
      roundId
      createdAt
      updatedAt
      tournamentId
      active
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ match }) => {
  const [updateMatch, { loading, error }] = useMutation(UPDATE_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('Match updated')
      navigate(routes.matches())
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      roundId: parseInt(input.roundId),
      tournamentId: parseInt(input.tournamentId),
    })
    updateMatch({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Match {match.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MatchForm
          match={match}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
