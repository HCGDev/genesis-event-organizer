import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import PasswordSettingsTab from 'src/components/PasswordSettingsTab/PasswordSettingsTab'
import StoreSettingsTab from 'src/components/StoreSettingsTab/StoreSettingsTab'
import UserSettingsTab from 'src/components/UserSettingsTab/UserSettingsTab'

const SettingsPage = ({ tab }) => {
  const { currentUser, hasRole } = useAuth()
  const TABS = {
    user: {
      text: hasRole('Player')
        ? 'View Player Profile'
        : 'View Event Organizer Profile',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
      permissions: currentUser.user.id !== '',
      path: 'user',
    },
    password: {
      text: 'Password and Security',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      permissions: currentUser.user.id !== '',
      path: 'password',
    },
    store: {
      text: 'Edit Store Profile',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      permissions: hasRole(['EO', 'ADMIN']),
      path: 'store',
    },
  }
  if (!tab || tab === '' || !(tab in TABS)) {
    return <Redirect to={`/settings/${TABS.user.path}`} />
  }

  const renderTabNav = () => {
    return Object.keys(TABS).map((tabKey) => {
      let tabOption = TABS[tabKey]

      if (tabOption.permissions) {
        return (
          <div
            className={
              'hover:bg-gray-900 hover:text-white cursor-pointer py-2 mx-2 px-2 w-auto text-center flex items-center rounded-md' +
              (tab === tabOption.path
                ? ' bg-gray-900 text-white'
                : ' text-gray-300')
            }
            key={`tab-${tabOption.path}`}
            onClick={() => navigate(`/settings/${tabOption.path}`)}
          >
            <span className="mr-2">{tabOption.icon}</span>
            {tabOption.text}
          </div>
        )
      }
    })
  }

  const renderTab = () => {
    switch (tab) {
      case TABS.user.path:
        return <UserSettingsTab />
      case TABS.password.path:
        return <PasswordSettingsTab />
      case TABS.store.path:
        return <StoreSettingsTab />
    }
  }

  return (
    <div className="min-h-screen container mx-auto flex flex-col sm:flex-row sm:justify-center bg-gray-100 border-sm py-4 text-sm text-gray-700">
      <div className="flex-col w-1/5 bg-gray-800 hidden sm:flex">
        <div className="bg-gray-900 h-16 w-full mb-4"></div>
        {renderTabNav()}
      </div>
      <select
        className="mx-auto w-11/12 border-t-8 border-b-8 border border-gray-800 sm:hidden capitalize text-center text-base my-4 py-2"
        value={tab}
        onChange={(e) => navigate(`/settings/${e.target.value}`)}
      >
        {Object.keys(TABS).map((tabOptionKey) => {
          let tabOption = TABS[tabOptionKey]
          return (
            <option value={tabOption.path} key={tabOption.path}>
              {tabOption.text}
            </option>
          )
        })}
      </select>
      <div className="flex flex-col w-full sm:w-4/5 p-8 sm:px-16 py-8">
        {renderTab()}
      </div>
    </div>
  )
}

export default SettingsPage
