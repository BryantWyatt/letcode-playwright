import { test, expect, type Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://letcode.in/buttons");
});

test.describe("Buttons", () => {
  test("should navigate to Home", async ({ page }) => {
    // Arrange
    const button = await page.getByRole("button", { name: "Goto Home" });

    // Act
    await button.click();

    // Assert
    await expect(page).toHaveURL("https://letcode.in/");
  });

  // Purely exercise, I see little value in this test
  test("should have correct X & Y coordinates", async ({ page }) => {
    const button = await page.getByRole("button", { name: "Find Location" });
    const bb = await button.boundingBox();

    const x = bb?.x === undefined ? -1 : bb.x;
    const y = bb?.y === undefined ? -1 : bb.y;

    await expect(x).toEqual(88);
    await expect(y).toEqual(338);
  });

  test("should have correct color", async ({ page }) => {
    // Arrange
    // Playwright acts weird with css when using getByRole. Using getByLabel instead
    const button = await page.getByLabel("Find the color of the button");

    // Assert
    await expect(button).toHaveCSS("background-color", "rgb(138, 77, 118)");
  });

  test("should have correct height & width", async ({ page, browserName }) => {
    const button = await page.getByRole("button", { name: "Find Location" });
    const bb = await button.boundingBox();

    const height = bb?.height === undefined ? -1 : bb.height;
    const width = bb?.width === undefined ? -1 : bb.width;

    await expect(height).toEqual(40);

    // Not ideal
    if (browserName != "webkit") {
      await expect(Math.round(width)).toEqual(130);
    } else {
      await expect(Math.round(width)).toEqual(126);
    }
  });

  test("should be disabled", async ({ page }) => {
    // Arrange
    const button = await page.getByRole("button", { name: "Disabled" });

    // Assert
    await expect(button).toHaveAttribute("disabled", "");
  });

  test("should change text after being held", async ({ page }) => {
    // Arrange
    const button = await page.getByRole("button", { name: "Button Hold!" });

    // Act
    await button.click({ delay: 3000 });

    // Assert
    await expect(
      await await page
        .getByRole("button", { name: "Button has been long pressed" })
        .textContent(),
    ).toBe("Button has been long pressed");
  });
});
