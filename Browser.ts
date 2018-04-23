import * as EventEmitter from "events";
import * as puppeteer from "puppeteer";

export default class Browser extends EventEmitter {
  private browser;
  private page;

  constructor() {
    super();
  }

  public async start() {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
      });
      this.page = await this.browser.newPage();
    } catch (error) {
      this.throw(error);
    }
  }

  public async open(url: string) {
    try {
      await this.page.goto(url);
    } catch (error) {
      this.throw(error);
    }
  }

  public async fill(selector, value) {
    await this.page.focus(selector);
    await this.page.type(value);
  }

  public async click(selector) {
    await this.page.click(selector);
  }

  public async measure(): Promise<object> {
    const resultString = await this.page.evaluate((_) => {
      return JSON.stringify(window.performance.timing);
    });

    return JSON.parse(resultString);
  }

  public async close() {
    try {
      await this.page.close();
      await this.browser.close();
    } catch (error) {
      this.throw(error);
    }
  }

  public throw(error) {
    super.emit("error", error);
  }
}
