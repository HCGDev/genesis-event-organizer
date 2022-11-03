import { navigate } from '@redwoodjs/router'
import PlayerProfileItem from '../PlayerProfileItem/PlayerProfileItem'

const TournamentMatchesTab = ({ tournament }) => {
  const matchText = (match) => {
    let player1 = match.players[0].user
    let player2 = match.players.length > 1 ? match.players[1].user : null

    if (
      (match.players[0].score || match.players[0].score === 0) &&
      (match.players[1].score || match.players[1].score === 0)
    ) {
      if (match.players[0].score > match.players[1].score) {
        return (
          <>
            <div className="sm:col-span-4 flex justify-center">
              <PlayerProfileItem
                player={player1 || {}}
                playerName={match.players[0].playerName}
              />
            </div>{' '}
            <div className="sm:col-span-2">defeated </div>
            <div className="sm:col-span-4 ">
              <PlayerProfileItem
                player={player2 || {}}
                playerName={match?.players[1]?.playerName}
              />
            </div>{' '}
          </>
        )
      } else if (match.players[1].score > match.players[0].score) {
        return (
          <>
            <div className="sm:col-span-4 flex justify-center">
              <PlayerProfileItem
                player={player2 || {}}
                playerName={match?.players[1]?.playerName}
              />
            </div>{' '}
            <div className="sm:col-span-2">defeated</div>
            <div className="sm:col-span-4 ">
              <PlayerProfileItem
                player={player1 || {}}
                playerName={match.players[0].playerName}
              />
            </div>{' '}
          </>
        )
      } else if (match.players[1].score === match.players[0].score) {
        return (
          <>
            <div className="sm:col-span-4 flex justify-center">
              <PlayerProfileItem
                player={player1 || {}}
                playerName={match.players[0].playerName}
              />
            </div>
            <div className="sm:col-span-2">drew</div>
            <div className="sm:col-span-4 ">
              <PlayerProfileItem
                player={player2 || {}}
                playerName={match?.players[1]?.playerName}
              />
            </div>{' '}
          </>
        )
      }
    } else if (!player2) {
      return (
        <>
          <div className="sm:col-span-4 flex justify-center">
            <PlayerProfileItem
              player={player1 || {}}
              playerName={match?.players[1]?.playerName}
            />
          </div>{' '}
          <div className="sm;col-span-2 ">received a bye</div>
          <div className="sm:col-span-4 " />
        </>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col text-sm text-gray-900 max-w-3xl overflow-x-auto sm:w-full sm:max-w-none">
      <div className="text-gray-500 text-xs bg-gray-200 col-span-12 grid grid-cols-12 px-2">
        <div className="py-4 col-span-1 text-center uppercase">Match #</div>
        <div className="py-4 col-span-11 text-center uppercase">Result</div>
      </div>
      {tournament.round?.length > 0 ? (
        tournament?.round
          ?.slice(0)
          .reverse()
          .map((round) => (
            <>
              <>
                {round.matches
                  ?.slice(0)
                  .reverse()
                  .map((match) => {
                    const matchResult = matchText(match)
                    if (matchResult) {
                      return (
                        <div
                          key={match.id}
                          className="overflow-x-auto flex w-full sm:grid sm:grid-cols-12 px-2 py-4 sm:px-4 border-b border-black cursor-pointer items-center hover:bg-gray-100"
                          onClick={() =>
                            navigate(
                              `/tournament/${tournament.tournamentUrl}/rounds/${round.roundNumber}#${match.id}`
                            )
                          }
                        >
                          <div className="sm:col-span-2">
                            Round {round.roundNumber}
                          </div>
                          {matchResult}
                        </div>
                      )
                    }
                  })}
              </>
              <div
                className="grid grid-cols-12 px-2 py-4 sm:px-4 border-b border-black cursor-pointer font-bold hover:bg-gray-100 "
                onClick={() =>
                  navigate(
                    `/tournament/${tournament.tournamentUrl}/rounds/${round.roundNumber}`
                  )
                }
                key={round.id}
              >
                <div className="col-span-2">Round {round.roundNumber}</div>
                <div className="col-span-4" />
                <div className="col-span-2 "> Started</div>
                <div className="col-span-4" />
              </div>
            </>
          ))
      ) : (
        <div className="text-gray-900 text-lg my-8 mx-auto text-center w-screen sm:w-full">
          No completed matches.
        </div>
      )}
    </div>
  )
}

export default TournamentMatchesTab
