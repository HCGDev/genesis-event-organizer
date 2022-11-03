import ProfilePicture from '../ProfilePicture/ProfilePicture'

const PlayerProfileItem = ({
  player = {},
  className = '',
  showPhoto = true,
  playerName = '',
}) => {
  let { nickname, photo } = player

  return (
    <div className={`flex items-center justify-start` + className}>
      {showPhoto && (
        <div className="mr-4">
          <ProfilePicture pic={photo} size="12" />
        </div>
      )}
      <span>{nickname || playerName}</span>
    </div>
  )
}

export default PlayerProfileItem
