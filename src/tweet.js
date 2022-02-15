const { TwitterApi } = require('twitter-api-v2')
const env = require('dotenv')

env.config('../')

const DAYTIME = 1000 * 60 * 60 * 24

const INITAL_DATE = new Date('2022-01-03')

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_APP_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_APP_ACCESS_SECRET
})

const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (DAYTIME))

const templateTermoo = (attempts, totalAttempts, number) => {
    const formatIcons = attempts.reduce((acc, attempt) => {
    
        const icons = Object.values(attempt)[0].map(({ accurate }) => ICONS[accurate]).join('')
    
        return acc.concat(icons, '\n')
    }, '')
    
    const message = `joguei http://term.ooo #${number} ${attempts.length}/${totalAttempts} *\n\n${formatIcons}\npartida e tweets automatizados :)`

    return message
}

const ICONS = {
    'wrong': '⬛',
    'place': '🟨',
    'right': '🟩'
}

const tweet = async (attempts, totalAttempts) => {
    const number = diffDays(INITAL_DATE, new Date())

    const message = templateTermoo(attempts, totalAttempts, number)
    
    return twitterClient.v2.tweet(message)
}

module.exports = tweet

