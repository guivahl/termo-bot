const fs = require('fs')
const Jimp = require('jimp')

const pixelToHex = pixel => {
    const HEX_CODE = 16

    const hexCode = pixel.toString(HEX_CODE).slice(0, -2)

    return hexCode
}

const getWordAccurate = async (filename, qtdAttempts, wordLength) => {
    const image = await Jimp.read(filename)
   
    const hexColorDictionary = {
        '#3aa394': 'right',
        '#d3ad69': 'place',
        '#312a2c': 'wrong'
    }
  
    const INITIAL_WIDTH = 150
    const INITIAL_HEIGHT = 60
  
    const WIDTH_BETWEEN_LETTERS = 110
    const HEIGHT_BETWEEN_LETTERS = 110

    const accurate = Array.from({ length: wordLength }).map((_, index) => {
        const width = INITIAL_WIDTH + (index * WIDTH_BETWEEN_LETTERS)
        const height = INITIAL_HEIGHT + (qtdAttempts * HEIGHT_BETWEEN_LETTERS)
    
        const pixelColor = image.getPixelColor(width, height)
        
        const hexColor = pixelToHex(pixelColor)
    
        const letterAccurate = hexColorDictionary[`#${hexColor}`]

        return letterAccurate
    })

    return accurate
}

const removeFile = filename => fs.rmSync(filename)

module.exports = {
    getWordAccurate,
    removeFile
}