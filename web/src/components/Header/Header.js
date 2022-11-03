import { XIcon } from '@heroicons/react/solid'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, NavLink, routes } from '@redwoodjs/router'
import ProfilePicture from '../ProfilePicture/ProfilePicture'

const Header = () => {
  const { isAuthenticated, logOut, currentUser, hasRole } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const navigateMobile = (route) => {
    setMobileMenuOpen(false)
    navigate(route)
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center hidden md:flex">
              <Link to={routes.home()}>
                <img
                  className="mx-auto h-12 w-auto"
                  src="/Logo.png"
                  alt="GenesisEventOrganizer"
                />
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink
                to={routes.tournamentSearch()}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClassName="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Events
              </NavLink>
              <NavLink
                to={routes.leaderboard()}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClassName="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Leaderboard
              </NavLink>
              <NavLink
                to={routes.userContact()}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClassName="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contact Us
              </NavLink>
              <NavLink
                to={routes.storeLocator()}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClassName="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Store Locator
              </NavLink>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center">
              {((hasRole(['EO']) && currentUser?.stores[0]?.approved) ||
                hasRole('ADMIN')) && (
                <div className="flex-shrink-0">
                  <Link
                    to={routes.createTournament()}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>New Tournament</span>
                  </Link>
                </div>
              )}

              <div className="md:ml-4 md:flex-shrink-0 flex md:items-center">
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu-button"
                      aria-expanded={menuOpen}
                      aria-haspopup="true"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <ProfilePicture
                        pic={currentUser?.user?.photo}
                        size={14}
                      />
                    </button>
                  </div>
                  {menuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <div className="block px-4 py-2 text-sm text-gray-700 font-bold border-b border-gray-200">
                        {currentUser?.user?.nickname}
                      </div>
                      {hasRole('ADMIN') && (
                        <Link
                          to={routes.admin()}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          Admin
                        </Link>
                      )}
                      <Link
                        to={routes.settings({
                          tab: 'user',
                        })}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={async () => await logOut()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink
                to={routes.login()}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClassName="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Login{' '}
              </NavLink>
              <NavLink
                to={routes.signup()}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                activeClassName="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden absolute h-screen z-50 w-full left-0 "
            id="mobile-menu"
          >
            <div
              className="w-full flex absolute h-screen z-40"
              style={{ background: 'rgba(113, 111, 111, 0.65)' }}
            >
              <XIcon
                className="w-7 h-7 ml-auto mr-2 mt-2 text-white hover:shadow-md focus:border-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
            <div className="w-3/4 absolute bg-white transition-transform ease-in h-screen z-50">
              <div className="pt-2 pb-3 space-y-1">
                <button
                  onClick={() => navigateMobile(routes.home())}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateMobile(routes.tournamentSearch())}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Events
                </button>
                <button
                  onClick={() => navigateMobile(routes.leaderboard())}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Leaderboard
                </button>
                <button
                  onClick={() => navigateMobile(routes.userContact())}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => navigateMobile(routes.storeLocator())}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                  activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                >
                  Store Locator
                </button>
                {!isAuthenticated && (
                  <>
                    <button
                      onClick={() => navigateMobile(routes.login())}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                    >
                      Login{' '}
                    </button>
                    <button
                      onClick={() => navigateMobile(routes.signup())}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
              {isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <ProfilePicture
                        pic={currentUser?.user?.photo}
                        size={10}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {currentUser?.user?.nickname}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {currentUser?.user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {hasRole('ADMIN') && (
                      <button
                        onClick={() => navigateMobile(routes.admin())}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                      >
                        Admin
                      </button>
                    )}
                    <button
                      onClick={() => navigateMobile(routes.settings())}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                    >
                      Settings
                    </button>
                    <button
                      onClick={async () => await logOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
