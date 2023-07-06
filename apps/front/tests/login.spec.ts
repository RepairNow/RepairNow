import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:5173/");
});

test.describe("Interact home page and login me", () => {
	test("has title h1 with good text", async ({ page }) => {
		// expect page to have title h1 element.
		expect(await page.textContent("h1")).toBe(
			" Trouvez le prestataire idéal pour tous les services du quotidien "
		);
	});

	test("Open login dialog and submit wrong infos", async ({ page }) => {
		// click on the button with attribute data-testid="login-button"
		await page.click('[data-testid="login-button"]');

		const myElement = await page.$('[data-testid="login-email"]');
		// find the input child of myElement
		const input = await myElement?.$("input");
		await input?.fill("client@gmail.com");

		const passwordInput = await page
			.$('[data-testid="login-password"]')
			.then((el) => el?.$("input"));
		await passwordInput?.fill("wrongpwd");

		// click on the button with type = "submit"
		await page.click('[data-testid="login-submit"]');

		// await expect(page.getByTestId("login-alert")).toBeVisible();
	});
});
