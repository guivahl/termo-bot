const puppeteer = require('puppeteer')
const iPhone = puppeteer.devices['iPhone 6']

const WORD_LENGTH = 5

const defaultOptions = { 
    headless: false,
    slowMo: 250
 }

const checksLetter = str => {
    if (str.includes('letter wrong')) return 'wrong'
    if (str.includes('letter place')) return 'place'
    
    return 'right'
}

const delay = (time = 2000) => new Promise((resolve, reject) => setTimeout(resolve, time))

class Game {
    constructor(wordLength = WORD_LENGTH) {
        this.wordLength = wordLength

        this.words = []
        this.attempts = []
    }

    async init(options = defaultOptions) {
        this.browser = await puppeteer.launch({ 
            headless: false,
            slowMo: 200
         })

        this.context = await this.browser.createIncognitoBrowserContext()

        this.page = await this.context.newPage()
        
        await this.page.emulate(iPhone)

        await this.page.goto('https://term.ooo/')
        
        await this.page.mouse.click(0, 0)
    }

    async attempt(word) {
        await this.page.keyboard.type(word)
        await this.page.keyboard.press('Enter')

        await delay()

        const timestamp = Date.now()

        await this.page.screenshot({ 
            path: `screenshots/attempt_${this.attempts.length + 1}_${timestamp}.png`,
            clip: {
                x: 0,
                y: 100,
                width: 375,
                height: 400
            }
        });
        
        this.words.push(word)
        this.attempts.push({ [this.attempts.length]: attempt })

        return attempt
    }

    getWordLength () {
        return this.wordLength
    }

    getAttempts () {
        return this.attempts
    }
    
    getWords () {
        return this.words
    }

    isAttemptRight (attempt) {
        return attempt.every(({ accurate }) => accurate === 'right')
    }

    async end () {
        await this.browser.close()
    }
}

module.exports = Game