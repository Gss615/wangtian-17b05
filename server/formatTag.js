const fs = require('fs');
const _ = require('lodash')

function readFile(filaName) {

    return new Promise((resolve, rejcet) => {
        fs.readFile(filaName, (err, data) => {
            if (err) return console.log(err)

            console.log('read success!')
            resolve(JSON.parse(data))
        })
    })
}

(async ()=>{
    console.log('start')
    let result = await readFile('./datas/huawei3.json')
    let tags = _.chain(result).map(item=>{
        return _.chain(item).get('tag').split('|').get('[1]').value()
    }).value()
    console.log('tag',tags)
    let realTags = _.chain(tags).compact().uniq().value()
    console.log('realTags',realTags,realTags.length)
})()