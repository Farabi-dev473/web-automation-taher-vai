const puppeteer = require('puppeteer-core');
const {v4} = require('uuid');
class Browser {

  async initialize(chromiumExecutablePath) {
    this.browser = await puppeteer.launch({ executablePath: chromiumExecutablePath});
    this.page = await this.browser.newPage();
  }

  async close() {
    await this.browser.close();
  }
}

class DuckDuckGoSearch extends Browser {
  async performSearch(query) {
    await this.page.goto('https://duckduckgo.com');
    await this.page.waitForSelector('#searchbox_input', 'domcontentloaded');
    await this.page.type('#searchbox_input', query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForNavigation('networkidle0')
  }

  async takeScreenshot(outputPath) {
    await this.page.screenshot({ path: outputPath });
  }
}

(async () => {
  const browser = new Browser();
  await browser.initialize('/usr/bin/chromium-browser');

  const duckDuckGo = new DuckDuckGoSearch();
  duckDuckGo.page = browser.page;

  await duckDuckGo.performSearch('MD ABU TAHER');
  await duckDuckGo.takeScreenshot(`images/image_${v4()}.png`);

  await browser.close();
})();


// to see the output by running code, download the packages using npm install and run the code using node index.js. Make sure you have cromium installed in your system.