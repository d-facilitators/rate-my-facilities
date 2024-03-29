import { Selector } from 'testcafe';

class ReviewsPage {
  constructor() {
    this.pageId = '#reviews-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const reviewsPage = new ReviewsPage();
