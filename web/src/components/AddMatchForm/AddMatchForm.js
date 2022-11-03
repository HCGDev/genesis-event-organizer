import { XIcon } from '@heroicons/react/solid'
import { Form, useForm } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'
import Button from '../Button/Button'
import MatchPlayerDropdown from '../MatchPlayerDropdown/MatchPlayerDropdown'

const AddMatchForm = ({
  onSubmit = () => {},
  tournament = {},
  loading = false,
}) => {
  const formMethods = useForm()
  const [matchForm, setMatchForm] = React.useState({ players: [] })

  const resetForm = () => {
    setMatchForm({ players: [] })
  }

  const handleSubmit = () => {
    const playerTournamentIds = matchForm.players.map(
      (player) => player.playerTournamentId
    )

    if (playerTournamentIds.length > 0) {
      onSubmit(playerTournamentIds)
    } else {
      toast.error('You must select at least one player')
    }
  }

  return (
    <div className="col-span-12 border-b border-black pb-2 w-full">
      <Form
        onSubmit={handleSubmit}
        formMethods={formMethods}
        className="grid grid-cols-12"
      >
        <div className="col-span-1 flex justify-center items-center ">
          New Match
        </div>
        <div className="col-span-3 flex justify-center items-center">
          <MatchPlayerDropdown
            onSelectPlayer={(player) => {
              setMatchForm({
                ...matchForm,
                players: [
                  ...matchForm.players,
                  player
                    ? {
                        userId: player.player?.id,
                        playerTournamentId: player.id,
                        playerName: player.playerName,
                      }
                    : {},
                  {
                    ...matchForm.players[1],
                  },
                ],
              })
            }}
            tournament={tournament}
            selectedPlayer={matchForm?.players[0]}
          />
        </div>
        <div className="col-span-1 flex justify-center items-center"></div>
        <div className="col-span-2 flex justify-around items-center"></div>
        <div className="col-span-1 flex justify-center items-center"></div>
        <div className="col-span-3 flex justify-center items-center">
          <MatchPlayerDropdown
            onSelectPlayer={(player) => {
              setMatchForm({
                ...matchForm,
                players: [
                  {
                    ...matchForm.players[0],
                  },
                  player
                    ? {
                        userId: player.player?.id,
                        playerTournamentId: player.id,
                        playerName: player.playerName,
                      }
                    : {},
                ],
              })
            }}
            tournament={tournament}
            selectedPlayer={matchForm?.players[1]}
          />
        </div>

        <div className="col-span-1 flex justify-around items-center">
          {matchForm.players.length > 0 && (
            <Button
              loading={loading}
              onClick={resetForm}
              rounded
              my="0"
              py="2"
              px="2"
              full={false}
              color="red"
            >
              <XIcon className="h-6 w-6 text-white" />
            </Button>
          )}

          {matchForm.players.length > 0 && (
            <Button
              type="submit"
              loading={loading}
              rounded
              my="0"
              py="2"
              px="2"
              full={false}
              colorWeight={400}
            >
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export default AddMatchForm
