const fs = require('fs')
const PATH = require('./path')

function main() {
    let file = fs.readFileSync(PATH.words, 'utf-8')
    let words = file.split('\n').map((word) => word.toLowerCase().trim())

    const combinations = fs
        .readFileSync(PATH.combinations, 'utf-8')
        .split('\n')
        .map((word) => word.toLowerCase().trim())

    console.log(`Found ${combinations.length} combinations`)
    const lengths = [...new Set(combinations.map((word) => word.length))]

    const filtered = words.filter((word) => lengths.includes(word.length))
    console.log(`Found ${filtered.length} words with [${lengths.join(',')}] lengths`)

    file = null
    words = null

    fs.writeFileSync(PATH.filtered, filtered.join('\n'), 'utf-8')

    const contains = filtered.filter((word) => combinations.includes(word))
    console.log(`Found ${contains.length} words in the combinations`)

    fs.writeFileSync(PATH.contains, contains.join('\n'), 'utf-8')
}

main()
