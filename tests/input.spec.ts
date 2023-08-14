import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://letcode.in/edit");
});

test.describe("Input", () => {
  test("should accept full name", async ({ page }) => {
    // Arrange
    const name = "John Example Smith";
    const fullNameInput = await page.getByPlaceholder(
      "Enter first & last name",
    );

    // Act
    await fullNameInput.fill(name);

    // Assert
    await expect(fullNameInput).toHaveValue(name);
  });

  test("should append text", async ({ page }) => {
    // Arrange
    const input = await page.locator("#join");

    // Act
    await input.focus();
    await page.keyboard.press("End");
    await input.type(". How are you?");

    // Assert
    await expect(input).toHaveValue("I am good. How are you?");
  });

  test("should accept tab key", async ({ page }) => {
    // Arrange
    const input = await page.locator("#join");

    // Act
    await input.focus();
    await page.keyboard.press("Tab");

    // Assert
    await expect(page.locator("#getMe")).toBeFocused();
  });

  test("should have correct content", async ({ page }) => {
    // Arrange
    const input = await page.locator("#getMe");

    // Assert
    await expect(input).toHaveValue("ortonikc");
  });

  test("should be clearable", async ({ page }) => {
    // Arrange
    const input = await page.locator("#clearMe");

    // Act
    await input.clear();

    // Assert
    await expect(input).toHaveValue("");
  });

  test("should be disabled", async ({ page }) => {
    // Arrange
    const input = await page.locator("#noEdit");

    // Assert
    await expect(input).toBeDisabled();
  });

  test("should be read-only", async ({ page }) => {
    // Arrange
    const input = await page.locator("#dontwrite");

    // Assert
    await expect(input).toHaveAttribute("readonly", "");
  });
});
