import { Router, Route, Set, Private } from '@redwoodjs/router'
import UserUserRolesLayout from 'src/layouts/UserUserRolesLayout'
import PlayerMatchScoresLayout from 'src/layouts/PlayerMatchScoresLayout'
import MatchesLayout from 'src/layouts/MatchesLayout'
import PlayerTournamentScoresLayout from 'src/layouts/PlayerTournamentScoresLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={[MainLayout]}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup/{type:String}" page={SignupPage} name="signup" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/user-contact" page={UserContactPage} name="userContact" />
        <Route path="/store/{storeId:String}" page={ViewStorePage} name="viewStore" />
        <Route path="/store-locator" page={StoreLocatorPage} name="storeLocator" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/tournament/{url}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/tournament/{url}/{tab}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/tournament/{url}/{tab}/{tabOptions:Int}" page={ViewTournamentPage} name="viewTournament" />
        <Route path="/search" page={TournamentSearchPage} name="tournamentSearch" />
        <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
        <Private unauthenticated="login">
          <Route path="/settings" page={SettingsPage} name="settings" />
          <Route path="/settings/{tab:String}" page={SettingsPage} name="settings" />
        </Private>
        <Private unauthenticated="login" role="EO">
          <Route path="/store-pending" page={StorePendingPage} name="storePending" />
        </Private>
        <Private unauthenticated="login" role={['EO', 'ADMIN']}>
          <Route path="/create-tournament" page={CreateTournamentPage} name="createTournament" />
          <Route path="/edit-tournament/{url}" page={EoEditTournamentPage} name="eoEditTournament" />
        </Private>
        <Route notfound page={NotFoundPage} />
      </Set>
      <Set wrap={[MainLayout, AdminLayout]}>
        <Private unauthenticated="login" role={['ADMIN']}>
          <Route path="/admin" page={AdminPage} name="admin" />
          <Route path="/admin/users/new" page={NewUserPage} name="newUser" />
          <Route path="/admin/users/{id}/edit" page={EditUserPage} name="editUser" />
          <Route path="/admin/users/{id}" page={UserPage} name="user" />
          <Route path="/admin/users" page={UsersPage} name="users" />
          <Set wrap={UserUserRolesLayout}>
            <Route path="/admin/user-user-roles/new" page={UserUserRoleNewUserUserRolePage} name="newUserUserRole" />
            <Route path="/admin/user-user-roles/{id:Int}/edit" page={UserUserRoleEditUserUserRolePage} name="editUserUserRole" />
            <Route path="/admin/user-user-roles/{id:Int}" page={UserUserRoleUserUserRolePage} name="userUserRole" />
            <Route path="/admin/user-user-roles" page={UserUserRoleUserUserRolesPage} name="userUserRoles" />
          </Set>
          <Route path="/admin/stores/new" page={NewStorePage} name="newStore" />
          <Route path="/admin/stores/{id}/edit" page={EditStorePage} name="editStore" />
          <Route path="/admin/stores/{id}" page={StorePage} name="store" />
          <Route path="/admin/stores" page={StoresPage} name="stores" />
          <Route path="/admin/tournaments/new" page={NewTournamentPage} name="newTournament" />
          <Route path="/admin/tournaments/{id:Int}/edit" page={EditTournamentPage} name="editTournament" />
          <Route path="/admin/tournaments/{id:Int}" page={TournamentPage} name="tournament" />
          <Route path="/admin/tournaments" page={TournamentsPage} name="tournaments" />
          <Set wrap={PlayerTournamentScoresLayout}>
            <Route path="/admin/player-tournament-scores/new" page={PlayerTournamentScoreNewPlayerTournamentScorePage} name="newPlayerTournamentScore" />
            <Route path="/admin/player-tournament-scores/{id:Int}/edit" page={PlayerTournamentScoreEditPlayerTournamentScorePage} name="editPlayerTournamentScore" />
            <Route path="/admin/player-tournament-scores/{id:Int}" page={PlayerTournamentScorePlayerTournamentScorePage} name="playerTournamentScore" />
            <Route path="/admin/player-tournament-scores" page={PlayerTournamentScorePlayerTournamentScoresPage} name="playerTournamentScores" />
          </Set>

          <Set wrap={PlayerMatchScoresLayout}>
            <Route path="/admin/player-match-scores/new" page={PlayerMatchScoreNewPlayerMatchScorePage} name="newPlayerMatchScore" />
            <Route path="/admin/player-match-scores/{id:Int}/edit" page={PlayerMatchScoreEditPlayerMatchScorePage} name="editPlayerMatchScore" />
            <Route path="/admin/player-match-scores/{id:Int}" page={PlayerMatchScorePlayerMatchScorePage} name="playerMatchScore" />
            <Route path="/admin/player-match-scores" page={PlayerMatchScorePlayerMatchScoresPage} name="playerMatchScores" />
          </Set>
          <Route path="/admin/rounds/new" page={NewRoundPage} name="newRound" />
          <Route path="/admin/rounds/{id:Int}/edit" page={EditRoundPage} name="editRound" />
          <Route path="/admin/rounds/{id:Int}" page={RoundPage} name="round" />
          <Route path="/admin/rounds" page={RoundsPage} name="rounds" />
          <Set wrap={MatchesLayout}>
            <Route path="/admin/matches/new" page={MatchNewMatchPage} name="newMatch" />
            <Route path="/admin/matches/{id:Int}/edit" page={MatchEditMatchPage} name="editMatch" />
            <Route path="/admin/matches/{id:Int}" page={MatchMatchPage} name="match" />
            <Route path="/admin/matches" page={MatchMatchesPage} name="matches" />
          </Set>
          <Route path="/admin/banners/new" page={NewBannerPage} name="newBanner" />
          <Route path="/admin/banners/{id:Int}/edit" page={EditBannerPage} name="editBanner" />
          <Route path="/admin/banners/{id:Int}" page={BannerPage} name="banner" />
          <Route path="/admin/banners" page={BannersPage} name="banners" />
          <Route path="/admin/user-pictures/new" page={NewUserPicturePage} name="newUserPicture" />
          <Route path="/admin/user-pictures/{id:Int}/edit" page={EditUserPicturePage} name="editUserPicture" />
          <Route path="/admin/user-pictures/{id:Int}" page={UserPicturePage} name="userPicture" />
          <Route path="/admin/user-pictures" page={UserPicturesPage} name="userPictures" />
          <Route path="/admin/contacts/new" page={NewContactPage} name="newContact" />
          <Route path="/admin/contacts/{id:Int}/edit" page={EditContactPage} name="editContact" />
          <Route path="/admin/contacts/{id:Int}" page={ContactPage} name="contact" />
          <Route path="/admin/contacts" page={ContactsPage} name="contacts" />
        </Private>
      </Set>
    </Router>
  )
}

export default Routes
