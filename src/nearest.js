const { distance } = require('fastest-levenshtein')
const fs = require('fs')
const PATH = require('./path')

function main() {
    const filtered = fs
        .readFileSync(PATH.filtered, 'utf-8')
        .split('\n')
        .map((x) => x.toLowerCase().trim())

    const combinations = fs
        .readFileSync(PATH.combinations, 'utf-8')
        .split('\n')
        .map((x) => x.toLowerCase().trim())

    const nearest = combinations
        .map((word) => {
            let min = Infinity
            let nearest = null

            for (const filt of filtered) {
                const d = distance(word, filt)
                if (d < min) {
                    min = d
                    nearest = filt
                    process.stdout.write(`\r${word} -> ${nearest} (${min}) ${' '.repeat(10)}`)
                }
            }

            return { word, nearest, score: min }
        })
        .map(({ word, nearest, score }) => `${score},${word},${nearest}`)
        .sort()

    const unique = [...new Set(nearest)]

    fs.writeFileSync(PATH.nearest, unique.join('\n'), 'utf-8')
}

main()
