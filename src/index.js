const Game = require('./Game.js')
const Database = require('./Database.js')
const tweet = require('./tweet.js')

const ATTEMPTS_AVAILABLE = 6
const SHOULD_TWEET = false

const main = async () => {
    const database = new Database()
    const game = new Game()

    await database.connect()
    await game.init()

    let word = await database.firstWord(game.getWordLength())

    let attempt = await game.attempt(word)

    console.log(`Primeira palavra: ${word}`)

    while (!game.isAttemptRight(attempt) && game.getAttempts().length < ATTEMPTS_AVAILABLE) {
        word = await database.fetchNewWord(game.getAttempts(), game.getWords(), game.getWordLength())

        console.log(`Próxima palavra: ${word}`)

        attempt = await game.attempt(word)
    }

    game.isAttemptRight(attempt) ? console.log(`\nPalavra certa: ${word}! Tentativas: ${game.getAttempts().length}!`) : console.log(`As chances acabaram :(`)

    if (SHOULD_TWEET && game.isAttemptRight(attempt)) await tweet(game.getAttempts(), ATTEMPTS_AVAILABLE)

    await game.end()
}

main().catch(e => console.log(e))
