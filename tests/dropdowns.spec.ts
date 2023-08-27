/*
  This example heavily relies on using id to locate elements
  An approach note recommended by Playwright
  https://playwright.dev/docs/other-locators#id-data-testid-data-test-id-data-test-selectors
  In one way, this is a bad practice but in the worst case scenario, this is what could work
  Would recommend talking to developers to curate for using descriptive approach
  Second worst case, test-ids, still better than nothing.
*/

import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://letcode.in/dropdowns");
});

test.describe("Dropdowns", () => {
  /*
    The option selection lacks the 'selected' tag
    As a work around, we use the notification banner that appears
  */
  test("should display selected fruit", async ({ page }) => {
    // Arrange
    const fruits = await page.locator("#fruits");

    await fruits.selectOption({ label: "Apple" });

    const notification = await page.locator(".notification");
    await expect(await notification.innerText()).toBe("You have selected Apple");
  });

  /*
    The option selection lacks the 'selected' tag
    As a work around, we select two, verify the notification, deselect one and check again
  */
  test("should select multiple heroes", async ({ page }) => {
    // Arrange
    const superheroes = await page.locator("#superheros");
    const aquaman = await superheroes.getByText("Aquaman");
    const batman = await superheroes.getByText("Batman");

    await aquaman.click();
    await batman.click({ modifiers: ["Control"] });
    await aquaman.click({ modifiers: ["Control"] });

    const notification = await page.locator(".notification");
    await expect(await notification.innerText()).toBe("You have selected Batman");
  });

  /*
    Based on the video: https://www.youtube.com/watch?v=IubdSQFOdiU
    Verify the count of elements is correct
  */
  test("should contain 5 programming languages", async ({ page }) => {
    const languages = await page.locator("#lang");
    const options = await languages.getByRole("option");

    await expect(await options.count()).toEqual(5);
  });

  /*
    Based on the video: https://www.youtube.com/watch?v=IubdSQFOdiU
    Verify that the correct text are present
  */
  test("should have correct programming languages", async ({ page }) => {
    const expectedLanguages = ["JavaScript", "Java", "Python", "Swift", "C#"];
    const languages = await page.locator("#lang");
    const options = await languages.getByRole("option");

    for (const option of await options.elementHandles()) {
      await expect(expectedLanguages).toContain(await option.innerText());
    }
  });

  test("should select India using value attribute", async ({ page }) => {
    const country = await page.locator("#country");

    await country.selectOption("India");
    await expect(await country.inputValue()).toBe("India");
  });

})