const puppeteer = require('puppeteer')

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

        await this.page.goto('https://term.ooo/')
        
        await this.page.mouse.click(0, 0)
    }

    async attempt(word) {
        await this.page.keyboard.type(word)
        await this.page.keyboard.press('Enter')

        const element = await this.page.waitForSelector(`[aria-label="palavra ${this.attempts.length + 1}"]`)

        const value = await element.evaluate(el => {
            return el.innerHTML
        })
    
        const awnsers = value.replace(/\n|\s\s+/g, '').split('/div>').filter(Boolean)

        const attempt = awnsers.map((awnser, index) => {
            const accurate = checksLetter(awnser)

            return {
                letter: word[index],
                position: index,
                accurate
            }
        })
        
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