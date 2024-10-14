const fs = require('fs')
const PATH = require('./path')

function main() {
    const words = fs
        .readFileSync(PATH.input, 'utf-8')
        .split('\n')
        .map((x) => x.toLowerCase().trim())

    const combinations = []

    function generateCombinations(prefix, index) {
        if (index === words.length) {
            combinations.push(prefix)
            return
        }

        for (let char of words[index]) {
            generateCombinations(prefix + char, index + 1)
        }
    }

    generateCombinations('', 0)

    fs.writeFileSync(PATH.combinations, combinations.join('\n'), 'utf-8')
    console.log(`Generated ${combinations.length} combinations and wrote them to combinations.txt`)
}

main()
