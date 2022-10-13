const factorial = function (n) {

    if(typeof(n) != 'bigint') {
        return n <= 1 ? 1 : n * factorial(n - 1)
    } else {
        n = BigInt(n)
        return (n == 0n || n == 1n) ? 1n : n * factorial(n - 1n)
    }
}

console.log(factorial(10))
console.log(factorial(50n))

module.exports = { factorial }
