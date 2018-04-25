import * as EventEmitter from "events";
import * as puppeteer from "puppeteer";

import ConfigInterface from "./Interfaces/ConfigInterface";
import Measure from "./Measure";

export default class Browser extends EventEmitter {
  private browser;
  private page;
  private measure;
  private url: string = "";

  constructor(private config?: ConfigInterface) {
    super();
  }

  public async start() {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
      });
      this.page = await this.browser.newPage();
    } catch (error) {
      this.throw(error);
    }
  }

  public async open(url: string) {
    this.url = url;

    try {
      await this.page.goto(url);
    } catch (error) {
      this.throw(error);
    }
  }

  public async fill(selector: string, value: string) {
    await this.page.evaluate((inputSelector, inputValue) => {
      document.querySelector(inputSelector).value = inputValue;
    }, selector, value);
  }

  public async click(selector: string) {
    await this.page.click(selector);
  }

  public async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  public async triggerEvent(selector: string, eventName: string, data?: any) {
    await this.page.evaluate((inputSelector, inputEventName, inputData) => {
      const element = document.querySelector(inputSelector);
      const event = new CustomEvent(inputEventName, {
        bubbles: true,
        detail: inputData,
      });

      element.dispatchEvent(event);
    }, selector, eventName, data);
  }

  public async getMetrics(): Promise<object> {
    this.measure = new Measure(this.browser, this.page);

    super.emit("info", "  Collecting metrics…");

    const basicOnly: boolean = !!(this.config && this.config.basicOnly);
    const includeFilmstrip: boolean = !!(this.config && this.config.includeFilmstrip);

    try {
      return await this.measure.run(this.url, basicOnly, includeFilmstrip);
    } catch (error) {
      this.throw(error);
    }

    return {};
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
