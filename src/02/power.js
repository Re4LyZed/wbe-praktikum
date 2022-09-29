/*
// Original
const power = function (base, exponent) {
    let result = 1

    for (let count = 0; count < exponent; count++) {
        result *= base
    }

    return result
}

console.log(power(2, 10))
*/

/*
// a)
const powerRec = function (base, exponent) {
    if (exponent == 0)
        return 1
    else
        return base * powerRec(base, exponent - 1)
}

console.log(powerRec(2, 10)) 
*/

/*
// b)
const powerRecOpt = function (base, exponent) {
    if (exponent == 0)
        return 1
    else
        if (exponent % 2 == 0)
            return (base ** (exponent / 2)) ** 2
        else
            return base * powerRecOpt(base, exponent - 1)
}

console.log(powerRecOpt(2, 10)) 
*/

// c)
const assert = require('assert')

const power = function (base, exponent) {

    // check if parameters are positive integers
    assert(Number.isInteger(base)     && Math.sign(base)     >= 0
        && Number.isInteger(exponent) && Math.sign(exponent) >= 0)

    if (exponent == 0)
        return 1
    else
        if (exponent % 2 == 0)
            return (base ** (exponent / 2)) ** 2
        else
            return base * power(base, exponent - 1)
}

console.log(power(2, 10))
/*
console.log(power(2, 3.5))
console.log(power(2, -3))
console.log(power(-3, 10))
*/

module.exports = { power }
