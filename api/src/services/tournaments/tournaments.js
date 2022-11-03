import { Prisma } from '@prisma/client'
import { UserInputError } from '@redwoodjs/graphql-server'
import newPlayerRegisteredEO from 'src/emails/newPlayerRegisteredEO'
import newPlayerRegisteredPlayer from 'src/emails/newPlayerRegisteredPlayer'
import tournamentCancelledEO from 'src/emails/tournamentCancelledEO'
import tournamentCancelledPlayer from 'src/emails/tournamentCancelledPlayer'
import tournamentEditedEO from 'src/emails/tournamentEditedEO'
import tournamentEditedPlayer from 'src/emails/tournamentEditedPlayer'
import { sendEmail } from 'src/helpers/sendEmail'
import {
  generateMatches,
  generateTournamentUrl,
} from 'src/helpers/tournamentHelpers'
import { db } from 'src/lib/db'
import * as Sentry from '@sentry/node'
import { isEqual } from 'date-fns'
import tournamentCreatedEO from 'src/emails/tournamentCreatedEO'

export const tournament = ({ id }) => {
  return db.tournament.findUnique({
    where: { id },
  })
}

export const tournaments = ({
  searchTerm,
  orderBy = { orderByKey: 'id', orderByDirection: 'desc' },
  id,
}) => {
  try {
    return db.tournament.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            tournamentUrl: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            locationName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            street1: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        [orderBy.orderByKey]: orderBy.orderByDirection,
      },
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const myTournaments = ({}) => {
  try {
    let currentUser = context.currentUser
    if (currentUser) {
      return db.tournament.findMany({
        where: {
          AND: [
            {
              OR: [
                { ownerId: currentUser?.user?.id },
                { players: { some: { playerId: currentUser?.user?.id } } },
              ],
            },
            {
              OR: [
                {
                  startDate: {
                    gte: new Date(),
                  },
                },
                {
                  dateStarted: {
                    lte: new Date(),
                  },
                },
              ],
            },
            {
              dateEnded: {
                equals: null,
              },
            },
            {
              active: true,
            },
          ],
        },
      })
    }

    return []
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const currentTournaments = ({ input = {}, take = 6 }) => {
  try {
    return db.tournament.findMany({
      where: {
        AND: [
          {
            dateEnded: {
              equals: null,
            },
          },
          {
            dateStarted: {
              //Get any tournament that started less than 24 hours ago
              gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            },
          },
          {
            active: true,
          },
          {
            country: {
              contains: input.country,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: [
        {
          startDate: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
      take,
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const upcomingTournaments = ({ input = {}, take = 6 }) => {
  try {
    return db.tournament.findMany({
      where: {
        AND: [
          {
            dateEnded: {
              equals: null,
            },
          },
          {
            startDate: {
              gte: new Date(),
            },
          },
          {
            active: true,
          },
          {
            OR: [
              {
                country: {
                  contains: input.country,
                  mode: 'insensitive',
                },
              },
              {
                country: {
                  equals: null,
                },
              },
            ],
          },
        ],
      },
      orderBy: [
        {
          startDate: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
      take,
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const finishedTournaments = ({ input = {}, take = 6 }) => {
  try {
    return db.tournament.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                dateEnded: {
                  lte: new Date(),
                },
              },
            ],
          },
          {
            active: true,
          },
        ],
      },
      orderBy: {
        dateEnded: 'desc',
      },
      take,
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const searchTournaments = async ({ input }) => {
  let distanceQuery = Prisma.sql`111.111 *
  DEGREES(ACOS(LEAST(1.0, COS(RADIANS("Tournament".lat))
       * COS(RADIANS(${input.lat}))
       * COS(RADIANS("Tournament".lng - ${input.lng}))
       + SIN(RADIANS("Tournament".lat))
       * SIN(RADIANS(${input.lat}))))) AS distance`

  let today = new Date()

  let sqlQuery = Prisma.sql`
    SELECT "Tournament".id, "Tournament"."name", "Tournament"."type", "Tournament"."desc", "tournamentUrl", "Tournament"."city", "Tournament"."maxPlayers", "storeId", "Tournament"."locationName", "Tournament".lat, "Tournament".lng, "dateStarted", "startDate", "dateEnded", "Tournament"."createdAt", "Tournament"."updatedAt", "Tournament"."street1", "Tournament"."street2",  "Tournament"."country", "Tournament"."state", "Tournament"."zip", "timerLeftInSeconds", "timerStatus", "Tournament".active,
    COUNT("PlayerTournamentScore"."tournamentId") AS "playerCount", COUNT(*) OVER() AS full_count,
    ${distanceQuery}
    FROM "Tournament"
    LEFT JOIN "PlayerTournamentScore" ON "Tournament".id="PlayerTournamentScore"."tournamentId"
    LEFT JOIN "Store" ON "Tournament"."storeId"="Store".id
    WHERE "Tournament".active = true ${
      input.name
        ? Prisma.sql`AND "Tournament".name ILIKE ${'%' + input.name + '%'}`
        : Prisma.sql``
    }
    ${
      input.type && input.type !== 'ALL'
        ? Prisma.sql`AND "Tournament".type ILIKE ${'%' + input.type + '%'}`
        : Prisma.sql``
    }
    ${
      input.store
        ? Prisma.sql`AND "Store".name ILIKE ${'%' + input.store + '%'}`
        : Prisma.sql``
    }
    ${
      input.dateStart
        ? Prisma.sql`AND "Tournament"."startDate" >= ${new Date(
            input.dateStart
          )}`
        : Prisma.sql``
    }
    ${
      input.dateEnd
        ? Prisma.sql`AND "Tournament"."startDate" <= ${new Date(input.dateEnd)}`
        : Prisma.sql``
    }
    ${
      input.finishedTournaments
        ? Prisma.sql`AND "Tournament"."dateEnded" IS NOT NULL`
        : Prisma.sql`AND "Tournament"."dateEnded" IS NULL AND "Tournament"."startDate" > ${new Date(
            today.getDate() - 1
          )}`
    }
    GROUP BY "Tournament".id
    ${
      input.openSpotsOnly
        ? Prisma.sql`HAVING COUNT("PlayerTournamentScore"."tournamentId") < "Tournament"."maxPlayers"`
        : Prisma.sql``
    }
    ${
      input.lat && input.lng
        ? Prisma.sql`ORDER BY distance ASC`
        : Prisma.sql`ORDER BY "Tournament"."startDate" ASC`
    }
    LIMIT ${input.take}
    OFFSET ${input.skip};
  `

  try {
    const tournaments = await db.$queryRaw(sqlQuery)

    return {
      more: tournaments[0]?.full_count > input.take,
      totalCount: tournaments[0]?.full_count,
      tournaments,
    }
  } catch (error) {
    console.log(error)
    Sentry.captureException(error)
  }
}

export const tournamentByUrl = ({ url }) => {
  try {
    return db.tournament.findUnique({
      where: { tournamentUrl: url },
      include: {
        players: {
          orderBy: {
            score: 'desc',
          },
          select: {
            score: true,
          },
        },
      },
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const tournamentLeaderboardWithoutTies = async ({ url }) => {
  try {
    const tournament = await db.tournament.findUnique({
      where: { tournamentUrl: url },
    })
    const leaderboard = await leaderboardWithoutTies({
      tournamentId: tournament.id,
    })

    return leaderboard
  } catch (error) {
    Sentry.captureException(error)
  }
}

function sortTieBreakerPlayers(a, b) {
  if (b.tieBreakerWins !== a.tieBreakerWins) {
    return b.tieBreakerWins - a.tieBreakerWins
  }

  // Compare first the opponents win percentage
  if (b.opponentsWinPercentage !== a.opponentsWinPercentage) {
    return b.opponentsWinPercentage - a.opponentsWinPercentage
  }

  // Compare second the match win percentage
  if (b.matchWinPercentage !== a.matchWinPercentage) {
    return b.matchWinPercentage - a.matchWinPercentage
  }

  // Compare third the opponents OPPONENTS win percentage (not yet done)
  return 0
}

const leaderboardWithoutTies = async ({ tournamentId }) => {
  const tournament = await db.tournament.findUnique({
    where: { id: tournamentId },
    include: {
      matches: {
        include: {
          players: {
            include: {
              user: true,
            },
          },
        },
      },
      players: {
        include: {
          player: true,
        },
        orderBy: {
          score: 'desc',
        },
      },
    },
  })

  const tournamentMatches = tournament?.matches

  const leaderboard = tournament.players

  const resolvedLeaderboard = [...leaderboard]

  // If there are any players with the same score, we need to resolve the ties
  const playersNeedingResolution = findUnresolvedTies(leaderboard)

  // For each player with the same score, we should resolve the ties
  if (playersNeedingResolution.length > 0) {
    for (const players of playersNeedingResolution) {
      const copiedPlayers = await resolveTieBreaker({
        players,
        tournamentMatches,
      })

      copiedPlayers.forEach((player) => {
        // If the player is already in the leaderboard, we need to replace it
        const index = resolvedLeaderboard.findIndex(
          (leaderboardPlayer) =>
            (leaderboardPlayer.playerName === player.playerName &&
              !!player.playerName &&
              !!leaderboardPlayer.playerName) ||
            (leaderboardPlayer.playerId === player.playerId &&
              !!player.playerId &&
              !!leaderboardPlayer.playerId)
        )

        if (index !== -1) {
          resolvedLeaderboard[index] = player
        }
      })
    }
  }

  const sortedLeaderboard = []

  // For each player, we need to place their rank
  // Go through all users in resolved leaderboard. If the user is not in the array, get all users with the same score
  let lastRank = 1

  resolvedLeaderboard.forEach((player) => {
    // Sort the users with the same score by their opponent win percentage, match win percentage, and then their opponent's opponent win percentage
    // If any of the users have the same opponent win percentage, sort them by their match win percentage
    // If any of the users have the same match win percentage, sort them by their opponent's opponent win percentage
    // If the final sort is the same, keep rank the same for both, put didCorrectRank to false
    if (
      !sortedLeaderboard.find(
        (sortedPlayer) =>
          (sortedPlayer.playerName === player.playerName &&
            player.playerName) ||
          (sortedPlayer.playerId === player.playerId && player.playerId)
      )
    ) {
      const playersWithSameScore = resolvedLeaderboard.filter(
        (leaderboardPlayer) => leaderboardPlayer.score === player.score
      )
      if (playersWithSameScore.length > 1) {
        const sortedPlayersWithSameScore = [...playersWithSameScore].sort(
          sortTieBreakerPlayers
        )

        sortedPlayersWithSameScore.forEach((tieBreakerPlayer, index) => {
          if (index < sortedPlayersWithSameScore.length - 1) {
            const nextTieBreakerPlayer = sortedPlayersWithSameScore[index + 1]

            if (
              tieBreakerPlayer.tieBreakerWins ===
                nextTieBreakerPlayer.tieBreakerWins &&
              tieBreakerPlayer.opponentsWinPercentage ===
                nextTieBreakerPlayer.opponentsWinPercentage &&
              tieBreakerPlayer.matchWinPercentage ===
                nextTieBreakerPlayer.matchWinPercentage
            ) {
              sortedLeaderboard.push({
                ...tieBreakerPlayer,
                rank: lastRank,
                didCorrectRank: false,
              })

              if (index === sortedPlayersWithSameScore.length - 2) {
                sortedLeaderboard.push({
                  ...nextTieBreakerPlayer,
                  rank: lastRank,
                  didCorrectRank: false,
                })

                lastRank++
              }
            } else {
              sortedLeaderboard.push({
                ...tieBreakerPlayer,
                rank: lastRank,
                didCorrectRank: true,
              })

              lastRank++

              if (index === sortedPlayersWithSameScore.length - 2) {
                sortedLeaderboard.push({
                  ...nextTieBreakerPlayer,
                  rank: lastRank,
                  didCorrectRank: true,
                  needsTieBreaker: true,
                })

                lastRank++
              }
            }
          }
        })
      } else {
        sortedLeaderboard.push({
          ...player,
          rank: lastRank,
          didCorrectRank: false,
        })

        lastRank++
      }
    }
  })

  return sortedLeaderboard
}

const resolveTieBreaker = async ({ players = [], tournamentMatches = [] }) => {
  // Formula for resolving tie breaker: https://help.battlefy.com/en/articles/3367583-swiss-tie-breaker-formats
  let copiedPlayers = []

  for (const player of players) {
    const tieBreakerWins = getTieBreakerWins({
      player,
      tournamentMatches,
    })

    const matchWinPercentage = Math.floor(
      getMatchWinPercentage({
        player,
        tournamentMatches,
      })
    )

    const opponentsWinPercentage = Math.floor(
      getOpponentsWinPercentage({
        player,
        tournamentMatches,
      })
    )

    const gameWinPercentage = Math.floor(
      getGameWinPercentage({
        player: player,
        tournamentMatches,
      })
    )

    copiedPlayers.push({
      ...player,
      tieBreakerWins,
      matchWinPercentage,
      opponentsWinPercentage,
      gameWinPercentage,
    })
  }

  copiedPlayers = copiedPlayers.sort(sortTieBreakerPlayers)

  return copiedPlayers
}

const getTieBreakerWins = ({ player, tournamentMatches }) => {
  const matches = getPlayerTournamentMatches({
    player,
    tournamentMatches,
    includeTieBreakerMatches: true,
  })
  const tieBreakerMatches = matches.filter((match) => match.isTieBreakerMatch)

  const wonTieBreakerMatches = tieBreakerMatches.filter((match) => {
    return match.players.some((matchPlayer) => {
      return (
        matchPlayer.playerName === player.playerName && matchPlayer.wonMatch
      )
    })
  })

  return wonTieBreakerMatches.length || 0
}

const getOpponentsWinPercentage = ({ player, tournamentMatches }) => {
  // Get all the players matches
  const matches = getPlayerTournamentMatches({
    player,
    tournamentMatches,
    includeTieBreakerMatches: true,
  })

  // Get list of opponents
  const opponents = matches.map((match) => {
    return match.players.filter(
      (matchPlayer) => matchPlayer.playerName !== player.playerName
    )
  })

  // Get the match win percentage for each opponent
  const opponentsWinPercentage = []
  for (const opponent of opponents) {
    const opponentMatchWinPercentage = getMatchWinPercentage({
      player: opponent[0],
      tournamentMatches,
    })

    opponentsWinPercentage.push(opponentMatchWinPercentage)
  }

  const total =
    opponentsWinPercentage.reduce((acc, curr) => acc + curr, 0) /
    opponentsWinPercentage.length

  return total || 0

  // Get the opponent Game Win Percentage
}

const getMatchWinPercentage = ({ player, tournamentMatches }) => {
  const matches = getPlayerTournamentMatches({
    player,
    tournamentMatches,
    includeTieBreakerMatches: true,
  })

  const wonMatches = matches.filter((match) => {
    return match.players.some((matchPlayer) => {
      return (
        matchPlayer.playerName === player.playerName && matchPlayer.wonMatch
      )
    })
  })

  const winPercentage = (wonMatches.length / matches.length) * 100

  return winPercentage || 0
}

const getGameWinPercentage = ({ player, tournamentMatches }) => {
  const matches = getPlayerTournamentMatches({
    player,
    tournamentMatches,
    includeTieBreakerMatches: true,
  })
  // Matches have X games, where X is the score of both players both together
  let opponentWins = 0
  let playerWins = 0

  matches.forEach((match) => {
    const opponentMatchScore = match.players.find(
      (matchPlayer) => matchPlayer.playerName !== player.playerName
    )
    opponentWins += opponentMatchScore.score
  })

  matches.forEach((match) => {
    const playerMatchScore = match.players.find(
      (matchPlayer) => matchPlayer.playerName === player.playerName
    )

    playerWins += playerMatchScore.score
  })

  const winPercentage = (playerWins / (playerWins + opponentWins)) * 100

  return winPercentage || 0
}

// Get all the matches for a player within a given tournament
const getPlayerTournamentMatches = ({
  player,
  tournamentMatches = [],
  includeByes = false,
  includeTieBreakerMatches = false,
}) => {
  let playerMatches = tournamentMatches.filter((match) => {
    return (
      match.players.filter(
        (matchPlayer) => matchPlayer.playerName === player.playerName
      ).length > 0
    )
  })

  // Filter out matches that are unfinished
  playerMatches = playerMatches.filter((match) => {
    return match.players.some((matchPlayer) => matchPlayer.wonMatch)
  })

  if (!includeByes) {
    playerMatches = [...playerMatches].filter((match) => {
      return match.players.length > 1
    })
  }

  if (!includeTieBreakerMatches) {
    playerMatches = [...playerMatches].filter(
      (match) => !match.isTieBreakerMatch
    )
  }

  return playerMatches
}

export const createTournament = async ({
  input,
  previousCutoffTournamentId = null,
}) => {
  var newInput = { ...input }
  delete newInput.storeId
  const tournamentUrl = await generateTournamentUrl(input.name, db)
  const currentUser = context.currentUser
  var storeId = input.storeId

  if (storeId) {
    newInput['store'] = { connect: { id: storeId } }
  }

  if (previousCutoffTournamentId) {
    newInput.previousCutoffTournament = {
      connect: {
        id: previousCutoffTournamentId,
      },
    }
  }

  try {
    const tournament = await db.tournament.create({
      data: {
        ...newInput,
        tournamentUrl,
        owner: {
          connect: { id: currentUser.user.id },
        },
      },
    })

    let html = `${tournamentCreatedEO({ tournament, owner: currentUser }).html}`

    await sendEmail({
      to: currentUser.email,
      subject: `GEO: Tournament ${tournament.name} has been created`,
      html,
      text: `Tournament ${tournament.name} has been created`,
    })

    html = `${
      tournamentCreatedEO({ tournament, owner: currentUser, adminEmail: true })
        .html
    }`

    await sendEmail({
      to: process.env.ADMIN_EMAILS,
      subject: `GEO: Tournament ${tournament.name} has been created`,
      html,
      text: `Tournament ${tournament.name} has been created`,
    })

    return tournament
  } catch (error) {
    console.log('Tournament create error', error)
    Sentry.captureException(error)
  }
}

export const updateTournament = async ({ id, input }) => {
  let newData = { ...input }

  if (newData.storeId === '') {
    delete newData.storeId
  }

  try {
    const prevTournament = await db.tournament.findUnique({
      where: { id },
    })

    const tournament = await db.tournament.update({
      data: { ...newData, updatedAt: new Date() },
      where: { id },
    })

    const owner = await db.tournament.findUnique({ where: { id } }).owner({})

    const players = await db.tournament
      .findUnique({ where: { id } })
      .players({ where: { active: true } })

    if (
      !isEqual(
        new Date(prevTournament.startDate),
        new Date(tournament.startDate)
      ) ||
      prevTournament.name !== tournament.name ||
      prevTournament.street1 !== tournament.street1 ||
      prevTournament.locationName !== tournament.locationName
    ) {
      //Send emails to all players
      await Promise.all(
        players.map(async (player) => {
          let html = `${
            tournamentEditedPlayer({ tournament, player, prevTournament }).html
          }`
          let playerAccount = await db.user.findUnique({
            where: { id: player.playerId },
          })

          await sendEmail({
            to: playerAccount.email,
            subject: `GEO: Tournament ${tournament.name} has been updated`,
            html,
            text: `Tournament ${tournament.name} has been updated`,
          })
        })
      )

      let html = `${
        tournamentEditedEO({ tournament, owner, prevTournament }).html
      }`

      await sendEmail({
        to: owner.email,
        subject: `GEO: Tournament ${tournament.name} has been updated`,
        html,
        text: `Tournament ${tournament.name} has been updated`,
      })

      html = `${
        tournamentEditedEO({
          tournament,
          owner,
          prevTournament,
          adminEmail: true,
        }).html
      }`

      await sendEmail({
        to: process.env.ADMIN_EMAILS,
        subject: `GEO: Tournament ${tournament.name} has been updated`,
        html,
        text: `Tournament ${tournament.name} has been updated`,
      })
    }

    return tournament
  } catch (error) {
    console.log(error)
    Sentry.captureException(error)
  }
}

export const registerForTournament = async ({ id }) => {
  let currentUser = context.currentUser

  try {
    const tournament = await db.tournament.findUnique({
      where: { id },
    })

    if (!tournament.publicRegistration) {
      throw new UserInputError(
        'Registration can only be made by admins for this tournament. Please contact the organizer.'
      )
    }

    let previousPlayers = await db.playerTournamentScore.findFirst({
      where: { playerId: currentUser.user.id, tournamentId: id },
    })

    if (previousPlayers) {
      throw new UserInputError(
        'Player with that Player ID already registered for this tournament. Please ensure you have not already registered.'
      )
    }

    await db.playerTournamentScore.create({
      data: {
        playerName: currentUser.user.nickname,
        player: {
          connect: { id: currentUser.user.id },
        },
        tournament: {
          connect: { id },
        },
      },
    })

    const player = await db.user.findUnique({
      where: { id: currentUser.user.id },
    })

    let ownerEmail = ''
    if (tournament.storeId) {
      const store = await db.store.findUnique({
        where: {
          id: tournament.storeId,
        },
      })

      ownerEmail = store.email
    } else {
      const owner = await db.user.findUnique({
        where: {
          id: tournament.ownerId,
        },
      })

      ownerEmail = owner.email
    }

    let html = `${newPlayerRegisteredEO({ tournament, player }).html}`
    await sendEmail({
      to: ownerEmail,
      subject: `GEO: New Player Registered for: ${tournament.name}`,
      html,
      text: `New Player Registered for: ${tournament.name}`,
    })

    html = `${newPlayerRegisteredPlayer({ tournament, player }).html}`
    await sendEmail({
      to: player.email,
      subject: `GEO: Thanks for Registering for: ${tournament.name}`,
      html,
      text: `Thanks for Registering for:: ${tournament.name}`,
    })

    const updatedTournament = await db.tournament.findUnique({ where: { id } })

    return updatedTournament
  } catch (error) {
    console.log(error)
    Sentry.captureException(error)
  }
}

export const addPlayer = async ({ id, input }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })
  if (input.playerId) {
    let playerId = input.playerId
    let newInput = { ...input }
    delete newInput.playerId

    let previousPlayers = await db.playerTournamentScore.findFirst({
      where: { playerId: playerId, tournamentId: id },
    })

    if (previousPlayers) {
      throw new UserInputError(
        'Player with that Player ID already registered for this tournament. Please ensure the user you are adding has not been in the tournament before.'
      )
    }

    await db.playerTournamentScore.create({
      data: {
        ...newInput,
        tournament: {
          connect: {
            id,
          },
        },
        player: {
          connect: {
            id: playerId,
          },
        },
      },
    })
  } else {
    let newInput = { ...input }
    delete newInput.playerId

    let previousPlayers = await db.playerTournamentScore.findFirst({
      where: { playerName: input.playerName, tournamentId: id },
    })

    if (previousPlayers) {
      throw new UserInputError(
        'A dummy user with that Player Name already registered for this tournament. Please add a unique name'
      )
    }

    await db.playerTournamentScore.create({
      data: {
        ...newInput,
        tournament: {
          connect: {
            id,
          },
        },
      },
    })
  }

  return tournament
}

export const startTournament = async ({ id }) => {
  //Grab list of players and generate match ups
  const proposedMatches = await generateMatches({ roundNumber: 1, id, db })

  //Create new round, associate to all match ups
  const round = await db.round.create({
    data: {
      roundNumber: 1,
      tournament: {
        connect: {
          id,
        },
      },
    },
  })

  await createMatches({ proposedMatches, round, id })

  //Return tournament
  return db.tournament.update({
    data: {
      dateStarted: new Date(),
      startingTimerInSeconds: 3600,
      timerLeftInSeconds: 3600,
      timerStatus: 'INPROGRESS',
      timerLastUpdated: new Date(),
    },
    where: {
      id,
    },
  })
}

export const advanceRound = async ({ id, roundNumber }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })

  //Grab list of players and generate match ups
  const proposedMatches = await generateMatches({ roundNumber, id, db })

  const lastRound = await db.round.findFirst({
    where: { tournamentId: id },
    orderBy: { roundNumber: 'desc' },
  })

  let startingTimerInSeconds = tournament.startingTimerInSeconds
  let roundTimerLeftInSeconds = 0

  let timeElapsed = 0
  if (tournament.timerStatus === 'INPROGRESS') {
    timeElapsed = Math.floor(
      (new Date() - new Date(tournament.timerLastUpdated)) / 1000
    )
  }

  if (timeElapsed > tournament.timerLeftInSeconds) {
    timeElapsed = tournament.timerLeftInSeconds
  }

  roundTimerLeftInSeconds = tournament.timerLeftInSeconds - timeElapsed

  await db.round.update({
    data: {
      startingTimerInSeconds,
      roundTimerLeftInSeconds,
    },
    where: {
      id: lastRound.id,
    },
  })

  const round = await db.round.create({
    data: {
      roundNumber,
      tournament: {
        connect: {
          id,
        },
      },
    },
  })

  await createMatches({ proposedMatches, round, id })

  //Add tournament started date
  await db.tournament.update({
    data: {
      updatedAt: new Date(),
      startingTimerInSeconds: 3600,
      timerLeftInSeconds: 3600,
      timerStatus: 'INPROGRESS',
      timerLastUpdated: new Date(),
    },
    where: {
      id,
    },
  })

  //Return tournament
  return tournament
}

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

const findUnresolvedTies = (leaderboard = []) => {
  const playersNeedingResolution = []

  let playersGroupedByRank = groupBy(leaderboard, 'score')

  Object.values(playersGroupedByRank).forEach((players) => {
    // If there are more than 1 player in that rank and some of the players in the rank have played a match, then add them to the list of players needing resolution
    if (
      players.length > 1 &&
      players.every(
        (player) =>
          player.wins > 0 ||
          player.losses > 0 ||
          player.byes > 0 ||
          player.ties > 0 ||
          player.score > 0
      )
    ) {
      playersNeedingResolution.push(players)
    }
  })

  return playersNeedingResolution
}

export const createTieBreakerRound = async ({ id }) => {
  const players = await leaderboardWithoutTies({ tournamentId: id })

  // Create matches with a new tie breaker round with players who have tied
  // If there are any players with the same score, we need to resolve the ties
  const playersNeedingResolution = findUnresolvedTies(players)

  const lastRound = await db.round.findFirst({
    where: { tournamentId: id },
    orderBy: { roundNumber: 'desc' },
  })

  const tieBreakerRound = await db.round.create({
    data: {
      roundNumber: lastRound.roundNumber + 1,
      tournament: {
        connect: {
          id,
        },
      },
      isTieBreakerRound: true,
    },
  })

  await Promise.all(
    await playersNeedingResolution.map(async (unresolvedPlayerSet) => {
      await createSingleMatch({
        proposedMatch: [unresolvedPlayerSet[0]?.id, unresolvedPlayerSet[1]?.id],
        roundId: tieBreakerRound.id,
        tournamentId: id,
        tieBreaker: true,
      })
    })
  )

  // Return tournament
  return db.tournament.findUnique({
    where: { id },
  })
}

export const createCutoffTournament = async ({ id, cutOffRank = 4 }) => {
  // Grab list of players to add to new tournament
  const players = await leaderboardWithoutTies({ tournamentId: id })
  const tournament = await db.tournament.findUnique({ where: { id } })
  const playersInRank = players.filter((player) => player.rank <= cutOffRank)

  try {
    // End current tournament
    await endTournament({ id })

    const newTournament = await createTournament({
      input: {
        name: `${tournament.name} - Cut Off ${playersInRank.length}`,
        startDate: new Date(),
        maxPlayers: playersInRank.length,
        locationName: tournament.locationName,
        publicRegistration: false,
        infoUrl: tournament.infoUrl,
        street1: tournament.street1,
        street2: tournament.street2,
        city: tournament.city,
        state: tournament.state,
        zip: tournament.zip,
        country: tournament.country,
        storeId: tournament.storeId,
        desc: tournament.desc,
        type: tournament.type,
        lat: tournament.lat,
        lng: tournament.lng,
      },
      previousCutoffTournamentId: id,
    })

    // Register each player in the cut off amount in the new tournament
    await Promise.all(
      await playersInRank.map(async (player) => {
        await addPlayer({
          id: newTournament.id,
          input: {
            playerName: player.playerName,
            playerId: player.playerId,
          },
        })
      })
    )

    return newTournament
  } catch (error) {
    console.log('Tournament cut off create error', error)
    Sentry.captureException(error)
  }
}

export const endTournament = async ({ id }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })
  const players = await leaderboardWithoutTies({ tournamentId: id })
  const winners = [players[0]]

  await Promise.all(
    players.map((player) => {
      if (player.rank === players[0].rank) {
        winners.push(player)
      }
    })
  )

  const lastRound = await db.round.findFirst({
    where: { tournamentId: id },
    orderBy: { roundNumber: 'desc' },
  })

  let startingTimerInSeconds = tournament.startingTimerInSeconds
  let roundTimerLeftInSeconds = 0

  let timeElapsed = 0
  if (tournament.timerStatus === 'INPROGRESS') {
    timeElapsed = Math.floor(
      (new Date() - new Date(tournament.timerLastUpdated)) / 1000
    )
  }

  if (timeElapsed > tournament.timerLeftInSeconds) {
    timeElapsed = tournament.timerLeftInSeconds
  }

  roundTimerLeftInSeconds = tournament.timerLeftInSeconds - timeElapsed

  await db.round.update({
    data: {
      startingTimerInSeconds,
      roundTimerLeftInSeconds,
    },
    where: {
      id: lastRound.id,
    },
  })

  //Put tournament end date and assign winner
  await db.tournament.update({
    data: {
      updatedAt: new Date(),
      dateEnded: new Date(),
      startingTimerInSeconds: null,
      timerLeftInSeconds: null,
      timerStatus: null,
      timerLastUpdated: null,
    },
    where: {
      id,
    },
  })

  await Promise.all(
    winners.map(async (winner) => {
      await db.playerTournamentScore.update({
        data: {
          wonTournament: true,
        },
        where: {
          id: winner.id,
        },
      })
    })
  )

  return tournament
}

export const cancelTournament = async ({ id }) => {
  const players = await db.tournament
    .findUnique({ where: { id } })
    .players({ where: { active: true } })

  //Update tournament correctly
  const tournament = await db.tournament.update({
    data: {
      active: false,
    },
    where: {
      id,
    },
  })

  //Send emails to all players
  await Promise.all(
    players.map(async (player) => {
      let html = `${tournamentCancelledPlayer({ tournament, player }).html}`
      let playerAccount = await db.user.findUnique({
        where: { id: player.playerId },
      })

      await sendEmail({
        to: playerAccount.email,
        subject: `GEO: Tournament ${tournament.name} has been cancelled`,
        html,
        text: `Tournament ${tournament.name} has been cancelled`,
      })
    })
  )

  const owner = await db.tournament.findUnique({ where: { id } }).owner({})
  let html = `${tournamentCancelledEO({ tournament, owner }).html}`
  await sendEmail({
    to: owner.email,
    subject: `GEO: Tournament ${tournament.name} has been cancelled`,
    html,
    text: `Tournament ${tournament.name} has been cancelled`,
  })

  html = `${
    tournamentCancelledEO({ tournament, owner, adminEmail: true }).html
  }`
  await sendEmail({
    to: owner.email,
    subject: `GEO: Tournament ${tournament.name} has been cancelled`,
    html,
    text: `Tournament ${tournament.name} has been cancelled`,
  })

  return tournament
}

export const deleteTournament = ({ id }) => {
  return db.tournament.delete({
    where: { id },
  })
}

export const addMatchScore = async ({ input }) => {
  const match = await db.match.findUnique({ where: { id: input.matchId } })
  const tournament = await db.tournament.findUnique({
    where: { id: match.tournamentId },
  })

  try {
    await Promise.all(
      input.matches.map(async (playerMatch) => {
        await addPlayerMatchScore({
          playerMatch,
          matchId: match.id,
          match,
        })
      })
    )
  } catch (err) {
    Sentry.captureException(err)
    return err
  }

  return tournament
}

export const updateMatchScore = async ({ input }) => {
  const match = await db.match.findUnique({
    where: { id: input.matchId },
    include: { players: true },
  })

  try {
    if (
      match.players[0]?.score > 0 ||
      match.players[1]?.score > 0 ||
      match.players[0]?.bye
    ) {
      await rollBackScores({ match })
    }
    const matches = [...input.matches].filter((match) => !!match)

    // Change players in match if need be
    await Promise.all(
      matches.map(async (playerMatch) => {
        if (
          (playerMatch.updatedUserId || playerMatch.updatedPlayerName) &&
          (playerMatch.userId !== playerMatch.updatedUserId ||
            playerMatch.playerName !== playerMatch.updatedPlayerName)
        ) {
          if (playerMatch.playerMatchScoreId) {
            // Check if in all other matches there is no other player, if so, the player is given a bye
            const givenBye = matches
              .filter(
                (listedMatch) =>
                  listedMatch.playerMatchScoreId !==
                  playerMatch.playerMatchScoreId
              )
              .every((listedMatch) => !listedMatch.updatedPlayerName)

            await changePlayerInMatch({
              playerMatch,
              givenBye,
            })
          } else {
            // If the player is not in the match, add them
            await db.playerMatchScore.create({
              data: {
                matchId: match.id,
                userId: playerMatch.updatedUserId,
                playerName: playerMatch.updatedPlayerName,
              },
            })
          }
        }

        if (playerMatch.previousBye && matches.length > 1) {
          // Remove previously given bye
          await db.playerMatchScore.update({
            data: {
              bye: false,
            },
            where: {
              id: playerMatch.playerMatchScoreId,
            },
          })
        }
      })
    )

    // If there is only 1 matchInput given, delete the other playerMatchScore
    if (matches.length === 1) {
      const playerMatchScores = await db.playerMatchScore.findMany({
        where: {
          matchId: match.id,
        },
      })

      const matchIdsToKeep = matches.map((match) => match.playerMatchScoreId)

      await Promise.all(
        playerMatchScores.map(async (playerMatchScore) => {
          if (!matchIdsToKeep.includes(playerMatchScore.id)) {
            await db.playerMatchScore.delete({
              where: { id: playerMatchScore.id },
            })
          }
        })
      )
    }

    // Award bye points if needed
    if (matches.length === 1) {
      const playerTourneyWhere = matches[0]?.updatedUserId
        ? { playerId: matches[0]?.updatedUserId }
        : { playerName: matches[0]?.playerName }

      const playerTournamentScore = await db.playerTournamentScore.findFirst({
        where: {
          tournamentId: match.tournamentId,
          ...playerTourneyWhere,
        },
      })

      // Give player 1 a bye
      await db.playerTournamentScore.update({
        data: {
          byes: {
            increment: 1,
          },
          score: {
            increment: 1,
          },
        },
        where: {
          id: playerTournamentScore.id,
        },
      })
    } else {
      // Add match scores
      await Promise.all(
        matches.map(async (playerMatch) => {
          if (playerMatch.result) {
            const updatedPlayerMatch = { ...playerMatch }
            updatedPlayerMatch.userId = updatedPlayerMatch.updatedUserId
            updatedPlayerMatch.playerName = updatedPlayerMatch.updatedPlayerName
            await addPlayerMatchScore({
              playerMatch: updatedPlayerMatch,
              matchId: match.id,
              match,
            })
          } else {
            const givenBye = matches
              .filter(
                (listedMatch) =>
                  listedMatch.playerMatchScoreId !==
                  playerMatch.playerMatchScoreId
              )
              .every((listedMatch) => !listedMatch.updatedPlayerName)

            if (givenBye) {
              const playerTournamentWhere = {
                tournamentId: match.tournamentId,
              }

              if (playerMatch.userId) {
                playerTournamentWhere.playerId = playerMatch.userId
              } else if (playerMatch.playerName) {
                playerTournamentWhere.playerName = playerMatch.playerName
              }

              const playerTourneyScore =
                await db.playerTournamentScore.findFirst({
                  where: {
                    ...playerTournamentWhere,
                  },
                })

              await db.playerTournamentScore.update({
                data: {
                  score: {
                    increment: 1,
                  },
                  byes: {
                    increment: 1,
                  },
                },
                where: {
                  id: playerTourneyScore.id,
                },
              })
            }
          }
        })
      )
    }
  } catch (err) {
    Sentry.captureException(err)
    return err
  }

  return await db.tournament.findUnique({
    where: { id: match.tournamentId },
  })
}

const changePlayerInMatch = async ({ playerMatch, givenBye = false }) => {
  let updatedMatchData = {}

  if (playerMatch.updatedUserId) {
    updatedMatchData = {
      user: {
        connect: {
          id: playerMatch.updatedUserId,
        },
      },
    }
  } else {
    if (playerMatch.userId) {
      updatedMatchData = {
        user: {
          disconnect: true,
        },
      }
    }
  }

  updatedMatchData = {
    ...updatedMatchData,
    playerName: playerMatch.updatedPlayerName,
  }

  if (givenBye) {
    updatedMatchData.bye = true
  } else {
    updatedMatchData.bye = false
  }

  return db.playerMatchScore.update({
    data: updatedMatchData,
    where: {
      id: playerMatch.playerMatchScoreId,
    },
  })
}

export const deleteTournamentMatch = async ({ id }) => {
  const match = await db.match.findUnique({
    where: { id: id },
    include: { players: true },
  })

  // Do not roll back match unless scores were inputted
  if (
    match.players[0]?.score > 0 ||
    match.players[1]?.score > 0 ||
    match.players[0]?.bye
  ) {
    await rollBackScores({ match })
  }

  const tournamentId = match.tournamentId

  await db.playerMatchScore.deleteMany({
    where: {
      matchId: match.id,
    },
  })

  await db.match.delete({
    where: { id },
  })

  return db.tournament.findUnique({
    where: { id: tournamentId },
  })
}

export const createTournamentMatch = async ({ input }) => {
  const { tournamentId, roundId, proposedMatch } = input
  await createSingleMatch({ proposedMatch, tournamentId, roundId })
  return db.tournament.findUnique({ where: { id: tournamentId } })
}

// Add scores, update playerTournamentScore
const addPlayerMatchScore = async ({ playerMatch, matchId, match }) => {
  await db.playerMatchScore.update({
    data: {
      score: playerMatch.score,
      wonMatch: playerMatch.result === 'WIN',
      updatedAt: new Date(),
    },
    where: {
      id: playerMatch.playerMatchScoreId,
    },
  })

  // Overall score should NOT be updated if match is a tiebreaker match
  if (!match.isTieBreakerMatch) {
    let playerTournamentWhere = {
      tournamentId: match.tournamentId,
    }

    if (playerMatch.userId) {
      playerTournamentWhere.playerId = playerMatch.userId
    } else if (playerMatch.playerName) {
      playerTournamentWhere.playerName = playerMatch.playerName
    }

    let playerTourneyScore = await db.playerTournamentScore.findFirst({
      where: {
        ...playerTournamentWhere,
      },
    })

    let updateData = {}
    switch (playerMatch.result) {
      case 'WIN':
        updateData.wins = playerTourneyScore.wins + 1
        updateData.score = playerTourneyScore.score += 1
        break
      case 'TIED':
        updateData.draws = playerTourneyScore.draws + 1
        updateData.score = playerTourneyScore.score += 0.5
        break
      case 'LOSS':
        updateData.losses = playerTourneyScore.losses + 1
        break
      default:
        break
    }

    await db.playerTournamentScore.update({
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      where: {
        id: playerTourneyScore.id,
      },
    })
  }

  await db.match.update({
    data: {
      updatedAt: new Date(),
    },
    where: {
      id: matchId,
    },
  })
}

const rollBackScores = async ({ match }) => {
  //Check if previous match was a win, draw, or loss, then update scores appropriately
  let scores = {}

  let matches = await db.playerMatchScore.findMany({
    where: { matchId: match.id },
  })

  matches.forEach((playerMatch) => {
    scores[playerMatch.userId || playerMatch.playerName] = {
      prevScore: playerMatch.score,
      ...playerMatch,
    }
  })

  const [player1, player2] = Object.keys(scores)

  const updateDataPlayer1 = {}

  const player1TourneyWhere = scores[player1]?.userId
    ? { playerId: scores[player1]?.userId }
    : { playerName: scores[player1]?.playerName }

  const player1TourneyScore = await db.playerTournamentScore.findFirst({
    where: {
      tournamentId: match.tournamentId,
      ...player1TourneyWhere,
    },
  })

  const updateDataPlayer2 = {}

  const player2TourneyWhere = scores[player2]?.userId
    ? { playerId: scores[player2]?.userId }
    : { playerName: scores[player2]?.playerName }

  const player2TourneyScore = await db.playerTournamentScore.findFirst({
    where: {
      tournamentId: match.tournamentId,
      ...player2TourneyWhere,
    },
  })

  // Matches are byes
  if (
    scores[player1].bye ||
    (player2 && scores[player2]?.bye) ||
    !player2 ||
    !player1
  ) {
    if (scores[player1]?.bye) {
      updateDataPlayer1.byes = player1TourneyScore.byes - 1
      updateDataPlayer1.score = player1TourneyScore.score -= 1
    }

    if (player2 && scores[player2]?.bye) {
      updateDataPlayer2.byes = player2TourneyScore.byes - 1
      updateDataPlayer2.score = player2TourneyScore.score -= 1
    }
  } else if (
    scores[player1] && [scores[player2]] &&
    scores[player1]?.prevScore >= 0 &&
    scores[player2]?.prevScore >= 0
  ) {
    // Return scores to previous values based on whether they won or loss
    if (scores[player1]?.prevScore > scores[player2]?.prevScore) {
      // Player1 won
      updateDataPlayer1.wins = player1TourneyScore.wins - 1
      updateDataPlayer1.score = player1TourneyScore.score - 1
      updateDataPlayer2.losses = player2TourneyScore.losses - 1
    } else if (scores[player1]?.prevScore < scores[player2]?.prevScore) {
      // Player2 won
      updateDataPlayer2.wins = player2TourneyScore.wins - 1
      updateDataPlayer2.score = player2TourneyScore.score - 1
      updateDataPlayer1.losses = player1TourneyScore.losses - 1
    } else if (scores[player1]?.prevScore === scores[player2]?.prevScore) {
      // drew
      updateDataPlayer1.draws = player1TourneyScore.draws - 1
      updateDataPlayer1.score = player1TourneyScore.score - 0.5
      updateDataPlayer2.draws = player2TourneyScore.draws - 1
      updateDataPlayer2.score = player2TourneyScore.score - 0.5
    }
  }

  await db.playerTournamentScore.update({
    data: {
      ...updateDataPlayer1,
      updatedAt: new Date(),
    },
    where: {
      id: player1TourneyScore.id,
    },
  })

  await db.playerTournamentScore.update({
    data: {
      ...updateDataPlayer2,
      updatedAt: new Date(),
    },
    where: {
      id: player2TourneyScore.id,
    },
  })
}

export const updateTimer = async ({ input }) => {
  const {
    tournamentId: id,
    timerLeftInSeconds,
    timerStatus,
    startingTimerInSeconds,
  } = input

  return db.tournament.update({
    data: {
      timerLeftInSeconds,
      timerStatus,
      startingTimerInSeconds,
      timerLastUpdated: new Date(),
    },
    where: {
      id,
    },
  })
}

export const removePlayer = async ({ id }) => {
  //TODO: Check if admin or owner

  try {
    await db.playerTournamentScore.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    })

    return 'SUCCESS'
  } catch (err) {
    Sentry.captureException(err)
    return err
  }
}

export const leaveTournament = async ({ id }) => {
  let currentUser = context.currentUser

  try {
    const playerTournamentScore = await db.playerTournamentScore.findFirst({
      where: {
        tournamentId: id,
        playerId: currentUser?.user?.id,
      },
    })

    await db.playerTournamentScore.update({
      data: {
        active: false,
      },
      where: {
        id: playerTournamentScore?.id,
      },
    })

    return 'SUCCESS'
  } catch (err) {
    Sentry.captureException(err)
    return err
  }
}

export const searchNonPlayers = async ({ id, searchTerm, take = 20 }) => {
  let currentPlayers = await db.playerTournamentScore.findMany({
    where: { tournamentId: id },
  })

  let playerIds = []

  currentPlayers.forEach((player) => {
    if (player.playerId) playerIds.push(player.playerId)
  })

  let playerUserRole = await db.userRole.findUnique({
    where: { name: 'PLAYER' },
  })

  let nonSearchPlayers = await db.user.findMany({
    where: {
      AND: [
        {
          nickname: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          UserUserRole: {
            some: {
              userRoleId: { equals: playerUserRole.id },
            },
          },
        },
        {
          id: {
            notIn: playerIds,
          },
        },
      ],
    },
    take,
  })

  return nonSearchPlayers
}

const createMatches = async ({ proposedMatches, id, round }) => {
  //Create all matches
  await Promise.all(
    proposedMatches.map(async (proposedMatch) => {
      await createSingleMatch({
        proposedMatch,
        tournamentId: id,
        roundId: round.id,
      })
    })
  )
}

// ProposedMatch is an array with two playerTournamentIds
const createSingleMatch = async ({
  proposedMatch,
  tournamentId,
  roundId,
  tieBreaker = false,
}) => {
  const match = await db.match.create({
    data: {
      isTieBreakerMatch: tieBreaker,
      tournament: {
        connect: {
          id: tournamentId,
        },
      },
      round: {
        connect: {
          id: roundId,
        },
      },
    },
  })

  await Promise.all(
    proposedMatch.map(async (proposedPlayer) => {
      const player = await db.playerTournamentScore.findUnique({
        where: { id: proposedPlayer },
        include: { player: true },
      })

      const playerMatchScore = {
        data: {
          bye: proposedMatch.length === 1,
          playerName: player.playerName || player.player.nickname,
          match: {
            connect: {
              id: match.id,
            },
          },
        },
      }

      if (player.playerId) {
        playerMatchScore.data.user = {
          connect: {
            id: player.playerId,
          },
        }
      }

      await db.playerMatchScore.create({
        ...playerMatchScore,
      })

      if (proposedMatch.length === 1) {
        let playerTourneyScore = await db.playerTournamentScore.findFirst({
          where: {
            id: proposedPlayer,
            tournamentId,
          },
        })

        await db.playerTournamentScore.update({
          data: {
            byes: playerTourneyScore.byes + 1,
            score: playerTourneyScore.score + 1,
          },
          where: {
            id: playerTourneyScore.id,
          },
        })
      }
    })
  )
}

export const Tournament = {
  owner: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).owner(),
  store: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).store(),
  user: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).user(),
  nextCutoffTournament: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).nextCutoffTournament(),
  previousCutoffTournament: (_obj, { root }) =>
    db.tournament
      .findUnique({ where: { id: root.id } })
      .previousCutoffTournament(),
  matches: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).matches(),
  playerList: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).players(),
  players: (_obj, { root }) =>
    tournamentLeaderboardWithoutTies({ url: root.tournamentUrl }),
  winners: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).players({
      where: {
        wonTournament: true,
      },
    }),
  round: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).round(),
}
