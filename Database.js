const path = require('path')
const knex = require('knex')
const env = require('dotenv')

env.config()

const knexConfig = {
    client: 'pg',
    connection: process.env.DATABASE_CONNECTION
}

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

    async fetchNewWord (attempts, words, wordLength) { 
        const alreadyFetchedWords = words.reduce((acc, word) => acc ? `${acc},'${word}'` : `'${word}'`, '')

        const sqlWhereQuery = attempts.reduce((acc, attempt) => {
            const [letters] = Object.values(attempt)

            const right = letters.filter(({ accurate }) => accurate === 'right')
            const place = letters.filter(({ accurate }) => accurate === 'place')

            const wrong = letters.filter(({ accurate, letter }) => 
                accurate === 'wrong' && 
                !place.find(place => place.letter === letter) && 
                !right.find(right => right.letter === letter)
            )

            const rightQuery = right.length > 0 ? right.reduce((acc, right) => acc.concat(`${rightLetterQuery(right.letter, right.position)}`), '') : '' 

            const placeQuery = place.length > 0 ? place.reduce((acc, place) => acc.concat(`${placeLetterQuery(place.letter, place.position)}`), '') : ''

            const wrongQuery = wrong.length > 0 ? wrong.reduce((acc, wrong) => acc.concat(`${wrongLetterQuery(wrong.letter)}`), '') : ''

            return acc.concat(rightQuery, placeQuery, wrongQuery)  
        }, `nb_letras = '${wordLength}' AND UNACCENT(ortografia) NOT IN (${alreadyFetchedWords}) AND ortografia ~ '^[[:alnum:]]+$' `)

        const [{ ortografia = '' }] = await this
            .knex('words')
            .select(this.knex.raw('UNACCENT(ortografia) as ortografia'))
            .whereRaw(sqlWhereQuery)
            .orderByRaw('CAST(freq_orto AS INT) DESC')
            .limit(1)
        
        return ortografia
    }
}

const rightLetterQuery = (letter, position) => `AND SUBSTRING(UNACCENT(ortografia), ${position + 1}, 1) = '${letter}' `
const placeLetterQuery = (letter, position) => `AND UNACCENT(ortografia) LIKE '%${letter}%' AND SUBSTRING(UNACCENT(ortografia), ${position + 1}, 1) != '${letter}' `
const wrongLetterQuery = (letter) => `AND UNACCENT(ortografia) NOT LIKE '%${letter}%' `

module.exports = Database