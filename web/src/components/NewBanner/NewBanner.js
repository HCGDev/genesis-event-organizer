import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import BannerForm from 'src/components/BannerForm'

import { QUERY } from 'src/components/BannersCell'

const CREATE_BANNER_MUTATION = gql`
  mutation CreateBannerMutation($input: CreateBannerInput!) {
    createBanner(input: $input) {
      id
    }
  }
`

const NewBanner = () => {
  const [createBanner, { loading, error }] = useMutation(
    CREATE_BANNER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Banner created')
        navigate(routes.banners())
      },
    }
  )

  const onSave = (input) => {
    createBanner({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Banner</h2>
      </header>
      <div className="rw-segment-main">
        <BannerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBanner
