import { test, expect } from "@playwright/test";

// This test checks the login functionality
test("Login", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  // Checks that we can see the login button text
  expect(page.getByText("Login")).toBeVisible();
});

// This test checks the logout functionality
test("Logout", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Checks that we can see the logout button text after logging in
  expect(page.getByText("Sign Out")).toBeVisible();
  await page.getByLabel("Sign Out").click();

  // Checks that we can see the login button again after loggging out
  expect(page.getByText("Login")).toBeVisible();
});

// This test checks whether login and logout resets everything back to their original states
// It also calls on load and mode commands
test("Login-Logout Reset", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_csv csv/empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Sign Out").click();
  await page.getByLabel("Login").click();

  await expect(page.getByText("Mode Brief")).toBeVisible();
  await expect(page.getByText("No CSV is loaded")).toBeVisible();
});

