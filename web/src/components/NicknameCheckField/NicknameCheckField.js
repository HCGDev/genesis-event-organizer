import { useLazyQuery } from '@apollo/client'
import Filter from 'bad-words'

const filter = new Filter()

const CHECK_NICKNAME = gql`
  query CheckNicknameQuery($nickname: String!) {
    checkNickname(nickname: $nickname)
  }
`

const NicknameCheckField = ({
  onChange,
  setNicknameValid,
  value = null,
  defaultValue = null,
}) => {
  const [valid, setValid] = React.useState(null)
  const [errors, setErrors] = React.useState('')

  const [checkNickname, { called, loading }] = useLazyQuery(CHECK_NICKNAME, {
    onCompleted: (res) => {
      setValid(res.checkNickname)
      setNicknameValid(res.checkNickname)
    },
  })

  let nicknameClass = ''

  const onNicknameUpdate = (input) => {
    var nickname = input.target.value
    if (defaultValue && nickname === defaultValue) {
      setErrors('')
      setValid(null)
      setNicknameValid(null)
      onChange({ nickname })
    } else {
      if (nickname.length > 2) {
        if (filter.isProfane(nickname)) {
          setErrors(
            'Please ensure your nickname does not contain any profane words'
          )
          setValid(false)
          setNicknameValid(false)
        } else {
          checkNickname({ variables: { nickname } })
          onChange({ nickname })
        }
      } else {
        setErrors('')
        setValid(null)
        setNicknameValid(null)
      }
    }
  }

  if (called && !loading) {
    if (valid) {
      nicknameClass = ' border-green-500'
    } else if (valid === false) {
      nicknameClass = ' border-red-500'
    }
  }

  const renderIcon = () => {
    if (loading) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      )
    } else if (valid) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="green"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )
    } else if (valid === false) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="red"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )
    }
  }

  return (
    <>
      <div className="relative w-full flex">
        <input
          name="nickname"
          value={value}
          defaultValue={defaultValue}
          className={
            'border-2 p-2 mt-2 w-full flex focus:outline-none' + nicknameClass
          }
          onChange={onNicknameUpdate}
        />
        {called && <div className="absolute right-8 top-5">{renderIcon()}</div>}
      </div>
      {errors && <div className="text-red-500">{errors}</div>}
    </>
  )
}

NicknameCheckField.defaultProps = {
  setNicknameValid: () => {},
  onChange: () => {},
}

export default NicknameCheckField
