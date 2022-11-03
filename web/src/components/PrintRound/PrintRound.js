class PrintRound extends React.Component {
  render() {
    const { round, tournament } = this.props

    return (
      <div className="print flex">
        {round &&
          round.matches &&
          [...round?.matches]
            .sort((a, b) => b.players.length - a.players.length)
            .map((match, index) => (
              <div
                className="py-4 border-t-2 border-b-2 border-dashed border-black"
                key={match.id}
              >
                <h1 className="text-center w-full mb-1 text-xl">
                  {tournament.name} - Round {round.roundNumber} - Print Sheet
                </h1>

                <h2 className="text-center w-full mb-1 text-md">
                  {new Date().toDateString()}
                </h2>

                <table className="w-full">
                  <tr>
                    <th className="py-2 text-center">Table #</th>
                    <th className="py-2 text-center">Player 1 Nickname</th>
                    <th className="py-2 text-center">Player 1 Score</th>
                    <th className="py-2 text-center">Player 1 Signature</th>
                    <th className="py-2 text-center">Player 2 Nickname</th>
                    <th className="py-2 text-center">Player 2 Score</th>
                    <th className="py-2 text-center">Player 2 Signature</th>
                  </tr>
                  <tr>
                    <td className="mr-2 text-center">{index + 1}</td>
                    {match?.players?.map((playerScore) => (
                      <>
                        <td className="py-2 text-center">
                          {playerScore?.user?.nickname ||
                            playerScore.playerName}
                        </td>

                        <td className="py-2 text-center font-bold">
                          {playerScore?.bye ? (
                            'BYE'
                          ) : playerScore.score >= 0 ? (
                            <span>{playerScore.score}</span>
                          ) : (
                            <div className="ml-4 border-b border-black w-20 h-4" />
                          )}
                        </td>
                        <td className="py-2">
                          <div className="ml-4 border-b border-black w-20 h-4" />
                        </td>
                      </>
                    ))}
                  </tr>
                </table>
              </div>
            ))}
      </div>
    )
  }
}

export default PrintRound
