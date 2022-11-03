import { Link, routes } from '@redwoodjs/router'
import TournamentEoForm from 'src/components/TournamentEoForm/TournamentEoForm'

const CreateTournamentPage = () => {
  return (
    <div className="min-h-screen container mx-auto flex flex-col justify-center bg-gray-100 border-sm py-4 text-sm text-gray-700 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl px-4">
        <h2 className="sm:mt-8 text-left text-2xl text-gray-900 uppercase">
          Create Tournament
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl px-4">
        <TournamentEoForm tournament={{}} />
      </div>
    </div>
  )
}

export default CreateTournamentPage
