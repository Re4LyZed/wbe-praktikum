const setInList = function(lst, idx, val) {
    let clone = [...lst]
    clone[idx] = val
    return clone
}

const setInObj = function(obj, attr, val) {
    let clone = {...obj}
    clone[attr] = val
    return clone
}

export { setInList, setInObj }

/*
console.log("Test setInList()")
let lista = [0, 1, [2, 3], 4, {a: 1}] 
let listb = setInList(lista, 3, 99) 
console.log(lista)
console.log(listb)
console.log(lista[2])
console.log(lista[2] === listb[2])
console.log(lista[4] === listb[4])

console.log("Test setInObj()")
let obja = { a: {a:1}, b: 5, c: [1,2,3] } 
let objb = setInObj(obja, "b", 99) 
console.log(obja)
console.log(objb)
console.log(obja.a === objb.a)
console.log(obja.c === objb.c)
*/