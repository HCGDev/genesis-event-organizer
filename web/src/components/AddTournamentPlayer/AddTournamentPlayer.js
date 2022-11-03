import CreatableSelect from 'react-select/creatable'
import { CheckIcon, PlusCircleIcon, XIcon } from '@heroicons/react/solid'
import Button from '../Button/Button'
import { useLazyQuery } from '@apollo/client'
import { TOURNAMENT_BY_URL } from 'src/pages/ViewTournamentPage/ViewTournamentPage'
import { useMutation } from '@redwoodjs/web'
import toast from 'react-hot-toast'
import { logError } from 'src/helpers/errorLogger'
import { VIEW_TOURNAMENT_FIELDS } from 'src/fragments/tourrnamentFragments'

export const SEARCH_NON_PLAYERS = gql`
  query searchNonPlayers($id: Int!, $searchTerm: String) {
    searchNonPlayers: searchNonPlayers(id: $id, searchTerm: $searchTerm) {
      nickname
      id
    }
  }
`

export const ADD_PLAYER = gql`
  ${VIEW_TOURNAMENT_FIELDS}
  mutation addPlayer($id: Int!, $input: AddPlayerInput!) {
    addPlayer: addPlayer(id: $id, input: $input) {
      ...ViewTournamentFields
    }
  }
`
const AddTournamentPlayer = ({
  tournament = {},
  setTournament = () => {},
  columns = ['wins', 'draws', 'byes', 'losses', 'score'],
  columnClasses = 'text-center py-2',
}) => {
  const defaultForm = {
    playerName: '',
    playerId: null,
    wins: 0,
    draws: 0,
    losses: 0,
    byes: 0,
    score: 0.0,
  }

  const [form, setForm] = React.useState({
    ...defaultForm,
  })
  const [nonPlayerList, setNonPlayerList] = React.useState([])

  const [addPlayer, { loading: loadingAddPlayer }] = useMutation(ADD_PLAYER, {
    onCompleted: (data) => {
      setTournament(data.addPlayer)
      toast.success('Successfully Added Player')
      setForm({
        ...defaultForm,
      })
    },
    onError: (error) => {
      logError({
        error,
        log: true,
        showToast: true,
      })
    },
    refetchQueries: [
      {
        query: TOURNAMENT_BY_URL,
        variables: { url: tournament.tournamentUrl },
      },
    ],
  })

  const [nonPlayers, { loading: loadingSearch }] = useLazyQuery(
    SEARCH_NON_PLAYERS,
    {
      onCompleted: (data) => {
        setNonPlayerList(
          data?.searchNonPlayers.map((player) => ({
            label: player.nickname,
            value: player,
          })) || []
        )
      },
    }
  )

  const createDummy = (value) => {
    setForm({
      ...form,
      playerName: value,
      playerId: null,
    })
  }

  const selectUser = ({ value }) => {
    setForm({
      ...form,
      playerName: value.nickname,
      playerId: value.id,
    })
  }

  const onChangeText = (value) => {
    if (value.length > 2) {
      nonPlayers({
        variables: {
          id: tournament.id,
          searchTerm: value,
        },
      })
    }
  }

  return (
    <tr className="text-center py-2 border-black border-b-2 text-gray-900 text-sm mb-2">
      <td className={columnClasses}>
        <div className="flex justify-center">
          <PlusCircleIcon className="h-8 w-8 text-green-700" />
        </div>
      </td>
      <td className={columnClasses}>
        <CreatableSelect
          onCreateOption={createDummy}
          onChange={selectUser}
          className="w-full rounded-md shadow-sm"
          errorClassName="border-2 p-2 mt-2 w-full rounded-md shadow-sm border-red-500"
          onInputChange={onChangeText}
          isLoading={loadingSearch}
          value={{
            value: form.playerName,
            label: form.playerName,
          }}
          options={nonPlayerList}
        />
      </td>
      {columns.map((column) => (
        <td className={columnClasses} key={`add-player-${column}`}>
          <input
            type="number"
            min={0}
            value={form[column]}
            name={form[column]}
            onChange={({ target }) => {
              setForm({ ...form, [column]: parseInt(target?.value) })
            }}
            className="w-12 border-2 p-2"
          />
        </td>
      ))}
      <td className="text-center py-2">
        {form.playerName && (
          <div className="flex justify-around">
            <Button
              color="red"
              disabled={loadingAddPlayer}
              full={false}
              rounded
              className="w-8 h-8 justify-center items-center"
              px={1}
              py={1}
              my={0}
              onClick={() => {
                if (confirm('Are you sure you would like to reset the form?')) {
                  setForm({
                    ...defaultForm,
                  })
                }
              }}
            >
              <XIcon className="h-8 w-8 text-white" />
            </Button>
            <Button
              color="green"
              disabled={loadingAddPlayer}
              full={false}
              px={1}
              py={1}
              my={0}
              rounded
              className="w-8 h-8 justify-center items-center"
              onClick={() =>
                addPlayer({
                  variables: {
                    id: tournament.id,
                    input: {
                      ...form,
                    },
                  },
                })
              }
            >
              <CheckIcon className="h-8 w-8 text-white" />
            </Button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default AddTournamentPlayer
