import ProfilePicture from '../ProfilePicture/ProfilePicture'
import UserPictureSelectorCell from '../UserPictureSelectorCell/UserPictureSelectorCell'

const UserPictureSelector = ({ userPicture, selectImage }) => {
  const [isSelectorOpen, setIsSelectorOpen] = React.useState(false)

  return (
    <div className="sm:relative mx-auto my-4">
      <button
        type="button"
        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
        id="user-menu-button"
        aria-expanded={isSelectorOpen}
        aria-haspopup="true"
        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
      >
        <span className="sr-only">Open user image selector</span>
        <ProfilePicture pic={userPicture} />
        <div className="bg-black absolute -right-2 -bottom-2 flex justify-center items-center rounded-full w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </button>
      {isSelectorOpen && (
        <div className="absolute max-h-60 bg-white border-2 z-20 grid grid-cols-4 gap-2 p-4 overflow-y-scroll shadow-md left-0 w-screen sm:w-96">
          <UserPictureSelectorCell
            selectImage={(image) => selectImage(image)}
          />
        </div>
      )}
    </div>
  )
}

export default UserPictureSelector
