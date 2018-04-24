import * as lighthouse from "lighthouse";
import * as puppeteer from "puppeteer";
import { URL } from "url";

export default class Measure {
  private port: string;

  constructor(private browser, private page) {
    this.port = (new URL(browser.wsEndpoint())).port;
  }

  public async run(url: string, basicOnly: boolean = false): Promise<object> {
    if (basicOnly) {
      return await this.runBasic(url);
    }

    return {
      advanced: await this.runAdvanced(url),
      basic: await this.runBasic(url),
    };
  }

  public async runAdvanced(url: string): Promise<object> {
    const results = await lighthouse(url, {
      "disable-gpu": true,
      "headless": true,
      "no-sandbox": true,
      "output": "json",
      "port": this.port,
    }, {
      extends: "lighthouse:default",
      settings: {
        onlyCategories: ["performance"],
      },
    });

    return results;
  }

  public async runBasic(url: string) {
    const resultString = await this.page.evaluate((_) => {
      return JSON.stringify(window.performance.timing);
    });

    return JSON.parse(resultString);
  }
}
