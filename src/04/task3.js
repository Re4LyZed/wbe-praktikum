require('./scripts.js')
console.log('==Init==')
console.log(SCRIPTS[0])

console.log('==a)==')

const oldAndLiving = function(scripts) {

    let arr = []

    for (const script of scripts) {
        if (script.year < 0 && script.living === true) {
            arr.push(script.name)
        }
    }

    return arr
}

console.log( oldAndLiving(SCRIPTS) )
// [ 'Ethiopic', 'Greek', ...]


console.log('==b)==')

// const numberOfCodes = ({ranges}) => ranges.reduce((curr, [from, to]) => curr+to-from, 0)
const numberOfCodes = function({ranges}) {

    let sum = 0

    ranges.forEach(element => {
        sum += element[1] - element[0]
    });

    return sum
}

console.log( numberOfCodes(SCRIPTS[3]) )
// 1280