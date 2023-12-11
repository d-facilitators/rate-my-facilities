import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class AddreviewPage {
  constructor() {
    this.pageId = '#add-review';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  // async createReview(testController, username, typeOfFacility, rating, reviewText) {
  //   await this.isDisplayed(testController);
  //   await testController.typeText('#signup-form-username', username);
  //   await testController.typeText('#signup-form-email', typeOfFacility);
  //   await testController.typeText('#signup-form-password', rating);
  //   await testController.typeText('#signup-form-password', reviewText);
  //   await testController.click('#signup-form-submit input.btn.btn-primary');
  // }
}

export const addreviewPage = new AddreviewPage();
