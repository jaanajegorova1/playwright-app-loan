import { Locator, Page } from "@playwright/test";

export class Input {
  readonly page: Page;
  readonly dataTestId: string;

  constructor(page: Page, dataTestId: string) {
    this.page = page;
    this.dataTestId = dataTestId;
  }

  get input(): Locator {
    return this.page.getByTestId(this.dataTestId);
  }

  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }

  async getCurrentValue(): Promise<string> {
    return await this.input.inputValue();
  }
}
