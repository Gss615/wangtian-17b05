const fs = require('fs')
const _ = require('lodash')

fs.readFile('filaName.json', (err, data) => {
    if (err) return console.log(err)

    console.log('read success!')
    let temp =_.values(JSON.parse(data)) 
    console.log(_.chain(temp).flatten().uniqBy(item=>item.toLowerCase()).value())
})