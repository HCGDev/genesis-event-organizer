import ProfilePicture from '../ProfilePicture/ProfilePicture'

export const QUERY = gql`
  query UserPictureSelectorQuery {
    userPictures {
      id
      name
      url
      smallUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ userPictures, selectImage }) => {
  return (
    <>
      {userPictures.map((pic) => (
        <div
          key={pic.id}
          onClick={() => selectImage(pic)}
          className="flex flex-col cursor-pointer hover:shadow-md"
        >
          <ProfilePicture pic={pic} />
          <div className="mt-4 font-bold mx-auto">{pic.name}</div>
        </div>
      ))}
    </>
  )
}
