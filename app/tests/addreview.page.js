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
}

export const addreviewPage = new AddreviewPage();
