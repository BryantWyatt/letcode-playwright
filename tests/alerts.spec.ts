import { test, expect, type Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://letcode.in/alert");
});

test.describe("Alerts", () => {
  test.describe("Simple Alert", () => {
    test("should dismiss display", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Simple Alert" });
      page.on("dialog", (dialog) => dialog.dismiss());

      // Act
      await alert.click();
    });

    test("should have correct message", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Simple Alert" });
      page.on("dialog", async (dialog) => {
        // Assert
        await expect(dialog.message()).toEqual("Hey! Welcome to LetCode");
        await dialog.accept();
      });

      // Act
      await alert.click();
    });
  });

  test.describe("Confirm Alert", () => {
    test("should dismiss display", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Confirm Alert" });
      page.on("dialog", (dialog) => dialog.dismiss());

      // Act
      await alert.click();
    });

    test("should have correct message", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Confirm Alert" });
      page.on("dialog", async (dialog) => {
        // Assert
        await expect(dialog.message()).toEqual("Are you happy with LetCode?");
        await dialog.accept();
      });

      // Act
      await alert.click();
    });
  });

  test.describe("Prompt Alert", () => {
    test("should dismiss display", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Prompt Alert" });
      page.on("dialog", (dialog) => dialog.dismiss());

      // Act
      await alert.click();
    });

    test("should have correct message", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Prompt Alert" });
      page.on("dialog", async (dialog) => {
        // Assert
        await expect(dialog.message()).toEqual("Enter your name");
        await dialog.accept();
      });

      // Act
      await alert.click();
    });

    test("should display correct text on page after accept", async ({
      page,
    }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Prompt Alert" });
      page.on("dialog", async (dialog) => {
        // Act
        await dialog.accept("John Smith");
      });

      // Act
      await alert.click();

      // Assert
      await expect(page.getByText("Your name is: John Smith")).toBeVisible();
    });
  });

  test.describe("Modern Alert", () => {
    test("should display correct text", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "Modern Alert" });

      // Act
      await alert.click();

      // Assert
      await expect(
        await page.getByText(
          "Modern Alert - Some people address me as sweet alert as well",
        ),
      ).toBeVisible();
    });

    test("should dismiss display", async ({ page }) => {
      // Arrange
      const alert = page.getByRole("button", { name: "MOdern Alert" });
      page.on("dialog", (dialog) => dialog.dismiss());

      // Act
      await alert.click();
      await page.getByLabel("close").click();

      // Assert
      await expect(
        await page.getByText(
          "Modern Alert - Some people address me as sweet alert as well",
        ),
      ).not.toBeVisible();
    });
  });
});
