import { Selector } from 'testcafe';
import { buildingsPage } from './buildings.page';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async search(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#building-search', 'POST');
    await testController.pressKey('enter');
    await buildingsPage.isDisplayed(testController);
    await buildingsPage.closePopup(testController);
  }
}

export const landingPage = new LandingPage();
