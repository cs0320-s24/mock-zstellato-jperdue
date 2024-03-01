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

test("attempt to load invalid csv with case difference", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  /* should be csv/noHeader not csv/noheader */
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/noheader");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Invalid Filepath" })
  ).toBeVisible();
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

/* 
+
+
+
NOW I WILL BE TESTING THE MOCKED DATA FOR CORRECT FUNCTIONALITY 
+
+
+
*/

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

test("load, view, and search csv/empty, checks in brief and then verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_csv csv/empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Loaded File: csv/empty" })
  ).toBeVisible();
  await expect(page.getByText("csv/empty is loaded")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "CSV 'csv/empty' is empty." })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search ");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: CSV 'csv/empty' is" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: search 0 1Output:")).toBeVisible();
  await expect(page.getByText("Command: viewOutput: CSV 'csv")).toBeVisible();
  await expect(page.getByText("Command: load_csv csv/")).toBeVisible();
});

test("load and view of csv/header in brief and then verbose", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/header");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search ");
  await expect(page.getByLabel("repl-history")).toContainText(
    "first_namelast_nameagejimgrant59henryford28"
  );
  await expect(page.getByRole("cell", { name: "age" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "59" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "28" })).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: viewOutput:")).toBeVisible();
  await expect(page.getByRole("cell", { name: "jim" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "henry" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "first_name" })).toBeVisible();
});



test("checking all search methods for csv/header", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/header");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 jim");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "jim" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "grant" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "59" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Result:" })).toBeVisible();
  await expect(
    page.locator("table").filter({ hasText: "Result:jimgrant59" })
  ).toBeVisible();
  /* Other strings shouldnt be visible */
  await expect(
    page.locator("table").filter({ hasText: "Result:henryford28" })
  ).not.toBeVisible();

  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search first_name henry");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "henry" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "ford" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "28" })).toBeVisible();
  await expect(
    page.locator("table").filter({ hasText: "Result:henryford28" })
  ).toBeVisible();

  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 greg");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Result:$/ })
      .nth(1)
  ).toBeVisible();

  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 5 greg");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Column Index '5' is" })
  ).toBeVisible();

  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search gender male");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Column Name 'gender' is not in CSV" })
  ).toBeVisible();
});


test("load and view csv/noHeader", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/noHeader");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Loaded File: csv/noHeader" })
  ).toBeVisible();
  await expect(page.getByText("Command: load_csv csv/")).toBeVisible();
  await expect(
    page.locator("table").filter({ hasText: "jimgrant59henryford28" })
  ).toBeVisible();
  await expect(page.getByText("Command: viewOutput:")).toBeVisible();
  await expect(page.getByRole("cell", { name: "jim" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "henry" })).toBeVisible();
  await expect(page.getByText("csv/noHeader is loaded")).toBeVisible();
});


test("checking all search methods for csv/noHeader", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/noHeader");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 jim");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "jim" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "grant" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "59" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Result:" })).toBeVisible();
  await expect(
    page.locator("table").filter({ hasText: "Result:jimgrant59" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search first_name henry");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Cannot search by" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search - henry");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "henry" })).toBeVisible();
  await expect(
    page.locator("table").filter({ hasText: "Result:henryford28" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 greg");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.locator("table").filter({ hasText: /^Result:$/ })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 5 greg");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Column Index '5' is" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search gender male");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: Column Name 'gender'" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: search 5 gregOutput")).toBeVisible();
  await expect(page.getByText("Command: search first_name")).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Error: Cannot search by" })
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Loaded File: csv/noHeader" })
  ).toBeVisible();
});


test("check that csv/malformed doesnt load and cant be view or searched", async ({ page }) => {
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
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: No CSV Loaded" })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Error: No CSV Loaded" }).first()
  ).toBeVisible();
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
