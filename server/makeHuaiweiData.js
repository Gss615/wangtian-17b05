const fs = require('fs')
const _ = require('lodash')


const writeFile = (fileName,content)=>{
    fs.writeFile(`./file/${fileName}.json`,JSON.stringify(content),(err)=>{
        if(err) return console.log(err)
        console.log('写入文件成功')
    })
}

function readFile(filaName) {

    return new Promise((resolve, rejcet) => {
        fs.readFile(filaName, (err, data) => {
            if (err) return console.log(err)

            console.log('read success!')
            resolve(JSON.parse(data))
        })
    })

}

( async ()=>{

    const datas = await readFile('./huawei1.json')
    console.log('初始数据长度',datas.length)
    const result = _.chain(datas).compact().filter(item=>item.tag && item.title && item.table && item.dec && item.features).value()
    console.log(_.size(result))
    writeFile('huawei2',result)


})()


// 数据格式
// "tag": "企业网络|交换机|园区交换机|核心/汇聚交换机|CloudEngine S12700E系列交换机|s12700e",
// "title": "CloudEngine S12700E系列交换机",
// "link": "https://e.huawei.com/cn/material/networking/b9f58ad188994a3dbd56580b036230a3",
// "table": {

// },
// "dec": "CloudEngine S12700E系列交换机是华为面向Wi-Fi 6全无线时代高端园区网络推出的全新一代旗舰级核心交换机，具备领先的数据交换能力及海量的终端接入能力，同时提供随板AC、VxLAN、业务随行、智能HQoS、iPCA、SVF等创新特性，是构建Wi-Fi 6时代高品质园区网络核心交换机的理想选择，助力全球客户数字化转型。",
// "features": 