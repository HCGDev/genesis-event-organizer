import { routes } from '@redwoodjs/router'

export const redirectPage = () => {
  return (
    <>
      <script>window.location.href = {url}</script>
    </>
  )
}
