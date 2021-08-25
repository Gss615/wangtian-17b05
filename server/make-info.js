const fs = require('fs')
const _ = require('lodash')
// 封装

function readFile(filaName) {

    return new Promise((resolve, rejcet) => {
        fs.readFile(filaName, (err, data) => {
            if (err) return console.log(err)

            console.log('read success!')
            resolve(JSON.parse(data))
        })
    })

}
(async () => {
    try {
        const fileName = await readFile('./filaName.json')
        let finalData = await readFile('./final.json')
        finalData = _.compact(finalData)
        let fileArr = _.keys(fileName)
        let result = finalData.map(item => {
            console.log('------')
            let temp = _.omit(item, ['imgs'])
            temp.tag = _.omit(item.tag, ['imgsUrl'])
            const version = _.get(temp,'tag.version')
            console.log(version)
            if(version){
                const key = _.intersection(temp.tag.version,fileArr)
                temp.tag.imgsUrl = {}
                temp.tag.imgsUrl[key] = fileName[key]
            }
         
            return temp
        })
        console.log(result, '======')
        fs.writeFile('final1.json',JSON.stringify(result),(err)=>console.log(err))
    } catch (error) {

    }

})()

