export const calcNumRounds = (numPlayers, power = 1) => {
  if (2 ** power >= numPlayers) {
    return power
  } else {
    return calcNumRounds(numPlayers, power + 1)
  }
}

export const checkTournamentPermissions = ({
  hasRole,
  tournament,
  currentUser,
}) => {
  if (tournament.ownerId === currentUser?.user?.id || hasRole('ADMIN')) {
    return true
  }

  return false
}

export const timeUntilTournament = (tournamentStartDate = new Date()) => {
  let dateDistance = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  let tournamentDate = new Date(tournamentStartDate)
  let today = new Date()
  let difference = tournamentDate - today

  if (difference > 0) {
    let seconds,
      minutes,
      hours,
      days = 0
    seconds = Math.floor(difference / 1000)

    minutes = Math.floor(seconds / 60)
    seconds = seconds % 60

    hours = Math.floor(minutes / 60)
    minutes = minutes % 60

    days = Math.floor(hours / 24)
    hours = hours % 24

    dateDistance = {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  return dateDistance
}

export const timeSinceTournament = (tournamentStartDate = new Date()) => {
  let dateDistance = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  let tournamentDate = new Date(tournamentStartDate)
  let today = new Date()
  let difference = tournamentDate - today

  if (difference < 0) {
    let seconds,
      minutes,
      hours,
      days = 0
    seconds = Math.abs(Math.floor(difference / 1000))

    minutes = Math.abs(Math.floor(seconds / 60))
    seconds = seconds % 60

    hours = Math.abs(Math.floor(minutes / 60))
    minutes = minutes % 60

    days = Math.abs(Math.floor(hours / 24))
    hours = hours % 24

    dateDistance = {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  return dateDistance
}

export const returnTieBreakerText = (tournamentPlayer) => {
  const {
    tieBreakerWins,
    opponentsWinPercentage,
    matchWinPercentage,
    gameWinPercentage,
  } = tournamentPlayer

  let text =
    'Rank is adjusted in comparison to users with same score based on following stats:'

  if (tieBreakerWins > 0) {
    text += `<br />Tie Breaker Wins: ${tieBreakerWins}`
  }

  if (opponentsWinPercentage > 0) {
    text += `<br />Opponents Win Percentage: ${Math.round(
      opponentsWinPercentage
    )}%`
  }

  if (matchWinPercentage > 0) {
    text += `<br />Match Win Percentage: ${Math.round(matchWinPercentage)}%`
  }

  if (gameWinPercentage > 0) {
    text += `<br />Game Win Percentage: ${Math.round(gameWinPercentage)}%`
  }

  return text
}
