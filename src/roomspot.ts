import { chromium, Browser, Page } from "playwright";
import { parse } from "node-html-parser";

export async function getRooms() {
    const ROOMSPOT_URL =
        "https://www.roomspot.nl/aanbod/te-huur#?gesorteerd-op=prijs%2B&toekenning=2";
    let browser: Browser | null = null;

    const playwrightHtml = async () => {
        try {
            console.log("Starting to fetch rooms from Roomspot...");

            browser = await chromium.launch({ headless: true });
            const page: Page = await browser.newPage();

            await page.goto(ROOMSPOT_URL);
            await page.waitForLoadState("networkidle");

            const html = await page.content();

            return html;
        } catch (error) {
            console.error("Error fetching rooms:", error);
            throw error;
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    };

    const html = await playwrightHtml();

    const root = parse(html);
    const links = root
        .querySelectorAll(".list-item-content a[ng-click^='goToDetails']")
        .filter((link) => link.getAttribute("href")?.includes("/aanbod/"))
        .map((link) => {
            const href = link.getAttribute("href");
            return `https://www.roomspot.nl${href}`;
        });
    
    return links;
}

export async function runRoomApplicationScript(url: string): Promise<void> {
    let browser: Browser | null = null;

    try {
        console.log(`Starting Playwright script for: ${url}`);

        browser = await chromium.launch({ headless: true }); // Set to true for headless mode
        const page: Page = await browser.newPage();

        await page.goto(url);

        // todo

    } catch (error) {
        console.error("Error in Playwright script:", error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
