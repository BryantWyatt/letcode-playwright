import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://letcode.in");
});

test.describe("Template", () => {
  test("should have title LetCode with Koushik", async ({ page }) => {
    // Arrange
    const workspace = page.getByText("Explore Workspace");

    // Act
    await workspace.click();

    // Assert
    await expect(page).toHaveURL("https://letcode.in/test");
  });
});
