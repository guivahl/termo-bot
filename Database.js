const path = require('path')
const knex = require('knex')
const env = require('dotenv')

env.config()

const knexConfig = {
    client: 'pg',
    connection: process.env.DATABASE_CONNECTION
}

const example = [
    { letter: 'e', position: 0, accurate: 'place' },
    { letter: 'n', position: 1, accurate: 'wrong' },
    { letter: 't', position: 2, accurate: 'wrong' },
    { letter: 'r', position: 3, accurate: 'place' },
    { letter: 'e', position: 4, accurate: 'wrong' }
  ]
  

class Database {
    async connect(config = knexConfig) {
        this.knex = await knex(knexConfig)
    }

    async firstWord(wordLength) {
        const [{ ortografia }] = await this
            .knex('words')
            .where('nb_letras', `${wordLength}`)
            .orderByRaw('CAST(freq_orto AS INT) DESC')
            .limit(1)

        return ortografia
    }

    async fetchNewWord (attempts) { 
        const placeLetters = attempts.reduce((acc, attempt) => {
            const [letters] = Object.values(attempt)

            const right = letters.filter(({ accurate }) => accurate === 'right')
            const place = letters.filter(({ accurate }) => accurate === 'place')

            const wrong = letters.filter(({ accurate, letter }) => 
                accurate === 'wrong' && 
                !place.find(place => place.letter === letter)
            )

            if (right.length > 0) acc.right.push(...right)
            if (place.length > 0) acc.place.push(...place)
            if (wrong.length > 0) acc.wrong.push(...wrong)

            return acc
        }, {
            right: [],
            place: [],
            wrong: []
        })

        console.log(placeLetters)

        const [{ ortografia }] = await this
            .knex('words')
            .where('nb_letras', `${wordLength}`)
            .andWhereRaw()
            .orderByRaw('CAST(freq_orto AS INT) DESC')
            .limit(1)

        return ortografia
    }
}

module.exports = Database