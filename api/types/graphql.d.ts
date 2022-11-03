import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type AddPlayerInput = {
  byes?: InputMaybe<Scalars['Int']>;
  draws?: InputMaybe<Scalars['Int']>;
  losses?: InputMaybe<Scalars['Int']>;
  playerId?: InputMaybe<Scalars['String']>;
  playerName: Scalars['String'];
  score?: InputMaybe<Scalars['Float']>;
  wins?: InputMaybe<Scalars['Int']>;
};

export type Banner = {
  __typename?: 'Banner';
  active: Scalars['Boolean'];
  backgroundUrl: Scalars['String'];
  button1BackgroundColor?: Maybe<Scalars['String']>;
  button1Link?: Maybe<Scalars['String']>;
  button1Text?: Maybe<Scalars['String']>;
  button1TextColor?: Maybe<Scalars['String']>;
  button2BackgroundColor?: Maybe<Scalars['String']>;
  button2Link?: Maybe<Scalars['String']>;
  button2Text?: Maybe<Scalars['String']>;
  button2TextColor?: Maybe<Scalars['String']>;
  buttonsFontSize?: Maybe<Scalars['Int']>;
  buttonsHorizontalPlacement?: Maybe<Placement>;
  buttonsVerticalPlacement?: Maybe<Placement>;
  condition?: Maybe<BannerCondition>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  mainText?: Maybe<Scalars['String']>;
  mainTextColor?: Maybe<Scalars['String']>;
  mainTextFontSize?: Maybe<Scalars['Int']>;
  subText?: Maybe<Scalars['String']>;
  subTextColor?: Maybe<Scalars['String']>;
  subTextFontSize?: Maybe<Scalars['Int']>;
  textPlacement?: Maybe<Placement>;
  updatedAt: Scalars['DateTime'];
};

export type BannerCondition =
  | 'ALL'
  | 'EO'
  | 'GUEST'
  | 'LOGGEDIN'
  | 'PLAYER';

export type Contact = {
  __typename?: 'Contact';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userContact?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateBannerInput = {
  active: Scalars['Boolean'];
  backgroundUrl: Scalars['String'];
  button1BackgroundColor?: InputMaybe<Scalars['String']>;
  button1Link?: InputMaybe<Scalars['String']>;
  button1Text?: InputMaybe<Scalars['String']>;
  button1TextColor?: InputMaybe<Scalars['String']>;
  button2BackgroundColor?: InputMaybe<Scalars['String']>;
  button2Link?: InputMaybe<Scalars['String']>;
  button2Text?: InputMaybe<Scalars['String']>;
  button2TextColor?: InputMaybe<Scalars['String']>;
  buttonsFontSize?: InputMaybe<Scalars['Int']>;
  buttonsHorizontalPlacement?: InputMaybe<Placement>;
  buttonsVerticalPlacement?: InputMaybe<Placement>;
  condition?: InputMaybe<BannerCondition>;
  mainText?: InputMaybe<Scalars['String']>;
  mainTextColor?: InputMaybe<Scalars['String']>;
  mainTextFontSize?: InputMaybe<Scalars['Int']>;
  subText?: InputMaybe<Scalars['String']>;
  subTextColor?: InputMaybe<Scalars['String']>;
  subTextFontSize?: InputMaybe<Scalars['Int']>;
  textPlacement?: InputMaybe<Placement>;
};

export type CreateContactInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  text: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateMatchInput = {
  active: Scalars['Boolean'];
  roundId: Scalars['Int'];
  tournamentId: Scalars['Int'];
};

export type CreatePlayerMatchScoreInput = {
  active: Scalars['Boolean'];
  bye: Scalars['Boolean'];
  matchId: Scalars['Int'];
  playerName?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['String']>;
  wonMatch: Scalars['Boolean'];
};

export type CreatePlayerTournamentScoreInput = {
  active: Scalars['Boolean'];
  byes: Scalars['Int'];
  draws: Scalars['Int'];
  losses: Scalars['Int'];
  playerId?: InputMaybe<Scalars['String']>;
  playerName?: InputMaybe<Scalars['String']>;
  score: Scalars['Float'];
  tournamentId: Scalars['Int'];
  wins: Scalars['Int'];
  wonTournament: Scalars['Boolean'];
};

export type CreateRoundInput = {
  active: Scalars['Boolean'];
  roundNumber: Scalars['Int'];
  roundTimerLeftInSeconds?: InputMaybe<Scalars['Int']>;
  startingTimerInSeconds?: InputMaybe<Scalars['Int']>;
  tournamentId: Scalars['Int'];
};

export type CreateStoreInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  approvedOn?: InputMaybe<Scalars['DateTime']>;
  city: Scalars['String'];
  country: Scalars['String'];
  distributor: Scalars['String'];
  email: Scalars['String'];
  hidden?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  ownerId: Scalars['String'];
  phone: Scalars['String'];
  placeId?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  street1: Scalars['String'];
  street2?: InputMaybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type CreateTournamentInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dateEnded?: InputMaybe<Scalars['DateTime']>;
  dateStarted?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  infoUrl?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  locationName: Scalars['String'];
  maxPlayers: Scalars['Int'];
  name: Scalars['String'];
  ownerId?: InputMaybe<Scalars['String']>;
  publicRegistration?: InputMaybe<Scalars['Boolean']>;
  startDate: Scalars['DateTime'];
  startingTimerInSeconds?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Scalars['String']>;
  storeId?: InputMaybe<Scalars['String']>;
  street1?: InputMaybe<Scalars['String']>;
  street2?: InputMaybe<Scalars['String']>;
  timerLastUpdated?: InputMaybe<Scalars['DateTime']>;
  timerLeftInSeconds?: InputMaybe<Scalars['Int']>;
  timerStatus?: InputMaybe<TimerStatus>;
  tournamentUrl?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type CreateTournamentMatchInput = {
  proposedMatch: Array<Scalars['Int']>;
  roundId: Scalars['Int'];
  tournamentId: Scalars['Int'];
};

export type CreateUserInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  adminComments?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  disabledBy?: InputMaybe<Scalars['String']>;
  disabledOn?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: InputMaybe<Scalars['String']>;
  flags?: InputMaybe<Scalars['Int']>;
  gender?: InputMaybe<Scalars['String']>;
  howHeard?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['Int']>;
  lastname?: InputMaybe<Scalars['String']>;
  nickname: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
  state?: InputMaybe<Scalars['String']>;
  userPictureId?: InputMaybe<Scalars['Int']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type CreateUserPictureInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  smallUrl?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type CreateUserStoreInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  distributor: Scalars['String'];
  email: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
  zip: Scalars['String'];
};

export type CreateUserUserRoleInput = {
  active: Scalars['Boolean'];
  userId: Scalars['String'];
  userRoleId: Scalars['Int'];
};

export type Match = {
  __typename?: 'Match';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  players: Array<Maybe<PlayerMatchScore>>;
  round: Round;
  roundId: Scalars['Int'];
  tournament: Tournament;
  tournamentId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type MatchResult =
  | 'LOSS'
  | 'TIED'
  | 'WIN';

export type MatchScore = {
  playerMatchScoreId?: InputMaybe<Scalars['Int']>;
  playerName?: InputMaybe<Scalars['String']>;
  previousBye?: InputMaybe<Scalars['Boolean']>;
  result?: InputMaybe<MatchResult>;
  score?: InputMaybe<Scalars['Int']>;
  updatedPlayerName?: InputMaybe<Scalars['String']>;
  updatedUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMatchScore: Tournament;
  addPlayer: Tournament;
  advanceRound?: Maybe<Tournament>;
  cancelTournament: Tournament;
  createBanner: Banner;
  createContact: Contact;
  createCutoffTournament?: Maybe<Tournament>;
  createMatch: Match;
  createPlayerMatchScore: PlayerMatchScore;
  createPlayerTournamentScore: PlayerTournamentScore;
  createRound: Round;
  createStore: Store;
  createTieBreakerRound?: Maybe<Tournament>;
  createTournament: Tournament;
  createTournamentMatch: Tournament;
  createUser: User;
  createUserPicture: UserPicture;
  createUserUserRole: UserUserRole;
  deleteBanner: Banner;
  deleteContact: Contact;
  deleteMatch: Match;
  deletePlayerMatchScore: PlayerMatchScore;
  deletePlayerTournamentScore: PlayerTournamentScore;
  deleteRound: Round;
  deleteStore: Store;
  deleteTournament: Tournament;
  deleteTournamentMatch: Tournament;
  deleteUser: User;
  deleteUserPicture: UserPicture;
  deleteUserUserRole: UserUserRole;
  endTournament: Tournament;
  leaveTournament: Scalars['String'];
  registerForTournament: Tournament;
  removePlayer: Scalars['String'];
  seedSingleTournament?: Maybe<Tournament>;
  seedTournaments: Array<Maybe<Tournament>>;
  startTournament: Tournament;
  updateBanner: Banner;
  updateContact: Contact;
  updateMatch: Match;
  updateMatchScore: Tournament;
  updatePlayerMatchScore: PlayerMatchScore;
  updatePlayerTournamentScore: PlayerTournamentScore;
  updateRound: Round;
  updateStore: Store;
  updateTimer: Tournament;
  updateTournament: Tournament;
  updateUser: User;
  updateUserPicture: UserPicture;
  updateUserUserRole: UserUserRole;
};


export type MutationaddMatchScoreArgs = {
  input: TournamentMatchScoreInput;
};


export type MutationaddPlayerArgs = {
  id: Scalars['Int'];
  input: AddPlayerInput;
};


export type MutationadvanceRoundArgs = {
  id: Scalars['Int'];
  roundNumber: Scalars['Int'];
};


export type MutationcancelTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationcreateBannerArgs = {
  input: CreateBannerInput;
};


export type MutationcreateContactArgs = {
  input: CreateContactInput;
};


export type MutationcreateCutoffTournamentArgs = {
  cutOffRank: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationcreateMatchArgs = {
  input: CreateMatchInput;
};


export type MutationcreatePlayerMatchScoreArgs = {
  input: CreatePlayerMatchScoreInput;
};


export type MutationcreatePlayerTournamentScoreArgs = {
  input: CreatePlayerTournamentScoreInput;
};


export type MutationcreateRoundArgs = {
  input: CreateRoundInput;
};


export type MutationcreateStoreArgs = {
  input: CreateStoreInput;
};


export type MutationcreateTieBreakerRoundArgs = {
  id: Scalars['Int'];
};


export type MutationcreateTournamentArgs = {
  input: CreateTournamentInput;
};


export type MutationcreateTournamentMatchArgs = {
  input: CreateTournamentMatchInput;
};


export type MutationcreateUserArgs = {
  input: CreateUserInput;
  storeInput?: InputMaybe<CreateUserStoreInput>;
};


export type MutationcreateUserPictureArgs = {
  input: CreateUserPictureInput;
};


export type MutationcreateUserUserRoleArgs = {
  input: CreateUserUserRoleInput;
};


export type MutationdeleteBannerArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteContactArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteMatchArgs = {
  id: Scalars['Int'];
};


export type MutationdeletePlayerMatchScoreArgs = {
  id: Scalars['Int'];
};


export type MutationdeletePlayerTournamentScoreArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteRoundArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteStoreArgs = {
  id: Scalars['String'];
};


export type MutationdeleteTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteTournamentMatchArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationdeleteUserPictureArgs = {
  id: Scalars['Int'];
};


export type MutationdeleteUserUserRoleArgs = {
  id: Scalars['Int'];
};


export type MutationendTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationleaveTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationregisterForTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationremovePlayerArgs = {
  id: Scalars['Int'];
};


export type MutationseedSingleTournamentArgs = {
  id: Scalars['Int'];
  numPlayers?: InputMaybe<Scalars['Int']>;
};


export type MutationseedTournamentsArgs = {
  country?: InputMaybe<Scalars['String']>;
  numTournaments?: InputMaybe<Scalars['Int']>;
};


export type MutationstartTournamentArgs = {
  id: Scalars['Int'];
};


export type MutationupdateBannerArgs = {
  id: Scalars['Int'];
  input: UpdateBannerInput;
};


export type MutationupdateContactArgs = {
  id: Scalars['Int'];
  input: UpdateContactInput;
};


export type MutationupdateMatchArgs = {
  id: Scalars['Int'];
  input: UpdateMatchInput;
};


export type MutationupdateMatchScoreArgs = {
  input: TournamentMatchScoreInput;
};


export type MutationupdatePlayerMatchScoreArgs = {
  id: Scalars['Int'];
  input: UpdatePlayerMatchScoreInput;
};


export type MutationupdatePlayerTournamentScoreArgs = {
  id: Scalars['Int'];
  input: UpdatePlayerTournamentScoreInput;
};


export type MutationupdateRoundArgs = {
  id: Scalars['Int'];
  input: UpdateRoundInput;
};


export type MutationupdateStoreArgs = {
  id: Scalars['String'];
  input: UpdateStoreInput;
};


export type MutationupdateTimerArgs = {
  input: TimerInput;
};


export type MutationupdateTournamentArgs = {
  id: Scalars['Int'];
  input: UpdateTournamentInput;
};


export type MutationupdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};


export type MutationupdateUserPictureArgs = {
  id: Scalars['Int'];
  input: UpdateUserPictureInput;
};


export type MutationupdateUserUserRoleArgs = {
  id: Scalars['Int'];
  input: UpdateUserUserRoleInput;
};

export type OrderByInput = {
  orderByDirection?: InputMaybe<Scalars['String']>;
  orderByKey?: InputMaybe<Scalars['String']>;
};

export type PaginatedLeaderboard = {
  __typename?: 'PaginatedLeaderboard';
  leaderboard: Array<PlayerTournamentScore>;
  more?: Maybe<Scalars['Boolean']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaginatedStores = {
  __typename?: 'PaginatedStores';
  more?: Maybe<Scalars['Boolean']>;
  stores: Array<Store>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaginatedTournaments = {
  __typename?: 'PaginatedTournaments';
  more?: Maybe<Scalars['Boolean']>;
  totalCount?: Maybe<Scalars['Int']>;
  tournaments: Array<Tournament>;
};

export type Placement =
  | 'center'
  | 'end'
  | 'start';

export type PlayerMatchScore = {
  __typename?: 'PlayerMatchScore';
  active: Scalars['Boolean'];
  bye: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  match: Match;
  matchId: Scalars['Int'];
  playerName?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  wonMatch: Scalars['Boolean'];
};

export type PlayerTournamentScore = {
  __typename?: 'PlayerTournamentScore';
  active: Scalars['Boolean'];
  byes?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  didCorrectRank?: Maybe<Scalars['Boolean']>;
  draws?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  losses?: Maybe<Scalars['Int']>;
  matchWinPercentage?: Maybe<Scalars['Float']>;
  opponentsWinPercentage?: Maybe<Scalars['Float']>;
  player?: Maybe<User>;
  playerId?: Maybe<Scalars['String']>;
  playerName?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Float']>;
  tieBreakerWins?: Maybe<Scalars['Int']>;
  totalPoints?: Maybe<Scalars['Float']>;
  totalScore?: Maybe<Scalars['Float']>;
  totalTournamentsPlayed?: Maybe<Scalars['Int']>;
  tournament: Tournament;
  tournamentId: Scalars['Int'];
  tournamentWinPercentage?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  wins?: Maybe<Scalars['Int']>;
  wonTournament: Scalars['Boolean'];
};

export type Provider = {
  __typename?: 'Provider';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  activeStore: Store;
  activeStores: Array<Store>;
  banner?: Maybe<Banner>;
  banners: Array<Banner>;
  checkNickname: Scalars['Boolean'];
  contact?: Maybe<Contact>;
  contacts: Array<Contact>;
  currentTournaments: Array<Tournament>;
  finishedTournaments: Array<Tournament>;
  homeBanners: Array<Banner>;
  match?: Maybe<Match>;
  matches: Array<Match>;
  myTournaments: Array<Tournament>;
  playerLeaderboard?: Maybe<PaginatedLeaderboard>;
  playerMatchScore?: Maybe<PlayerMatchScore>;
  playerMatchScores: Array<PlayerMatchScore>;
  playerTournamentScore?: Maybe<PlayerTournamentScore>;
  playerTournamentScores: Array<PlayerTournamentScore>;
  redwood?: Maybe<Redwood>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  searchNonPlayers: Array<User>;
  searchTournaments: PaginatedTournaments;
  store?: Maybe<Store>;
  storeLocator: PaginatedStores;
  stores: Array<Store>;
  tournament?: Maybe<Tournament>;
  tournamentByUrl?: Maybe<Tournament>;
  tournamentLeaderboardWithoutTies?: Maybe<Array<PlayerTournamentScore>>;
  tournamentPlayers?: Maybe<Array<PlayerTournamentScore>>;
  tournaments: Array<Tournament>;
  upcomingTournaments: Array<Tournament>;
  user?: Maybe<User>;
  userPicture?: Maybe<UserPicture>;
  userPictures: Array<UserPicture>;
  userUserRole?: Maybe<UserUserRole>;
  userUserRoles: Array<UserUserRole>;
  users: Array<User>;
};


export type QueryactiveStoreArgs = {
  id: Scalars['String'];
};


export type QueryactiveStoresArgs = {
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QuerybannerArgs = {
  id: Scalars['Int'];
};


export type QuerycheckNicknameArgs = {
  nickname?: InputMaybe<Scalars['String']>;
};


export type QuerycontactArgs = {
  id: Scalars['Int'];
};


export type QuerycurrentTournamentsArgs = {
  input?: InputMaybe<SearchTournamentInput>;
};


export type QueryfinishedTournamentsArgs = {
  input?: InputMaybe<SearchTournamentInput>;
};


export type QuerymatchArgs = {
  id: Scalars['Int'];
};


export type QueryplayerLeaderboardArgs = {
  nicknameSearch?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryplayerMatchScoreArgs = {
  id: Scalars['Int'];
};


export type QueryplayerTournamentScoreArgs = {
  id: Scalars['Int'];
};


export type QueryroundArgs = {
  id: Scalars['Int'];
};


export type QuerysearchNonPlayersArgs = {
  id: Scalars['Int'];
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QuerysearchTournamentsArgs = {
  input: SearchTournamentInput;
};


export type QuerystoreArgs = {
  id: Scalars['String'];
};


export type QuerystoreLocatorArgs = {
  input: SearchStoresInput;
};


export type QuerystoresArgs = {
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QuerytournamentArgs = {
  id: Scalars['Int'];
};


export type QuerytournamentByUrlArgs = {
  url?: InputMaybe<Scalars['String']>;
};


export type QuerytournamentLeaderboardWithoutTiesArgs = {
  url?: InputMaybe<Scalars['String']>;
};


export type QuerytournamentPlayersArgs = {
  searchTerm?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};


export type QuerytournamentsArgs = {
  orderBy?: InputMaybe<OrderByInput>;
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QueryupcomingTournamentsArgs = {
  input?: InputMaybe<SearchTournamentInput>;
};


export type QueryuserArgs = {
  id: Scalars['String'];
};


export type QueryuserPictureArgs = {
  id: Scalars['Int'];
};


export type QueryuserUserRoleArgs = {
  id: Scalars['Int'];
};


export type QueryusersArgs = {
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type Redwood = {
  __typename?: 'Redwood';
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type Role =
  | 'EO'
  | 'PLAYER';

export type Round = {
  __typename?: 'Round';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isTieBreakerRound?: Maybe<Scalars['Boolean']>;
  matches: Array<Maybe<Match>>;
  roundNumber: Scalars['Int'];
  roundTimerLeftInSeconds?: Maybe<Scalars['Int']>;
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  tournament: Tournament;
  tournamentId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type SearchStoresInput = {
  distance?: InputMaybe<Scalars['Int']>;
  includeOnline?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type SearchTournamentInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dateEnd?: InputMaybe<Scalars['Date']>;
  dateStart?: InputMaybe<Scalars['Date']>;
  distance?: InputMaybe<Scalars['Int']>;
  finishedTournaments?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  openSpotsOnly?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Scalars['String']>;
  store?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Store = {
  __typename?: 'Store';
  approved?: Maybe<Scalars['Boolean']>;
  approvedBy?: Maybe<User>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  approverId?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  distributor?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  tournaments: Array<Maybe<Tournament>>;
  website?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type TimerInput = {
  startingTimerInSeconds?: InputMaybe<Scalars['Int']>;
  timerLeftInSeconds?: InputMaybe<Scalars['Int']>;
  timerStatus: TimerStatus;
  tournamentId: Scalars['Int'];
};

export type TimerStatus =
  | 'INPROGRESS'
  | 'PAUSED'
  | 'PENDING'
  | 'STOPPED';

export type Tournament = {
  __typename?: 'Tournament';
  active: Scalars['Boolean'];
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateEnded?: Maybe<Scalars['DateTime']>;
  dateStarted?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  infoUrl?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  locationName: Scalars['String'];
  matches: Array<Maybe<Match>>;
  maxPlayers: Scalars['Int'];
  name: Scalars['String'];
  nextCutoffTournament?: Maybe<Tournament>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']>;
  playerCount?: Maybe<Scalars['Int']>;
  playerList?: Maybe<Array<Maybe<PlayerTournamentScore>>>;
  players: Array<Maybe<PlayerTournamentScore>>;
  previousCutoffTournament?: Maybe<Tournament>;
  publicRegistration?: Maybe<Scalars['Boolean']>;
  round: Array<Maybe<Round>>;
  startDate: Scalars['DateTime'];
  startingTimerInSeconds?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  storeId?: Maybe<Scalars['String']>;
  street1?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  timerLastUpdated?: Maybe<Scalars['DateTime']>;
  timerLeftInSeconds?: Maybe<Scalars['Int']>;
  timerStatus?: Maybe<TimerStatus>;
  tournamentUrl: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  winners?: Maybe<Array<Maybe<PlayerTournamentScore>>>;
  zip?: Maybe<Scalars['String']>;
};

export type TournamentMatchScoreInput = {
  matchId: Scalars['Int'];
  matches: Array<InputMaybe<MatchScore>>;
};

export type UpdateBannerInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  backgroundUrl?: InputMaybe<Scalars['String']>;
  button1BackgroundColor?: InputMaybe<Scalars['String']>;
  button1Link?: InputMaybe<Scalars['String']>;
  button1Text?: InputMaybe<Scalars['String']>;
  button1TextColor?: InputMaybe<Scalars['String']>;
  button2BackgroundColor?: InputMaybe<Scalars['String']>;
  button2Link?: InputMaybe<Scalars['String']>;
  button2Text?: InputMaybe<Scalars['String']>;
  button2TextColor?: InputMaybe<Scalars['String']>;
  buttonsFontSize?: InputMaybe<Scalars['Int']>;
  buttonsHorizontalPlacement?: InputMaybe<Placement>;
  buttonsVerticalPlacement?: InputMaybe<Placement>;
  condition?: InputMaybe<BannerCondition>;
  mainText?: InputMaybe<Scalars['String']>;
  mainTextColor?: InputMaybe<Scalars['String']>;
  mainTextFontSize?: InputMaybe<Scalars['Int']>;
  subText?: InputMaybe<Scalars['String']>;
  subTextColor?: InputMaybe<Scalars['String']>;
  subTextFontSize?: InputMaybe<Scalars['Int']>;
  textPlacement?: InputMaybe<Placement>;
};

export type UpdateContactInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateMatchInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  roundId?: InputMaybe<Scalars['Int']>;
  tournamentId?: InputMaybe<Scalars['Int']>;
};

export type UpdatePlayerMatchScoreInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  bye?: InputMaybe<Scalars['Boolean']>;
  matchId?: InputMaybe<Scalars['Int']>;
  playerName?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['String']>;
  wonMatch?: InputMaybe<Scalars['Boolean']>;
};

export type UpdatePlayerTournamentScoreInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  byes?: InputMaybe<Scalars['Int']>;
  draws?: InputMaybe<Scalars['Int']>;
  losses?: InputMaybe<Scalars['Int']>;
  playerId?: InputMaybe<Scalars['String']>;
  playerName?: InputMaybe<Scalars['String']>;
  score?: InputMaybe<Scalars['Float']>;
  tournamentId?: InputMaybe<Scalars['Int']>;
  wins?: InputMaybe<Scalars['Int']>;
  wonTournament?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateRoundInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  roundNumber?: InputMaybe<Scalars['Int']>;
  roundTimerLeftInSeconds?: InputMaybe<Scalars['Int']>;
  startingTimerInSeconds?: InputMaybe<Scalars['Int']>;
  tournamentId?: InputMaybe<Scalars['Int']>;
};

export type UpdateStoreInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  approvedOn?: InputMaybe<Scalars['DateTime']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  distributor?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  placeId?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street1?: InputMaybe<Scalars['String']>;
  street2?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type UpdateTournamentInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dateEnded?: InputMaybe<Scalars['DateTime']>;
  dateStarted?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  infoUrl?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  locationName?: InputMaybe<Scalars['String']>;
  maxPlayers?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  ownerId?: InputMaybe<Scalars['String']>;
  publicRegistration?: InputMaybe<Scalars['Boolean']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  startingTimerInSeconds?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Scalars['String']>;
  storeId?: InputMaybe<Scalars['String']>;
  street1?: InputMaybe<Scalars['String']>;
  street2?: InputMaybe<Scalars['String']>;
  timerLastUpdated?: InputMaybe<Scalars['DateTime']>;
  timerLeftInSeconds?: InputMaybe<Scalars['Int']>;
  timerStatus?: InputMaybe<TimerStatus>;
  tournamentUrl?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  adminComments?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  disabledBy?: InputMaybe<Scalars['String']>;
  disabledOn?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  flags?: InputMaybe<Scalars['Int']>;
  gender?: InputMaybe<Scalars['String']>;
  howHeard?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['Int']>;
  lastname?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  userPictureId?: InputMaybe<Scalars['Int']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPictureInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  smallUrl?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateUserUserRoleInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['String']>;
  userRoleId?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  Contact: Array<Maybe<Contact>>;
  Store: Array<Maybe<Store>>;
  Tournament: Array<Maybe<Tournament>>;
  UserUserRole: Array<Maybe<UserUserRole>>;
  active: Scalars['Boolean'];
  adminComments?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  disabled: Scalars['Boolean'];
  disabledBy?: Maybe<Scalars['String']>;
  disabledOn?: Maybe<Scalars['DateTime']>;
  dob?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  flags: Scalars['Int'];
  gender?: Maybe<Scalars['String']>;
  howHeard?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  matches: Array<Maybe<PlayerMatchScore>>;
  nickname: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<UserPicture>;
  providers: Array<Maybe<Provider>>;
  state?: Maybe<Scalars['String']>;
  tournamentsOwned: Array<Maybe<Tournament>>;
  tournamentsPlayed: Array<Maybe<PlayerTournamentScore>>;
  updatedAt: Scalars['DateTime'];
  userPictureId?: Maybe<Scalars['Int']>;
  zip?: Maybe<Scalars['String']>;
};

export type UserPicture = {
  __typename?: 'UserPicture';
  active?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  smallUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user: Array<Maybe<User>>;
};

export type UserRole = {
  __typename?: 'UserRole';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type UserUserRole = {
  __typename?: 'UserUserRole';
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
  userRole: UserRole;
  userRoleId: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddPlayerInput: AddPlayerInput;
  Banner: ResolverTypeWrapper<Banner>;
  BannerCondition: BannerCondition;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Contact: ResolverTypeWrapper<Contact>;
  CreateBannerInput: CreateBannerInput;
  CreateContactInput: CreateContactInput;
  CreateMatchInput: CreateMatchInput;
  CreatePlayerMatchScoreInput: CreatePlayerMatchScoreInput;
  CreatePlayerTournamentScoreInput: CreatePlayerTournamentScoreInput;
  CreateRoundInput: CreateRoundInput;
  CreateStoreInput: CreateStoreInput;
  CreateTournamentInput: CreateTournamentInput;
  CreateTournamentMatchInput: CreateTournamentMatchInput;
  CreateUserInput: CreateUserInput;
  CreateUserPictureInput: CreateUserPictureInput;
  CreateUserStoreInput: CreateUserStoreInput;
  CreateUserUserRoleInput: CreateUserUserRoleInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Match: ResolverTypeWrapper<Match>;
  MatchResult: MatchResult;
  MatchScore: MatchScore;
  Mutation: ResolverTypeWrapper<{}>;
  OrderByInput: OrderByInput;
  PaginatedLeaderboard: ResolverTypeWrapper<PaginatedLeaderboard>;
  PaginatedStores: ResolverTypeWrapper<PaginatedStores>;
  PaginatedTournaments: ResolverTypeWrapper<PaginatedTournaments>;
  Placement: Placement;
  PlayerMatchScore: ResolverTypeWrapper<PlayerMatchScore>;
  PlayerTournamentScore: ResolverTypeWrapper<PlayerTournamentScore>;
  Provider: ResolverTypeWrapper<Provider>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  Role: Role;
  Round: ResolverTypeWrapper<Round>;
  SearchStoresInput: SearchStoresInput;
  SearchTournamentInput: SearchTournamentInput;
  Store: ResolverTypeWrapper<Store>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimerInput: TimerInput;
  TimerStatus: TimerStatus;
  Tournament: ResolverTypeWrapper<Tournament>;
  TournamentMatchScoreInput: TournamentMatchScoreInput;
  UpdateBannerInput: UpdateBannerInput;
  UpdateContactInput: UpdateContactInput;
  UpdateMatchInput: UpdateMatchInput;
  UpdatePlayerMatchScoreInput: UpdatePlayerMatchScoreInput;
  UpdatePlayerTournamentScoreInput: UpdatePlayerTournamentScoreInput;
  UpdateRoundInput: UpdateRoundInput;
  UpdateStoreInput: UpdateStoreInput;
  UpdateTournamentInput: UpdateTournamentInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPictureInput: UpdateUserPictureInput;
  UpdateUserUserRoleInput: UpdateUserUserRoleInput;
  User: ResolverTypeWrapper<User>;
  UserPicture: ResolverTypeWrapper<UserPicture>;
  UserRole: ResolverTypeWrapper<UserRole>;
  UserUserRole: ResolverTypeWrapper<UserUserRole>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddPlayerInput: AddPlayerInput;
  Banner: Banner;
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  Contact: Contact;
  CreateBannerInput: CreateBannerInput;
  CreateContactInput: CreateContactInput;
  CreateMatchInput: CreateMatchInput;
  CreatePlayerMatchScoreInput: CreatePlayerMatchScoreInput;
  CreatePlayerTournamentScoreInput: CreatePlayerTournamentScoreInput;
  CreateRoundInput: CreateRoundInput;
  CreateStoreInput: CreateStoreInput;
  CreateTournamentInput: CreateTournamentInput;
  CreateTournamentMatchInput: CreateTournamentMatchInput;
  CreateUserInput: CreateUserInput;
  CreateUserPictureInput: CreateUserPictureInput;
  CreateUserStoreInput: CreateUserStoreInput;
  CreateUserUserRoleInput: CreateUserUserRoleInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Match: Match;
  MatchScore: MatchScore;
  Mutation: {};
  OrderByInput: OrderByInput;
  PaginatedLeaderboard: PaginatedLeaderboard;
  PaginatedStores: PaginatedStores;
  PaginatedTournaments: PaginatedTournaments;
  PlayerMatchScore: PlayerMatchScore;
  PlayerTournamentScore: PlayerTournamentScore;
  Provider: Provider;
  Query: {};
  Redwood: Redwood;
  Round: Round;
  SearchStoresInput: SearchStoresInput;
  SearchTournamentInput: SearchTournamentInput;
  Store: Store;
  String: Scalars['String'];
  Time: Scalars['Time'];
  TimerInput: TimerInput;
  Tournament: Tournament;
  TournamentMatchScoreInput: TournamentMatchScoreInput;
  UpdateBannerInput: UpdateBannerInput;
  UpdateContactInput: UpdateContactInput;
  UpdateMatchInput: UpdateMatchInput;
  UpdatePlayerMatchScoreInput: UpdatePlayerMatchScoreInput;
  UpdatePlayerTournamentScoreInput: UpdatePlayerTournamentScoreInput;
  UpdateRoundInput: UpdateRoundInput;
  UpdateStoreInput: UpdateStoreInput;
  UpdateTournamentInput: UpdateTournamentInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPictureInput: UpdateUserPictureInput;
  UpdateUserUserRoleInput: UpdateUserUserRoleInput;
  User: User;
  UserPicture: UserPicture;
  UserRole: UserRole;
  UserUserRole: UserUserRole;
};

export type adminOnlyDirectiveArgs = { };

export type adminOnlyDirectiveResolver<Result, Parent, ContextType = any, Args = adminOnlyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type requireAuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type requireAuthDirectiveResolver<Result, Parent, ContextType = any, Args = requireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type skipAuthDirectiveArgs = { };

export type skipAuthDirectiveResolver<Result, Parent, ContextType = any, Args = skipAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BannerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Banner'] = ResolversParentTypes['Banner']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  backgroundUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  button1BackgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1Link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1Text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button1TextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2BackgroundColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2Link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2Text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  button2TextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  buttonsFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  buttonsHorizontalPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  buttonsVerticalPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['BannerCondition']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mainText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainTextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mainTextFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTextColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTextFontSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  textPlacement?: Resolver<Maybe<ResolversTypes['Placement']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userContact?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JSONObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Match'] = ResolversParentTypes['Match']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['PlayerMatchScore']>>, ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  roundId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMatchScore?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationaddMatchScoreArgs, 'input'>>;
  addPlayer?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationaddPlayerArgs, 'id' | 'input'>>;
  advanceRound?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<MutationadvanceRoundArgs, 'id' | 'roundNumber'>>;
  cancelTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationcancelTournamentArgs, 'id'>>;
  createBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationcreateBannerArgs, 'input'>>;
  createContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationcreateContactArgs, 'input'>>;
  createCutoffTournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<MutationcreateCutoffTournamentArgs, 'cutOffRank' | 'id'>>;
  createMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationcreateMatchArgs, 'input'>>;
  createPlayerMatchScore?: Resolver<ResolversTypes['PlayerMatchScore'], ParentType, ContextType, RequireFields<MutationcreatePlayerMatchScoreArgs, 'input'>>;
  createPlayerTournamentScore?: Resolver<ResolversTypes['PlayerTournamentScore'], ParentType, ContextType, RequireFields<MutationcreatePlayerTournamentScoreArgs, 'input'>>;
  createRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationcreateRoundArgs, 'input'>>;
  createStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationcreateStoreArgs, 'input'>>;
  createTieBreakerRound?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<MutationcreateTieBreakerRoundArgs, 'id'>>;
  createTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationcreateTournamentArgs, 'input'>>;
  createTournamentMatch?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationcreateTournamentMatchArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'input'>>;
  createUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationcreateUserPictureArgs, 'input'>>;
  createUserUserRole?: Resolver<ResolversTypes['UserUserRole'], ParentType, ContextType, RequireFields<MutationcreateUserUserRoleArgs, 'input'>>;
  deleteBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationdeleteBannerArgs, 'id'>>;
  deleteContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationdeleteContactArgs, 'id'>>;
  deleteMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationdeleteMatchArgs, 'id'>>;
  deletePlayerMatchScore?: Resolver<ResolversTypes['PlayerMatchScore'], ParentType, ContextType, RequireFields<MutationdeletePlayerMatchScoreArgs, 'id'>>;
  deletePlayerTournamentScore?: Resolver<ResolversTypes['PlayerTournamentScore'], ParentType, ContextType, RequireFields<MutationdeletePlayerTournamentScoreArgs, 'id'>>;
  deleteRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationdeleteRoundArgs, 'id'>>;
  deleteStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationdeleteStoreArgs, 'id'>>;
  deleteTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationdeleteTournamentArgs, 'id'>>;
  deleteTournamentMatch?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationdeleteTournamentMatchArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationdeleteUserArgs, 'id'>>;
  deleteUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationdeleteUserPictureArgs, 'id'>>;
  deleteUserUserRole?: Resolver<ResolversTypes['UserUserRole'], ParentType, ContextType, RequireFields<MutationdeleteUserUserRoleArgs, 'id'>>;
  endTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationendTournamentArgs, 'id'>>;
  leaveTournament?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationleaveTournamentArgs, 'id'>>;
  registerForTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationregisterForTournamentArgs, 'id'>>;
  removePlayer?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationremovePlayerArgs, 'id'>>;
  seedSingleTournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<MutationseedSingleTournamentArgs, 'id'>>;
  seedTournaments?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType, Partial<MutationseedTournamentsArgs>>;
  startTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationstartTournamentArgs, 'id'>>;
  updateBanner?: Resolver<ResolversTypes['Banner'], ParentType, ContextType, RequireFields<MutationupdateBannerArgs, 'id' | 'input'>>;
  updateContact?: Resolver<ResolversTypes['Contact'], ParentType, ContextType, RequireFields<MutationupdateContactArgs, 'id' | 'input'>>;
  updateMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationupdateMatchArgs, 'id' | 'input'>>;
  updateMatchScore?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationupdateMatchScoreArgs, 'input'>>;
  updatePlayerMatchScore?: Resolver<ResolversTypes['PlayerMatchScore'], ParentType, ContextType, RequireFields<MutationupdatePlayerMatchScoreArgs, 'id' | 'input'>>;
  updatePlayerTournamentScore?: Resolver<ResolversTypes['PlayerTournamentScore'], ParentType, ContextType, RequireFields<MutationupdatePlayerTournamentScoreArgs, 'id' | 'input'>>;
  updateRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationupdateRoundArgs, 'id' | 'input'>>;
  updateStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<MutationupdateStoreArgs, 'id' | 'input'>>;
  updateTimer?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationupdateTimerArgs, 'input'>>;
  updateTournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType, RequireFields<MutationupdateTournamentArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationupdateUserArgs, 'id' | 'input'>>;
  updateUserPicture?: Resolver<ResolversTypes['UserPicture'], ParentType, ContextType, RequireFields<MutationupdateUserPictureArgs, 'id' | 'input'>>;
  updateUserUserRole?: Resolver<ResolversTypes['UserUserRole'], ParentType, ContextType, RequireFields<MutationupdateUserUserRoleArgs, 'id' | 'input'>>;
};

export type PaginatedLeaderboardResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedLeaderboard'] = ResolversParentTypes['PaginatedLeaderboard']> = {
  leaderboard?: Resolver<Array<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType>;
  more?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedStoresResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedStores'] = ResolversParentTypes['PaginatedStores']> = {
  more?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedTournamentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedTournaments'] = ResolversParentTypes['PaginatedTournaments']> = {
  more?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerMatchScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerMatchScore'] = ResolversParentTypes['PlayerMatchScore']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bye?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  match?: Resolver<ResolversTypes['Match'], ParentType, ContextType>;
  matchId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wonMatch?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerTournamentScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerTournamentScore'] = ResolversParentTypes['PlayerTournamentScore']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  byes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  didCorrectRank?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  draws?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  losses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  matchWinPercentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  opponentsWinPercentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  player?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  playerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  tieBreakerWins?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalPoints?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalTournamentsPlayed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tournamentWinPercentage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  wins?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  wonTournament?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProviderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Provider'] = ResolversParentTypes['Provider']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activeStore?: Resolver<ResolversTypes['Store'], ParentType, ContextType, RequireFields<QueryactiveStoreArgs, 'id'>>;
  activeStores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType, Partial<QueryactiveStoresArgs>>;
  banner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<QuerybannerArgs, 'id'>>;
  banners?: Resolver<Array<ResolversTypes['Banner']>, ParentType, ContextType>;
  checkNickname?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, Partial<QuerycheckNicknameArgs>>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QuerycontactArgs, 'id'>>;
  contacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType>;
  currentTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, Partial<QuerycurrentTournamentsArgs>>;
  finishedTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, Partial<QueryfinishedTournamentsArgs>>;
  homeBanners?: Resolver<Array<ResolversTypes['Banner']>, ParentType, ContextType>;
  match?: Resolver<Maybe<ResolversTypes['Match']>, ParentType, ContextType, RequireFields<QuerymatchArgs, 'id'>>;
  matches?: Resolver<Array<ResolversTypes['Match']>, ParentType, ContextType>;
  myTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType>;
  playerLeaderboard?: Resolver<Maybe<ResolversTypes['PaginatedLeaderboard']>, ParentType, ContextType, Partial<QueryplayerLeaderboardArgs>>;
  playerMatchScore?: Resolver<Maybe<ResolversTypes['PlayerMatchScore']>, ParentType, ContextType, RequireFields<QueryplayerMatchScoreArgs, 'id'>>;
  playerMatchScores?: Resolver<Array<ResolversTypes['PlayerMatchScore']>, ParentType, ContextType>;
  playerTournamentScore?: Resolver<Maybe<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType, RequireFields<QueryplayerTournamentScoreArgs, 'id'>>;
  playerTournamentScores?: Resolver<Array<ResolversTypes['PlayerTournamentScore']>, ParentType, ContextType>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  round?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryroundArgs, 'id'>>;
  rounds?: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType>;
  searchNonPlayers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerysearchNonPlayersArgs, 'id'>>;
  searchTournaments?: Resolver<ResolversTypes['PaginatedTournaments'], ParentType, ContextType, RequireFields<QuerysearchTournamentsArgs, 'input'>>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QuerystoreArgs, 'id'>>;
  storeLocator?: Resolver<ResolversTypes['PaginatedStores'], ParentType, ContextType, RequireFields<QuerystoreLocatorArgs, 'input'>>;
  stores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType, Partial<QuerystoresArgs>>;
  tournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, RequireFields<QuerytournamentArgs, 'id'>>;
  tournamentByUrl?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType, Partial<QuerytournamentByUrlArgs>>;
  tournamentLeaderboardWithoutTies?: Resolver<Maybe<Array<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType, Partial<QuerytournamentLeaderboardWithoutTiesArgs>>;
  tournamentPlayers?: Resolver<Maybe<Array<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType, RequireFields<QuerytournamentPlayersArgs, 'url'>>;
  tournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, Partial<QuerytournamentsArgs>>;
  upcomingTournaments?: Resolver<Array<ResolversTypes['Tournament']>, ParentType, ContextType, Partial<QueryupcomingTournamentsArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  userPicture?: Resolver<Maybe<ResolversTypes['UserPicture']>, ParentType, ContextType, RequireFields<QueryuserPictureArgs, 'id'>>;
  userPictures?: Resolver<Array<ResolversTypes['UserPicture']>, ParentType, ContextType>;
  userUserRole?: Resolver<Maybe<ResolversTypes['UserUserRole']>, ParentType, ContextType, RequireFields<QueryuserUserRoleArgs, 'id'>>;
  userUserRoles?: Resolver<Array<ResolversTypes['UserUserRole']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryusersArgs>>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isTieBreakerRound?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['Match']>>, ParentType, ContextType>;
  roundNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundTimerLeftInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startingTimerInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tournament?: Resolver<ResolversTypes['Tournament'], ParentType, ContextType>;
  tournamentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  approved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  approvedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  approvedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  approverId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  distributor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tournaments?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type TournamentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tournament'] = ResolversParentTypes['Tournament']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dateEnded?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateStarted?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  infoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  locationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['Match']>>, ParentType, ContextType>;
  maxPlayers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nextCutoffTournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  playerList?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>>, ParentType, ContextType>;
  players?: Resolver<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType>;
  previousCutoffTournament?: Resolver<Maybe<ResolversTypes['Tournament']>, ParentType, ContextType>;
  publicRegistration?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  round?: Resolver<Array<Maybe<ResolversTypes['Round']>>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  startingTimerInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  storeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timerLastUpdated?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  timerLeftInSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timerStatus?: Resolver<Maybe<ResolversTypes['TimerStatus']>, ParentType, ContextType>;
  tournamentUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  winners?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  Contact?: Resolver<Array<Maybe<ResolversTypes['Contact']>>, ParentType, ContextType>;
  Store?: Resolver<Array<Maybe<ResolversTypes['Store']>>, ParentType, ContextType>;
  Tournament?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  UserUserRole?: Resolver<Array<Maybe<ResolversTypes['UserUserRole']>>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  adminComments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  disabledBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disabledOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flags?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  howHeard?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  matches?: Resolver<Array<Maybe<ResolversTypes['PlayerMatchScore']>>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['UserPicture']>, ParentType, ContextType>;
  providers?: Resolver<Array<Maybe<ResolversTypes['Provider']>>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tournamentsOwned?: Resolver<Array<Maybe<ResolversTypes['Tournament']>>, ParentType, ContextType>;
  tournamentsPlayed?: Resolver<Array<Maybe<ResolversTypes['PlayerTournamentScore']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userPictureId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPictureResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPicture'] = ResolversParentTypes['UserPicture']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  smallUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserUserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserUserRole'] = ResolversParentTypes['UserUserRole']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userRole?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  userRoleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Banner?: BannerResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Contact?: ContactResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Match?: MatchResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedLeaderboard?: PaginatedLeaderboardResolvers<ContextType>;
  PaginatedStores?: PaginatedStoresResolvers<ContextType>;
  PaginatedTournaments?: PaginatedTournamentsResolvers<ContextType>;
  PlayerMatchScore?: PlayerMatchScoreResolvers<ContextType>;
  PlayerTournamentScore?: PlayerTournamentScoreResolvers<ContextType>;
  Provider?: ProviderResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
  Round?: RoundResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Tournament?: TournamentResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPicture?: UserPictureResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  UserUserRole?: UserUserRoleResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  adminOnly?: adminOnlyDirectiveResolver<any, any, ContextType>;
  requireAuth?: requireAuthDirectiveResolver<any, any, ContextType>;
  skipAuth?: skipAuthDirectiveResolver<any, any, ContextType>;
};
