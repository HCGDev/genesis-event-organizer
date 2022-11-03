import StoresLayout from 'src/layouts/StoresLayout'
import StoresCell from 'src/components/StoresCell'
import { useLocation } from '@redwoodjs/router'

const StoresPage = () => {
  const { search } = useLocation()
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    let brokenSearch = new URLSearchParams(search)
    if (brokenSearch.has('searchTerm')) {
      setSearchTerm(brokenSearch.get('searchTerm'))
    }
  }, [search])

  return (
    <StoresLayout>
      <input
        className="rounded-md w-full my-2 border-2 p-2 rounded-md text-gray-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Store Id, Name, Email, Street or Country"
      />
      <StoresCell searchTerm={searchTerm} />
    </StoresLayout>
  )
}

export default StoresPage
