// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const pluginProxy = require("puppeteer-extra-plugin-proxy");

// // Set up the proxies
// const proxies = [
//   //"103.216.103.163:80",
//   "46.182.6.51:3129",
//   "171.244.65.14:4002",
//   // Add more proxies as needed
// ];

// // Configure Puppeteer with Stealth and Proxy plugins
// puppeteer.use(StealthPlugin());
// puppeteer.use(
//   pluginProxy({
//     address: proxies,
//     random: true,
//   })
// );

// // Website URL
// const websiteUrl =
//   "https://www.dextools.io/app/en/ether/pair-explorer/0xf3cfd9fa97e9769716fc196026ad530e722427b0";

// (async () => {
//   const browser = await puppeteer.launch();

//   // Open a new browser tab and visit the website
//   const page = await browser.newPage();
//   await page.goto(websiteUrl);

//   // Find the section with social media links
//   const socialMediaLinksSelector = 'a[href^="https://twitter.com"]';
//   await page.waitForSelector(socialMediaLinksSelector);
//   const socialMediaLinks = await page.$$(socialMediaLinksSelector);

//   // Open each social media link in a new tab with a different proxy
//   for (let i = 0; i < socialMediaLinks.length; i++) {
//     const link = socialMediaLinks[i];
//     const linkUrl = await page.evaluate((el) => el.href, link);

//     const newPage = await browser.newPage();
//     await newPage.goto(linkUrl);

//     // You can add additional logic or interactions with the opened page if needed

//     await newPage.close();
//   }

//   // Repeat the process as needed
//   // You can use a loop or set up a setInterval to repeat the process after a certain interval

//   // Close the browser when done
//   await browser.close();
// })();
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://developer.chrome.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(".search-box__input", "automate beyond recorder");

  // Wait and click on first result
  const searchResultSelector = ".search-box__link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
