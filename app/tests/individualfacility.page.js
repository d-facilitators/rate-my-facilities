import { Selector } from 'testcafe';

class IndividualfacilityPage {
  constructor() {
    this.pageId = '#individual-facility-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoAddReviewPage(testController) {
    await testController.click('#write-review-button');
  }
}

export const individualFacilityPage = new IndividualfacilityPage();
