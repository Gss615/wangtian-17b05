// 去除原始数据，数据不全的型号。

const fs = require('fs')
const _ = require('lodash')
const util = require('util');
const readdir = util.promisify(fs.readdir);

const writeFile = (fileName,content)=>{
    fs.writeFile(`./datas/${fileName}.json`,JSON.stringify(content),(err)=>{
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
    const allFiles = await readFile('./datas/filename.json')
    
    console.log('初始数据长度',datas.length)
    const result = _.chain(datas).compact()
                                .filter(item=>item.tag && item.title && _.size(item.table.single)>0 && item.dec && item.features) // 去除部分无效的数据
                                .map(item=>{
                                    item.version = _.chain(item.table.single).head().map('text').slice(1).value()
                                    let name = RemoveChinese((_.chain(item.version).last().split('\n').head().replace('NetEngine','').replace('CloudEngine','').value()).toLowerCase())
                                    
                                    item.imgs = allFiles[name] || allFiles['ce'+name] || allFiles['ne'+name] || '没有图片'
                                    if(item.imgs === '没有图片'){
                                        let  temp = name.split('-')
                                        item.name1 = temp[0]
                                        item.imgs = allFiles[temp[0]] || allFiles['030'+temp[0]] || allFiles['ce'+temp[0]] || allFiles['airengine'+temp[0]] || allFiles['ne'+temp[0]] || allFiles['optix'+temp[0]] || '没有图片'
                                    }
                                    item.name = name
                                    return item
                                }).value()
    console.log(_.size(result))
    writeFile('./huawei2',result)
    //TODO 增加版本，做seo优化
    // const imgs = await readFile
    // const realImgName = _.chain(result).map(item=>_.last(item.tag.split('|'))).compact().value()


})()

function getFileName (path){
    return new Promise((resolve,reject)=>{
        readdir(path,(err,files)=>{
            if(err) return reject(err);
            return resolve(files.filter(temp=>temp !== '.DS_Store'))
        })
    })
}
// getFileName('./images/files/temp').then( res=>{
//     console.log('res',res)
//      let temp = readeall(res,0,{})   
// })
async function readeall(info,i,result){
    // console.log('=====',result)
    if(i>=info.length){
        fs.writeFile('./datas/filename.json', JSON.stringify(result), err => {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        })
        return
    }
    let temp = await getFileName(`./images/files/temp/${info[i]}`)
    console.log(i,info[i],temp)
    let name = _.chain(removerTrim(info[i])).split('_').head().split('-').value()
    let temp1 = _.chain(name).slice(1).reverse().reduce((res,current)=>{
        let  result = {}

        result[current.toLowerCase()] = res
        return result
    },temp)
    if(_.size(name) === 1){
        result[name[0].toLowerCase()] = temp
    }else{
        result[name[0].toLowerCase()] = temp1
    }
    // result[info[i]] = temp
    return readeall(info,i+1,result)
}

function RemoveChinese(strValue) {  
    let result 
    if(strValue!= null && strValue != ""){  
        var reg = /[\u4e00-\u9fa5]/g;   
       result = strValue.replace(reg, "");  
       return result.replace(/\s+/g,'') 
    }  
    else  
        return "";  
}  
function removerTrim(strValue){
    if(strValue!= null && strValue != ""){   
       return strValue.replace(/\s+/g,'') 
    }  
    else  
        return "";  
}

// 数据格式
// "tag": "企业网络|交换机|园区交换机|核心/汇聚交换机|CloudEngine S12700E系列交换机|s12700e",
// "title": "CloudEngine S12700E系列交换机",
// "link": "https://e.huawei.com/cn/material/networking/b9f58ad188994a3dbd56580b036230a3",
// "table": {

// },
// "dec": "CloudEngine S12700E系列交换机是华为面向Wi-Fi 6全无线时代高端园区网络推出的全新一代旗舰级核心交换机，具备领先的数据交换能力及海量的终端接入能力，同时提供随板AC、VxLAN、业务随行、智能HQoS、iPCA、SVF等创新特性，是构建Wi-Fi 6时代高品质园区网络核心交换机的理想选择，助力全球客户数字化转型。",
// "features": 