const LoadingIcon = ({ size = 12, animated = true }) => {
  return (
    <div className={`flex w-${size} h-${size} justify-self-center self-center`}>
      <img
        className="animate-pulse h-full w-full min-w-full min-h-full"
        src="/Logo.png"
        alt="Loading"
      />
    </div>
  )
}

export default LoadingIcon
