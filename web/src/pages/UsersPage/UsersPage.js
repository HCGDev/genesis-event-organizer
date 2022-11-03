import UsersLayout from 'src/layouts/UsersLayout'
import UsersCell from 'src/components/UsersCell'
import { useLocation } from '@redwoodjs/router'

const UsersPage = () => {
  const { pathname, search } = useLocation()
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    let brokenSearch = new URLSearchParams(search)
    if (brokenSearch.has('searchTerm')) {
      setSearchTerm(brokenSearch.get('searchTerm'))
    }
  }, [search])

  return (
    <UsersLayout>
      <input
        className="rounded-md w-full my-2 border-2 p-2 rounded-md text-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Firstname, Lastname, Nickname or Email"
      />
      <UsersCell searchTerm={searchTerm} />
    </UsersLayout>
  )
}

export default UsersPage
