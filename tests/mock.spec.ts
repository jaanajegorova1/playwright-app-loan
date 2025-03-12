import { test, expect } from "@playwright/test";
import { SmallLoanPage } from "../page-objects/pages/SmallLoanPage";
import { LoanDecisionPage } from "../page-objects/pages/LoanDecisionPage";

test.describe("Loan app mock tests", async () => {
  test("TL-21-1 positive test", async ({ page }) => {
    const expectedMpnthlyAmount = 100005;
    const smallLoanPage = new SmallLoanPage(page);

    await page.route("**/api/loan-calc*", async (request) => {
      const responseBody = { paymentAmountMonthly: expectedMpnthlyAmount }; //eto vsjo responsebody i to chto vyshe
      await request.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(responseBody), //v stroku otvet, vozvrat v vide stroki
      });
    });
    //nizhe mehanizm ozhidanija zaprosa
    const loanCalcResponse = page.waitForResponse("**/api/loan-calc*");
    await smallLoanPage.open(); //action open "http://localhost:3000"
    await loanCalcResponse; //podozhdi, a byl li otvet na etot zapros
    // await page.waitForResponse("**/api/loan-calc*"); //ozhidanije formirovanija otveta na zapros kak v skobkah(), loan-calc
    await smallLoanPage.checkMonthlyAmount(expectedMpnthlyAmount);
  });
});
