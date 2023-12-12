import { Selector } from 'testcafe';

class AddreviewPage {
  constructor() {
    this.pageId = '#add-review';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async createReview(testController, username) {
    const rating = '4';
    const reviewText = 'Sample review for a given facility.';
    await this.isDisplayed(testController);
    await testController.typeText('#review-username', username);
    const numField = Selector('#review-rating');
    await testController.typeText(numField, rating);
    await testController.typeText('#review-reviewText', reviewText);
    await testController.click('#review-submit input.btn.btn-primary');
  }
}

export const addreviewPage = new AddreviewPage();
