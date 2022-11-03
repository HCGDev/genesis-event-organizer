import { navigate, useLocation } from '@redwoodjs/router'

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation()

  const TABS = [
    'users',
    'tournaments',
    'stores',
    'player-tournament-scores',
    'player-match-scores',
    'matches',
    'rounds',
    'banners',
    'user-pictures',
    'user-user-roles',
    'contacts',
  ]

  const renderTabNav = () => {
    return TABS.map((tabOption) => {
      return (
        <div
          className={
            'border-gray-50 border-2 hover:bg-green-400 cursor-pointer py-4 px-8 w-full text-center capitalize' +
            (pathname.includes(tabOption) ? ' bg-green-600' : '')
          }
          key={`tab-${tabOption}`}
          onClick={() => navigate(`/admin/${tabOption}`)}
        >
          {tabOption}
        </div>
      )
    })
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-1/5 flex-col hidden sm:flex">{renderTabNav()}</div>
      <select
        className="mx-auto w-11/12 border-t-8 border-b-8 border border-green-700 sm:hidden capitalize text-center text-base my-4 py-2"
        onChange={(e) => navigate(`/admin/${e.target.value}`)}
      >
        {TABS.map((tab) => (
          <option value={tab}>{tab}</option>
        ))}
      </select>
      <div className="w-full sm:w-4/5 p-4 overflow-y-scroll">{children}</div>
    </div>
  )
}

export default AdminLayout
