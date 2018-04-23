import * as fs from "fs";
import * as lighthouse from "lighthouse";
import * as path from "path";
import * as puppeteer from "puppeteer";
import { URL } from "url";

(async () => {
  const url = "https://www.google.de/";

  const browser = await puppeteer.launch({
    headless: true,
  });

  const results = await lighthouse(url, {
    "disable-gpu": true,
    "headless": true,
    "no-sandbox": true,
    "output": "json",
    "port": (new URL(browser.wsEndpoint())).port,
  }, {
    extends: "lighthouse:default",
    settings: {
      onlyCategories: ["performance"],
    },
  });

  const filepath = path.resolve(__dirname, "test.json");
  fs.writeFileSync(filepath, JSON.stringify(results), "utf-8");

  await browser.close();
})();
