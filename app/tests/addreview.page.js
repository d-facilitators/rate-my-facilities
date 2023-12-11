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

  // TODO
  async createReview(testController, username) {
    const rating = 4;
    const reviewText = 'Sample review for a given facility.';
    await this.isDisplayed(testController);
    await testController.typeText('#review-username', username);
    const buildingSelector = Selector('#review-building');
    const facilitySelector = Selector('#review-typeOfFacility');
    await testController.click(buildingSelector.withText('POST'));
    await testController.click(facilitySelector.withText('Restroom'));
    await testController.typeText('#review-rating', rating);
    await testController.typeText('#review-reviewText', reviewText);
    await testController.click('#review-submit input.btn.btn-primary');
  }
}

export const addreviewPage = new AddreviewPage();
