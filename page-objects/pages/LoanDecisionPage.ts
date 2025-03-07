import { Locator, Page } from "@playwright/test";

export class LoanDecisionPage {
  readonly page: Page;
  readonly finalAmount: Locator;
  readonly finalPeriod: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finalAmount = page.getByTestId("final-page-amount");
    this.finalPeriod = page.getByTestId("final-page-period");
  }

  async getFinalAmountValue(): Promise<string> {
    const text = await this.finalAmount.innerText();

    return text.split(" ")[0]; //tak kak hotim zabrat tolko 1 strochku, posle probela. to est zabrali 500
  }

  async getFinalPeriodValue(): Promise<string> {
    const text = await this.finalPeriod.innerText();

    return text.split(" ")[0];
  }
}
