const { launch } = require("qawolf");
const selectors = require("../selectors/example");

describe('example', () => {
  let browser;

  beforeAll(async () => {
    browser = await launch({ url: "https://http//localhost:3030" });
  });

  afterAll(() => browser.close());
  
  it('can click "Finding customers for your new business" link', async () => {
    await browser.click(selectors[0]);
  });
});