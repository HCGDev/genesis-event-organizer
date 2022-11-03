import AddTournamentPlayer from './AddTournamentPlayer'

export const generated = () => {
  return (
    <div className="w-full overflow-x-auto h-screen">
      <table className="w-full">
        <tr className="bg-gray-100 w-full text-center text-xs text-gray-500 uppercase leading-4 font-normal">
          <th className="py-2">Rank</th>
          <th className="py-2">Nickname</th>
          <th className="py-2">Wins</th>
          <th className="py-2">Draws</th>
          <th className="py-2">Byes</th>
          <th className="py-2">Losses</th>
          <th className="py-2">Points</th>
          <th className="py-2">User Actions</th>
        </tr>
        <AddTournamentPlayer
          loading={false}
          onSubmit={(data) => console.log(data)}
        />
      </table>
    </div>
  )
}

export default { title: 'Components/AddTournamentPlayer' }
