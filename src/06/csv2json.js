const fs = require('fs')

const convCsvJson = function(file) {

    let result = []
    let lines = file.split('\n')
    let headers = lines[0].split(',')
    
    for(let i = 1; i < lines.length; i++) {
    
        let obj = {}
        let currentline = lines[i].split(',')
    
        for(let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
    
        result.push(obj)
    }
    
    return JSON.stringify(result)
}

const readSync = function(fileName) {

    console.log('Source Filename: ' + fileName)
    
    let stat = fs.statSync(fileName, 'utf8')

    console.log('Size: ' + stat.size)
    console.log('Last Change Time: ' + stat.ctime)

    let timePre = new Date()
    let file = fs.readFileSync(fileName, 'utf8')
    let timePost = new Date()

    console.log('Length (entries): ' + file.split('\n').length)
    console.log('readFileSync duration (ms): ' + (timePost - timePre))
    
    return file
}

const writeSync = function(fileName, file) {

    console.log('Target Filename: ' + fileName)

    let timePre = new Date()

    let json = convCsvJson(file)
    fs.writeSync(fileName, json)

    let timePost = new Date()
    console.log('file process duration (ms): ' + (timePost - timePre))
    
}

const readWriteAsync = function(fileName, targetFileName) {

    let timePre = new Date()

    fs.readFile(fileName, "utf8", (err, file) => {

        if (err) throw err

        let timePost = new Date()
        console.log('readFile duration (ms): ' + (timePost - timePre))

        writeAsync(targetFileName, file)
    })
}

const writeAsync = function(fileName, file) {

    console.log('Target Filename: ' + fileName)

    let timePre = new Date()

    let json = convCsvJson(file)

    fs.writeFile(fileName, json, (err) => {
        if (err) {
            console.error(`Failed to write file: ${err}`)
        }

        let timePost = new Date()
        console.log('file process duration (ms): ' + (timePost - timePre))
    })
}

const dir = 'csv/'

const sourceFileName = dir + process.argv[2]
const targetFileName = dir + process.argv[3]

//writeSync(targetFileName, readSync(sourceFileName))
readWriteAsync(sourceFileName, targetFileName)
