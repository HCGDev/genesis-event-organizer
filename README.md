# GEO

## About
GEO (Genesis Event Organizer - https://geo.genesisbattleofchampions.com/) is a tournament tracking webapp for Genesis Battle of Champions (https://www.genesisbattleofchampions.com/). It tracks tournaments, stores, and players across the world.
## Stack
Geo is built using Redwood.js (https://redwoodjs.com/) using primarily, React, Prisma, and Graphql with a NodeJS backend. This repo is not setup currently with Typescript, and testing/storybooking is limited.

## Setup
- Install Prisma
- Setup your Postgres database
- Setup a firebase account with Authentication
- Setup your Mailgun account and grab the API Key from there
- Install Dependencies
- Take a look at `env.example` for an idea of which env variables you'll need to provide

## Deployment
GEO is currently deployed on Netlify (https://www.netlify.com/) with the Database being hosted on Railway (https://railway.app/). We also use Firebase for authentication across the various environments.

## Things to Improve
- Use Typescript
- Update RedwoodJS (Currently on a version less than 1.0, 0.48)
- Add better testing


## Notable Issues
- First load can be quite slow
- The first request seems to make the request twice once firebase data is loaded in
