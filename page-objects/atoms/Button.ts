import { Locator, Page } from "@playwright/test";

export class Button {
  readonly page: Page;
  readonly dataTestId: string;

  constructor(page: Page, dataTestId: string) {
    this.page = page;
    this.dataTestId = dataTestId;
  }

  get button(): Locator {
    return this.page.getByTestId(this.dataTestId);
  }

  async click(): Promise<void> {
    await this.button.click();
  }
}
