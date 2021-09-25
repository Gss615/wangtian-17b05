const fs = require('fs')
const _ = require('lodash')



fs.readFile('final1.json', (err, data) => {
    if (err) return console.log(err)

    console.log('read success!')
    let temp = JSON.parse(data)
    for(let i = temp.length;i>0;i--){

    }
})