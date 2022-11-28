import { Link, routes } from '@redwoodjs/router'

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (

  )
}

export const Success = ({ dev }) => {
  return (<h3>N/A</h3>)
}
