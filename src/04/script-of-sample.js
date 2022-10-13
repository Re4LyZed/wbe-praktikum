// require for local testing and comment it out for deployment (grading)
//require('./scripts.js')

const scriptOfSample = function(str, scripts) {

    let charCode = str.charCodeAt(0)

    for (const script of scripts) {
        for (const element of script.ranges) {
            if (charCode >= element[0] && charCode <= element[1]) {
                return script.name
            }
        }
    }    

    return "unknown"
}

/*
console.log( scriptOfSample("A", SCRIPTS) ) // "Latin"
console.log( scriptOfSample("英", SCRIPTS) ) // "Han"
console.log( scriptOfSample("я", SCRIPTS) ) // "Cyrillic"
*/

module.exports = { scriptOfSample }
