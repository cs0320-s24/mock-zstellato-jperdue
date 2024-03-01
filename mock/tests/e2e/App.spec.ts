import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel("Enter command here!")).not.toBeVisible();
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel("Enter command here!")).toBeVisible();
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  await expect(page.getByPlaceholder("Enter command here!")).toHaveValue(
    "Awesome command"
  );
});

test('on page load, i see a button', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', {name: 'Submit'})).toBeVisible()
});

  /*
test('after I click the button, my command gets pushed', async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("Awesome command");
  await page.getByRole("button", { name: "Submit" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Awesome command");
  

  const commandPresence = await page.evaluate(() => {
    // Attempt to find an element that contains the text "Command: "
    // This is under the assumption that your application is in verbose mode for this test
    const commandElement = Array.from(
      document.querySelector('repl-history')).find((el) => el.textContent.startsWith("Command: "));
    return commandElement ? commandElement.textContent : null;
  });
});
*/



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

