import {
  ResultsetAdvancedInterface,
  ResultsetInterface,
} from "@metrics-pli/types";
import * as lighthouse from "lighthouse";
import { URL } from "url";

export default class Measure {
  private port: string;

  constructor(private browser, private page) {
    this.port = (new URL(browser.wsEndpoint())).port;
  }

  public async run(
    url: string,
    basicOnly: boolean = false,
    includeFilmstrip: boolean = false,
  ): Promise<ResultsetInterface> {
    if (basicOnly) {
      return {
        basic: await this.runBasic(url),
      };
    }

    return {
      advanced: await this.runAdvanced(url, includeFilmstrip),
      basic: await this.runBasic(url),
    };
  }

  public async runAdvanced(
    url: string,
    includeFilmstrip: boolean,
  ): Promise<ResultsetAdvancedInterface> {
    const settings: any = {
      onlyCategories: ["performance"],
    };

    if (!includeFilmstrip) {
      settings.skipAudits = [
        "screenshot-thumbnails",
      ];
    }

    const results = await lighthouse(url, {
      "disable-gpu": true,
      "headless": true,
      "no-sandbox": true,
      "output": "json",
      "port": this.port,
    }, {
      extends: "lighthouse:default",
      settings,
    });

    return this.mapResult(results);
  }

  public async runBasic(url: string): Promise<object> {
    const resultString = await this.page.evaluate((_) => {
      return JSON.stringify(window.performance.timing);
    });

    return JSON.parse(resultString);
  }

  private mapResult(result: any): ResultsetAdvancedInterface {
    delete result.artifacts;
    delete result.reportGroups;
    delete result.reportCategories;

    const audits: any = [];

    for (const key in result.audits) {
      if (result.audits[key]) {
        const audit = result.audits[key];

        audits.push({
          description: audit.description,
          displayValue: audit.displayValue,
          id: key,
          rawValue: audit.rawValue,
          score: audit.score,
        });
      }
    }

    return {
      audits,
      fullResult: result,
      generatedTime: result.generatedTime,
      initialUrl: result.initialUrl,
      url: result.url,
    };
  }
}
