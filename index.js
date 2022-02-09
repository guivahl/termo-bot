const Game = require('./Game.js')
const Database = require('./Database.js')

const main = async () => {
    const database = new Database()
    const game = new Game()

    await database.connect()
    await game.init()

    const firstWord = await database.firstWord(game.wordLength)

    const attempt = await game.attempt(firstWord)

    await game.end()
}

main().catch(e => console.log(e))


