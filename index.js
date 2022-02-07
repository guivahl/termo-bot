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

    const word = 'Teste'

    await page.keyboard.type(word);
    await page.keyboard.press('Enter');

    const element = await page.waitForSelector('[aria-label="palavra 1"]')
    const value = await element.evaluate(el => {
        return el.innerHTML
    })

    const awnsers = value.replace(/\s\s+/g, '').split('/div>').filter(Boolean)

    const attempt = awnsers.map((awnser, index) => {
        const accurate = checksLetter(awnser)

        return {
            letter: word[index],
            position: index,
            accurate
        }
    })
    
    console.log(attempt)

    await browser.close()
}

const checksLetter = str => {
    if (str.includes('letter wrong')) return 'wrong'
    if (str.includes('letter place')) return 'place'
    
    return 'right'
}

main().catch(e => console.log(e))