import { Selector } from 'testcafe';

class AddfacilityPage {
  constructor() {
    this.pageId = '#add-facility';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addFacility(testController) {
    await this.isDisplayed(testController);
    await testController.click('#choose-facilityType');
    const optionSelector = Selector('option').withText('Restroom');
    await testController.click(optionSelector);
    await testController.click('#choose-building');
    const optionSelector2 = Selector('option').withText('Bilger Hall');
    await testController.click(optionSelector2);
    const numField = Selector('#choose-floor');
    await testController.typeText(numField, '2');
    await testController.click('#addFacility-form-submit');
    await testController.click(Selector('body'), { offsetX: 5, offsetY: 5 });
  }
}

export const addFacilityPage = new AddfacilityPage();
