import { createValidatorDirective } from '@redwoodjs/graphql-server'
import { logger } from 'src/lib/logger'
import { requireAuth as applicationRequireAuth } from 'src/lib/auth'

export const schema = gql`
  """
  Use @adminOnly to validate access to a field, query or mutation.
  """
  directive @adminOnly on FIELD_DEFINITION
`

const validate = ({ context, directiveArgs }) => {
  applicationRequireAuth({ roles: ['ADMIN'] })
}

const adminOnly = createValidatorDirective(schema, validate)

export default adminOnly
