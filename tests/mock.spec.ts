import { test } from "@playwright/test";
import { SmallLoanPage } from "../page-objects/pages/SmallLoanPage";

test.describe("Loan app mock tests", async () => {
  test("TL-21-1 positive test", async ({ page }) => {
    const expectedMonthlyAmount = 100005;
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      const responseBody = { paymentAmountMonthly: expectedMonthlyAmount };
      await request.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(responseBody),
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkMonthlyAmount(expectedMonthlyAmount);
  });

  test("TL-21-2 negative test. In result: 500 code and no responseBody", async ({
    page,
  }) => {
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      await request.fulfill({
        status: 500,
        body: "",
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkErrorMessage();
  });

  test("TL-21-3 positive test. In result: 200 code, and no responseBody", async ({
    page,
  }) => {
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      await request.fulfill({
        status: 200,
        contentType: "application/json",
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkUndefinedErrorMessage();
  });

  test("TL-21-4 positive test. In result: 200 code and responseBody contains wrong keyName", async ({
    page,
  }) => {
    const expectedMonthlyAmount = 5000;
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      const responseBody = { paymentAmoykdjfuntMonthly: expectedMonthlyAmount };
      await request.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(responseBody),
      });
    });

    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open();
    await loanCalcResponse;
    await smallLoanPage.checkUndefinedErrorMessage();
  });
});
