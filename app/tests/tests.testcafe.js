import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
// import { ratingsPage } from './ratings.page';
import { buildingsPage } from './buildings.page';
import { addFacilityPage } from './addfacility.page';
import { reviewsPage } from './reviews.page';
import { addreviewPage } from './addreview.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnfoo', email: 'john@foo.com', password: 'changeme' };
/** Test review from one of the sample users defined in settings.development.json. */

fixture('rate-my-facilities localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
  await landingPage.search(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new username and email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}`;
  const newEmail = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, newEmail, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that ratings page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoReviewsPage(testController);
  await reviewsPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that buildings page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBuildingsPage(testController);
  await buildingsPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that add facility page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddFacilityPage(testController);
  await addFacilityPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// TODO
test('Test that adding a review from the ratings page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoReviewsPage(testController);
  await reviewsPage.isDisplayed(testController);
  await reviewsPage.gotoAddReviewPage(testController);
  await addreviewPage.isDisplayed(testController);
  await addreviewPage.createReview(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// TODO test functionality on the review added in the previous test
test('Test that buttons of the individual facility page function properly', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoReviewsPage(testController);
  await reviewsPage.isDisplayed(testController);
  await reviewsPage.gotoAddReviewPage(testController);
  await addreviewPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
