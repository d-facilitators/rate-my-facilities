import { Selector } from 'testcafe';

class BuildingsPage {
  constructor() {
    this.pageId = '#buildings-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async closePopup(testController) {
    await testController.click('#close');
  }
}

export const buildingsPage = new BuildingsPage();
