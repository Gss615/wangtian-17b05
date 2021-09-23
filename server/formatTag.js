const fs = require('fs')
const _ = require('lodash')



fs.readFile('./datas/huawei3.json', (err, data) => {
    if (err) return console.log(err)

    console.log('read success!')
    let temp = JSON.parse(data)
    let result = _.chain(temp).map(item=>{
        return _.chain(item).get('tag').split('|').take(2).last().value()
    }).groupBy().value()
    console.log(result)
})