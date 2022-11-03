import { XIcon } from '@heroicons/react/solid'
import { Form, NumberField } from '@redwoodjs/forms/dist'
import { useForm } from '@redwoodjs/forms'
import Button from '../Button/Button'
import MatchPlayerDropdown from '../MatchPlayerDropdown/MatchPlayerDropdown'
import { toast } from '@redwoodjs/web/dist/toast'

const EditMatchDetails = ({
  index,
  match,
  onSubmit = () => {},
  onCancel = () => {},
  loading,
  tournament = {},
}) => {
  const formMethods = useForm()
  const [matchForm, setMatchForm] = React.useState({
    players: [],
  })
  const player1 = formMethods.watch('player1', '')
  const player2 = formMethods.watch('player2', '')

  React.useState(() => {
    setMatchForm({ ...match })
  }, [match])

  const scoreSubmitted = (playerScore) => {
    if (playerScore === 0 || playerScore >= 1) {
      return true
    }

    return false
  }

  const handleSubmit = async (data) => {
    let [player1UserId, player2UserId] = matchForm.players.map(
      (player) => player?.userId
    )
    let [player1PlayerName, player2PlayerName] = matchForm.players.map(
      (player) => player.playerName
    )

    const oldPlayer1Name = match.players[0]?.playerName || null
    const oldPlayer2Name = match.players[1]?.playerName || null

    if (!player1PlayerName && !player2PlayerName) {
      toast.error('Matches must contain at least one player.')
    } else if (player1PlayerName === player2PlayerName) {
      toast.error('Matches cannot contain the same player twice.')
    } else {
      if (!player1PlayerName && player2PlayerName) {
        player1PlayerName = player2PlayerName
        player2PlayerName = null
        player2UserId = player1UserId
        player1UserId = null
      }

      const oldMatchString = `${oldPlayer1Name}${
        match.players[0].score ? `(Score: ${match.players[0].score})` : ''
      } ${
        oldPlayer2Name
          ? `vs ${oldPlayer2Name}${
              match.players[1].score ? `(Score: ${match.players[1].score})` : ''
            }`
          : 'given a bye'
      }`

      const newMatchString = `${player1PlayerName}${
        data.player1 ? `(Score: ${data.player1})` : ''
      } ${
        player2PlayerName
          ? `vs ${player2PlayerName}${
              data.player2 ? `(Score: ${data.player2})` : ''
            }`
          : 'given a bye'
      }`

      if (
        window.confirm(
          `Are you sure you want to update this match from \n${oldMatchString} \nto\n${newMatchString}? \nThe Leader Board will be updated accordingly.`
        )
      ) {
        onSubmit({
          ...data,
          player1UserId,
          player2UserId,
          player1PlayerName,
          player2PlayerName,
        })
      }
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      formMethods={formMethods}
      className="grid grid-cols-12"
    >
      <div className="col-span-1 flex justify-center items-center ">
        {index + 1}.
      </div>
      <div className="col-span-3 flex justify-center items-center">
        <MatchPlayerDropdown
          onSelectPlayer={(player) => {
            setMatchForm({
              ...matchForm,
              players: [
                player
                  ? {
                      ...matchForm.players[0],
                      userId: player.player?.id,
                      playerName: player.playerName,
                      id: matchForm.players[0].id,
                      matchId: matchForm.players[0].matchId,
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
      <div className="col-span-1 flex justify-center items-center">
        {(!matchForm?.players[0]?.bye || !matchForm?.players[1]?.playerName) &&
          scoreSubmitted(matchForm?.players[0]?.score) && (
            <div>
              <NumberField
                className="border border-gray-500 p-2 mt-2 w-14"
                errorClassName="border p-2 mt-2 w-full border-red-500"
                defaultValue={matchForm?.players[0]?.score}
                validation={{ required: true, min: 0 }}
                name="player1"
                min={0}
              />
            </div>
          )}
      </div>
      <div className="col-span-2 flex justify-around items-center"></div>
      {matchForm?.players.length > 1 || !matchForm?.players[1]?.playerName ? (
        <>
          <div className="col-span-1 flex justify-center items-center">
            {scoreSubmitted(matchForm?.players[1]?.score) && (
              <NumberField
                className="border border-gray-500 p-2 mt-2 w-14"
                errorClassName="border p-2 mt-2 w-full border-red-500"
                defaultValue={matchForm?.players[1]?.score}
                validation={{ required: true, min: 0 }}
                name="player2"
                min={0}
              />
            )}
          </div>
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
                          ...(matchForm.players[1] || {}),
                          userId: player.player?.id,
                          playerName: player.playerName,
                          id: matchForm.players[1]?.id || null,
                          matchId: matchForm.players[1]?.matchId || null,
                        }
                      : {},
                  ],
                })
              }}
              tournament={tournament}
              selectedPlayer={matchForm?.players[1]}
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-1 flex justify-center items-center"></div>
          <div className="col-span-3 flex justify-center items-center"></div>
        </>
      )}

      <div className="col-span-1 flex justify-around items-center">
        <Button
          loading={loading}
          onClick={onCancel}
          rounded
          my="0"
          py="2"
          px="2"
          full={false}
          color="red"
        >
          <XIcon className="h-6 w-6 text-white" />
        </Button>
        {player1 !== matchForm?.players[0]?.score ||
          player2 !== matchForm?.players[1]?.score}
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
      </div>
    </Form>
  )
}

export default EditMatchDetails
