const Game = require('./Game.js')
const Database = require('./Database.js')

const ATTEMPTS_AVAILABLE = 6

const main = async () => {
    const database = new Database()
    const game = new Game()

    await database.connect()
    await game.init()

    let word = await database.firstWord(game.getWordLength())

    let attempt = await game.attempt(word)

    console.log(`Primeira palavra: ${word}`)

    while (game.isAttemptRight(attempt) && game.getAttempts().length < ATTEMPTS_AVAILABLE) {
        word = await database.fetchNewWord(game.getAttempts(), game.getWordLength())

        console.log(`Próxima palavra: ${word}`)

        attempt = await game.attempt(word)
    }

    game.isAttemptRight(attempt) ? console.log(`\nPalavra certa: ${word}! Tentativas: ${game.getAttempts().length + 1}!`) : console.log(`As chances acabaram :(`)

    await game.end()
}

main().catch(e => console.log(e))
