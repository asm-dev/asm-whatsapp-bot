const puppeteer = require("puppeteer");

(async function main() {
  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    // Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");

    await page.waitForSelector("#pane-side");
    await delay(5000);

    // Change to contact you want to send message to
    const contactName =
      "// Enter your contact name here that you want to send messages to and make sure its on top of your contact";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector("._2aBzC");

    // Finds the message bar and focus on it
    const editor = await page.$("div[tabindex='-1']");
    await editor.focus();

    // Amount of messages you want to send
    const amountOfMessages = 0; // here add how  many message do you want to send

    // Loops through cycle of sending message
    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message =
          "I'm ASM Bot I've been created to CRASH your whatsapp 😈";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(500);
    }

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
