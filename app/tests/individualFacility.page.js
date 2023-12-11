import { Selector } from 'testcafe';

class AddfacilityPage {
  constructor() {
    this.pageId = '#individual-facility';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async writeReview(testController) {
    await this.isDisplayed(testController);
  }

  async uploadPhoto(testController) {
    await this.isDisplayed(testController);
  }

  async reportIssue(testController) {
    await this.isDisplayed(testController);
  }
}

export const individualFacilityPage = new AddfacilityPage();
