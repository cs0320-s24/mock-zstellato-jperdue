import { test, expect } from "@playwright/test";

/*
Here is the testing suite for CSV functionality. It checks all the functionality of loadCSV,
searchCSV, and viewCSV
*/

/* Tests basic functionality of loading a good CSV */
test("load_csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/header");
  await page.getByRole("button", { name: "Submit" }).click();

  /* Makes sure the cell agrees */
  await expect(
    page.getByRole("cell", { name: "Loaded File: csv/header" })
  ).toBeVisible();

  /* Makes sure the info table agrees */
  await expect(page.getByText("csv/header is loaded")).toBeVisible();
});

/* Test if you try to load no csv or a non existent csv (checks it for brief and verbose output types) */
test("load nonexistent or __ csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_csv ");
  await page.getByRole("button", { name: "Submit" }).click();

  /* Ensures the correct error message */
  await expect(
    page.getByRole("cell", { name: "Error: Invalid Filepath" })
  ).toBeVisible();

  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_csv saodhed");
  await page.getByRole("button", { name: "Submit" }).click();
  
  /* Ensures the correct error message */
  await expect(
    page.getByRole("cell", { name: "Error: Invalid Filepath" }).first()
  ).toBeVisible();
  
  /* Switches to verbose mode and checks again */
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Command: load_csv Output:")).toBeVisible();
  await expect(
    page.getByText("Command: load_csv saodhedOutput: Error: Invalid Filepath")
  ).toBeVisible();
});



/* Checks if you try to view or search before loading a csv in verbose mode */
test("view and search before load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: viewOutput: Error:")).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Error: No CSV Loaded" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: searchOutput: Error")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Command: searchOutput: Error: No CSV Loaded$/ })
      .getByRole("cell")
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 greg");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: search 0 gregOutput")).toBeVisible();
  await page
    .locator("div")
    .filter({ hasText: /^Command: search 0 gregOutput: Error: No CSV Loaded$/ })
    .getByRole("cell")
    .click();
});

/* Checks if you try to view search before loading a --valid-- csv in verbose mode */
test("view and search before correct load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv badCSVndndndn");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_csv eofner");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("group", { name: "Enter a command:" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: viewOutput: Error:")).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Error: No CSV Loaded" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: searchOutput: Error")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Command: searchOutput: Error: No CSV Loaded$/ })
      .getByRole("cell")
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 urmom");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: search 0 urmomOutput")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({
        hasText: /^Command: search 0 urmomOutput: Error: No CSV Loaded$/,
      })
      .getByRole("cell")
  ).toBeVisible();
});


/* Checks if you try to load a malformed file, it counts as if nothing was loaded. */
test("malformed doesnt load", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/malformed");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Input Malformed CSV" })
  ).toBeVisible();
  await expect(page.getByText("No CSV is loaded")).toBeVisible();
  
  /* view throws error */
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: No CSV Loaded" })
  ).toBeVisible();
 
  /* search throws error */
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: No CSV Loaded" }).first()
  ).toBeVisible();
});




/* test load view and search an empty csv */
test("load, view, search empty csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_csv csv/empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 1");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Sign Out").click();
});



test("switching modes after commands are given", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/noheader");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Invalid Filepath" })
  ).toBeVisible();
  await expect(page.getByPlaceholder("Enter command here!")).toHaveValue(
    "load_csv csv/noheader"
  );
  await expect(page.getByText("Mode Brief")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Mode Verbose")).toBeVisible();
});









// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
