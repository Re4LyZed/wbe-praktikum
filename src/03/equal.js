const equal = function (par1, par2) {
    
    if (par1 === par2) {
    
        return true
    
    } else if (typeof(par1) == 'object' && par1 != null && typeof(par2) == 'object' && par2 != null) {
        
        if (Array.isArray(par1) != Array.isArray(par2)) {
            return false
        }

        if (Array.isArray(par1)) {
            
            // Array

            if (par1.length != par2.length) {
                return false
            }
            
            for (let index = 0; index < par1.length; index++) {
                if (par1[index] != par2[index]) {
                    return false
                }
            }


        } else {
            
            // Object

            par1Keys = Object.keys(par1)
            par2Keys = Object.keys(par2)
           
            if (par1Keys.length != par2Keys.length) {
                return false
            }

            for (let key of par1Keys) {
                if (par1[key] !== par2[key]) {
                    return false
                }
            }

        }

        return true

    } else {

        return false

    }
}

console.log(equal(16, 16))
console.log(equal("hi", "hi"))
console.log(equal({}, {}))
console.log(equal({a:1, b:2}, {b:2, a:1}))
console.log(equal({a:1, b:2}, {c:3, b:2, a:1}))
console.log(equal({a:{}}, {a:{}}))
let emptyObj = undefined
console.log(equal({a:emptyObj}, {a:emptyObj}))
console.log(equal(null, null))

module.exports = { equal }
