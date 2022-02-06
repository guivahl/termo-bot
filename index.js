const puppeteer = require('puppeteer')

const main = async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        slowMo: 250
     })

    const context = await browser.createIncognitoBrowserContext()

    const page = await context.newPage()

    await page.goto('https://term.ooo/')
    
    await page.mouse.click(0, 0);

    await page.keyboard.type('Teste');
    await page.keyboard.press('Enter');

    await browser.close()
}

main().catch(e => console.log(e))