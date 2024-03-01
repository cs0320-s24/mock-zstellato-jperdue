import { test, expect } from "@playwright/test";

/*
Here is the testing suite for random inputs. It checks that a bunch of random comands and 
inputs wont create issues
*/

test("brief incorrect input", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("bad input");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Provided Command is Unknown" })
  ).toBeVisible();
});

test("verbose incorrect input", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByRole("group", { name: "Enter a command:" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("is bad");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: is badOutput:")).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Provided Command is Unknown" })
  ).toBeVisible();
  await expect(page.getByLabel("repl-history")).toContainText(
    "Command: is badOutput: Provided Command is Unknown"
  );
});

test('just spam clicking a login and logout', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByText('MockLogin').click();
  await page.getByRole('heading', { name: 'Mock' }).click({
    clickCount: 3
  });
  await page.getByText('MockLogin').click();
  await page.getByText('MockLogin').click();
  await page.locator('html').click();
  await page.locator('html').click();
  await page.getByText('MockLogin').click();
  await page.getByText('MockLogin').click();
  await page.getByText('MockLogin').click();
  await page.getByRole('heading', { name: 'Mock' }).click();
  await page.getByText('MockLogin').click();
  await page.getByLabel('Login').click();
  await page.getByLabel('Sign Out').click();
  await page.getByLabel('Login').click({
    clickCount: 3
  });
  await page.getByLabel('Sign Out').click({
    clickCount: 5
  });
  await page.getByLabel('Login').click({
    clickCount: 7
  });
  await page.getByLabel('Sign Out').click({
    clickCount: 9
  });
  await page.getByLabel('Login').click({
    clickCount: 11
  });
  await page.getByLabel('Sign Out').click({
    clickCount: 13
  });
  await page.getByLabel('Login').click({
    clickCount: 15
  });
  await page.getByLabel('Sign Out').click({
    clickCount: 17
  });
  await page.getByLabel('Login').click({
    clickCount: 19
  });
  await page.getByLabel('Sign Out').click();
  await page.getByLabel('Login').click();
  await page.getByLabel('Sign Out').click({
    clickCount: 3
  });
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(page.getByPlaceholder('Enter command here!')).toBeVisible();
  await expect(page.getByText('MockSign out')).toBeVisible();
});


test("check random typed commands and empty command in brief mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("sopdifje seiofj sioejf pojsdf 0pij se");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("eie oe i ");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("cell", { name: "Provided Command is Unknown" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Provided Command is Unknown" }).nth(1)
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Provided Command is Unknown" }).nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Provided Command is Unknown" }).nth(3)
  ).toBeVisible();
});

test("check option character inputs and control clicks and bad commands in verbose mode", async ({ page }) => {
    await page.goto("http://localhost:8000/");
    await page.getByLabel("Login").click();
    await page.getByPlaceholder("Enter command here!").click();
    await page.getByPlaceholder("Enter command here!").fill("mode");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByPlaceholder("Enter command here!").click();
    await page
      .getByPlaceholder("Enter command here!")
      .fill("øˆ∂∆ø∑ˆ˜ç§^80i3j)(*)(JGHOIHFYTFA@$∂∑ˆ˜“…¬≤÷≥≤µ˜˙©†œ∑´®†¥¨ˆø");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByLabel("repl-history")).toContainText(
      "Command: øˆ∂∆ø∑ˆ˜ç§^80i3j)(*)(JGHOIHFYTFA@$∂∑ˆ˜“…¬≤÷≥≤µ˜˙©†œ∑´®†¥¨ˆøOutput: Provided Command is Unknown"
    );
});

test("check basic incorrect input in verbose mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("this is a bad command");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command: this is a bad")).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Provided Command is Unknown" })
  ).toBeVisible();
  await expect(page.getByLabel("repl-history")).toContainText(
    "Command: this is a bad commandOutput: Provided Command is Unknown"
  );
});


test("test malformed input after correct command", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/empty blah blah blah");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_csv csv/empty ahd ahd ahd ahd");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command: load_csv csv/empty blah blah blahOutput: Loaded File: csv/empty"
    )
  ).toBeVisible();
  await expect(page.getByText("Command: modeOutput: Mode set")).toBeVisible();
  await expect(
    page.getByText(
      "Command: load_csv csv/empty ahd ahd ahd ahdOutput: Loaded File: csv/empty"
    )
  ).toBeVisible();
  await expect(page.getByLabel("repl-history")).toContainText(
    "Command: load_csv csv/empty ahd ahd ahd ahdOutput: Loaded File: csv/empty"
  );
  await expect(page.getByLabel("repl-history")).toContainText(
    "Command: load_csv csv/empty blah blah blahOutput: Loaded File: csv/empty"
  );await expect(page.getByText('csv/empty is loaded')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Command: load_csv csv\/empty ahd ahd ahd ahdOutput: Loaded File: csv\/empty$/ }).getByRole('cell')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Command: load_csv csv\/empty blah blah blahOutput: Loaded File: csv\/empty$/ }).getByRole('cell')).toBeVisible();
});