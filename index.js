import puppeteer from "puppeteer";

const proxies = [
  "http://103.216.103.163:80",
  "https://46.182.6.51:3129",
  "https://171.244.65.14:4002",
];

const trendOnDextools = async (proxy) => {
  const browser = await puppeteer.launch({
    headless: false,
    //args: [`--proxy-server=${proxy}`],
    // executablePath: executablePath(),
    // args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(120000);

  await page.goto(
    "https://www.dextools.io/app/en/ether/pair-explorer/0x4ec7d47cfd3f35e47b86f9eaa31cb9d3ee1e801a"
  );
  const twitter = await page.$('a[href^="https://twitter.com"]');
  const telegram = await page.$('a[href^="https://t.me"]');
  await page.waitForSelector(".favorite-button");
  await page.click(".favorite-button", {
    timeout: 60000,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const twitterUrl = await (await twitter.getProperty("href")).jsonValue();
  const twitterPromise = new Promise((resolve) =>
    browser.once("targetcreated", (target) => resolve(target.page()))
  );
  const twitterTarget = await browser.newPage();
  await twitterTarget.goto(twitterUrl);
  const twitterPage = await twitterPromise;
  twitterPage.setDefaultNavigationTimeout(60000);
  await twitterPage.waitForTimeout(2000);
  await twitterPage.close();

  const telegramUrl = await (await telegram.getProperty("href")).jsonValue();
  const telegramPromise = new Promise((resolve) =>
    browser.once("targetcreated", (target) => resolve(target.page()))
  );
  const telegramTarget = await browser.newPage();
  await telegramTarget.goto(telegramUrl);
  const telegramPage = await telegramPromise;
  telegramPage.setDefaultNavigationTimeout(60000);
  await telegramPage.waitForTimeout(2000);
  await telegramPage.close();

  await page.close();
  setTimeout(async () => await browser.close(), 3000);
};

trendOnDextools();

async function runMultipleInstances(count) {
  for (let i = 0; i < count; i++) {
    console.log(`Running instance ${i + 1}`);
    const proxy = proxies[i % proxies.length];
    await trendOnDextools(proxy);
  }
}

// Specify the number of instances to run
const instancesCount = 3;

// Run multiple instances
runMultipleInstances(instancesCount)
  .then(() => console.log("All instances completed"))
  .catch((error) => console.error("Error:", error));
