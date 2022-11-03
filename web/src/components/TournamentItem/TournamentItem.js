import { Link, routes } from '@redwoodjs/router'
import { format } from 'date-fns'
import { ReactComponent as CalendarIcon } from 'src/components/Icons/CalendarIcon.svg'
import { ReactComponent as PlayersIcon } from 'src/components/Icons/PlayersIcon.svg'
import { ReactComponent as LocationIcon } from 'src/components/Icons/LocationIcon.svg'
import { ReactComponent as ClockIcon } from 'src/components/Icons/ClockIcon.svg'
import { ReactComponent as HomeIcon } from 'src/components/Icons/HomeIcon.svg'
import { ReactComponent as TrophyIcon } from 'src/components/Icons/TrophyIcon.svg'
import Truncate from 'react-truncate-html'
import {
  timeSinceTournament,
  timeUntilTournament,
} from 'src/helpers/tournamentHelper'

const TournamentItem = ({ tournament, full = false, index }) => {
  const {
    name,
    tournamentUrl,
    startDate,
    maxPlayers,
    playerList,
    desc,
    street1,
    locationName,
    city,
    state,
    country,
  } = tournament

  let timeTillTournament = timeUntilTournament(startDate)
  let timeSinceStart = timeSinceTournament(startDate)

  return (
    <div
      className={`flex flex-col w-full border-b ${
        index === 0 && 'border-t'
      } border-gray-200 py-2`}
    >
      <Link
        to={routes.viewTournament({
          url: tournamentUrl,
          tab: 'rounds',
          tabOptions: 1,
        })}
        className="cursor-pointer underline uppercase text-sm text-blue-500 hover:text-blue-300 w-auto font-semibold mb-2"
      >
        {name}
      </Link>
      {full ? (
        <div className="flex flex-col sm:grid sm:grid-cols-5 sm:gap-4 text-gray-400 text-sm">
          <div className="col-span-1 flex flex-col">
            <div className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <CalendarIcon />
              </div>{' '}
              <span className="ml-1">{format(new Date(startDate), 'PP')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <ClockIcon />
              </div>{' '}
              <span className="ml-1">
                {format(new Date(startDate), 'p zzzz')}
              </span>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <PlayersIcon />
              </div>{' '}
              <span className="ml-1">
                {playerList?.filter((player) => player.active).length}/
                {maxPlayers} Players Registered
              </span>
            </div>
            {tournament.street1 && (
              <div className="flex items-center">
                <div className="w-6 h-6 flex font-bold">
                  <LocationIcon />
                </div>{' '}
                <span className="ml-1">
                  {city}, {state}, {country}
                </span>
              </div>
            )}
          </div>
          <div className="col-span-2 mt-4 sm:mt-0">
            <Truncate
              lines={2}
              className="leading-normal text-sm"
              dangerouslySetInnerHTML={{
                __html: desc,
              }}
            />
          </div>
          <div
            className={
              'col-span-1 flex flex-col' +
              (tournament.dateStarted ? ' ' : ' sm:-mt-4')
            }
          >
            {tournament.dateStarted ? (
              <>
                <p className="uppercase font-bold text-sm text-red-500 mx-auto">
                  Started
                </p>
                <div className="bg-red-300 py-2 px-1 text-white uppercase rounded-md  max-w-sm text-center">
                  {timeSinceStart.hours} Hours Ago
                </div>
              </>
            ) : (
              <>
                <p className="uppercase font-bold text-sm text-red-500 mx-auto">
                  Starting in
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-700 py-2 px-1 text-white uppercase rounded-md max-w-sm text-center">
                    {timeTillTournament.days} DAYS
                  </div>
                  <div className="bg-green-700 py-2 px-1 text-white uppercase rounded-md  max-w-sm text-center">
                    {timeTillTournament.hours} HRS
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-gray-400 text-sm">
          <div className="flex items-center">
            <div className="w-6 h-6 flex font-bold">
              <CalendarIcon />
            </div>{' '}
            <span className="ml-1">{format(new Date(startDate), 'PP')}</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 flex font-bold">
              <ClockIcon />
            </div>{' '}
            <span className="ml-1">
              {format(new Date(startDate), 'p zzzz')}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 flex font-bold">
              <PlayersIcon />
            </div>{' '}
            <span className="ml-1">
              {playerList?.filter((player) => player.active).length}/
              {maxPlayers} Players Registered
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 flex font-bold">
              <HomeIcon />
            </div>{' '}
            <span className="ml-1">{locationName}</span>
          </div>
          {tournament.street1 && (
            <div className="flex items-center">
              <div className="w-6 h-6 flex font-bold">
                <LocationIcon />
              </div>{' '}
              <span className="ml-1">{street1}</span>
            </div>
          )}
          {tournament.winners.length > 0 && (
            <div className="flex items-center font-bold ">
              <div className="w-6 h-6 flex justify-center items-center">
                <TrophyIcon />
              </div>{' '}
              <span className="ml-1">
                {tournament.winners.map((winner, index) => (
                  <span key={`winner-${tournament.id}-${winner.id}`}>
                    {index > 0 && ', '}
                    {winner.player?.nickname || winner.playerName}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TournamentItem
