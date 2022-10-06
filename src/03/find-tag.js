const findTag = function(str) {
    
    //console.log(str)
    let start = str.search('<([^ <>]+)>')
    //console.log(start)
    str = str.slice(start, str.length)
    //console.log(str)
    let end = str.search('>')
    //console.log(end)
    let result = str.slice(0+1, end)

    return result.length > 0 ? result : undefined
}

console.log(findTag("<header>Text</header"))
console.log(findTag("blabla <br> blabla"))
console.log(findTag("123245 </header> bla"))
console.log(findTag("123245 <hea der> bla"))
console.log(findTag("123245 <hea<der> bla"))
console.log(findTag("123245 <hea<der bla"))

module.exports = { findTag }
