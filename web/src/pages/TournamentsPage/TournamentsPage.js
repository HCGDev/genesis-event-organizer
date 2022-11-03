import TournamentsLayout from 'src/layouts/TournamentsLayout'
import TournamentsCell from 'src/components/TournamentsCell'
import { useLocation } from '@redwoodjs/router'

const TournamentsPage = () => {
  const { search } = useLocation()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [orderBy, setOrderBy] = React.useState({
    orderByKey: 'id',
    orderByDirection: 'asc',
  })

  React.useEffect(() => {
    let brokenSearch = new URLSearchParams(search)
    if (brokenSearch.has('searchTerm')) {
      setSearchTerm(brokenSearch.get('searchTerm'))
    }
  }, [search])

  return (
    <TournamentsLayout>
      <input
        className="rounded-md w-full my-2 border-2 p-2 rounded-md text-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Tournament Name, Url, Location Name, or Street1"
      />
      <TournamentsCell
        searchTerm={searchTerm}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </TournamentsLayout>
  )
}

export default TournamentsPage
