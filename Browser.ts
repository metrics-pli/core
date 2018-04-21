import * as puppeteer from "puppeteer";

export default class Browser {
  private browser;
  private page;

  constructor() {}

  async start() {
    try {
      this.browser = await puppeteer.launch();
      this.page = await this.browser.newPage();
    } catch(error) {
      this.throw(error)
    }
  }

  async open(url: String) {
    try {
      await this.page.goto(url)
    } catch (error) {
      this.throw(error)
    }
  }

  async close() {
    try {
      await this.page.close();
      await this.browser.close();
    } catch (error) {
      this.throw(error)
    }
  }

  throw(error) {
    console.error(error)
  }
};
