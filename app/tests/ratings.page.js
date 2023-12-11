import { Selector } from 'testcafe';

class RatingsPage {
  constructor() {
    this.pageId = '#ratings-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoAddReviewPage(testController) {
    await testController.click('#submit-review-button');
  }
}

export const ratingsPage = new RatingsPage();
