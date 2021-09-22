// 去除原始数据，数据不全的型号。

const fs = require('fs')
const _ = require('lodash')
const util = require('util');
const readdir = util.promisify(fs.readdir);

let sortArr = [
    "01.png",
    "02.png",
    "03.png",
    "04.png",
    "05.png",
    "06.png",
    "07.png",
    "08.png",
    "09.png",
    "10.png",
    "01-Front.png",
    "front_HD.png",
    "front_ME60-X8A.png",
    "front_left_HD.png",
    "front_right_HD.png",
    "front_top_HD.png",
    "front.png",
    "front_2.png",
    "front_3.png",
    "front_bottom.png",
    "front_left.png",
    "front_right.png",
    "front_top.png",
    "06-Front_right_down.png",
    "front_top_ne05e_sr.png",
    "front_ne08e_s9_AC.png",
    "front_top_ne08e_s9_DC.png",
    "front_letf_NE20E_S8A_AC.png",
    "front_letf_NE20E_S8A_DC.png",
    "front_NE20E_S8A_AC.png",
    "front_NE20E_S8A_DC.png",
    "front_left_NetEngine-40E-X8AK.png",
    "front_NetEngine-40E-X8AK.png",
    "front_right_NetEngine-40E-X8AK.png",
    "front_top_NetEngine-40E-X8AK.png",
    "03-Front_left_down.png",
    "04-Front_right_down.png",
    "top.png",
    "left.png",
    "left_2.png",
    "left_3.png",
    "right.png",
    "right_11.png",
    "right_12.png",
    "right_13.png",
    "right_2.png",
    "right_3.png",
    "stand_left.png",
    "stand_right.png",
    "02-Left.png",
    "03-Bottom.png",
    "buttom-cover.png",
    "buttom.png",
    "rear_top_HD.png",
    "rear_top_NetEngine-40E-X8AK.png",
    "08.png",
    "bottom.png",
    "07-Rear.png",
    "09-Rear_left_down.png",
    "10-Rear_right_down.png",
    "rear.png",
    "rear_left.png",
    "rear_right.png",
    "07-Rear_left_down.png",
    "05-Rear.png",
    "rear_top.png"
]


const writeFile = (fileName, content) => {
    fs.writeFile(`./datas/${fileName}.json`, JSON.stringify(content), (err) => {
        if (err) return console.log(err)
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

(async () => {

    const datas = await readFile('./datas/huawei2.json')
    const allFiles = await readFile('./datas/filename.json')

    console.log('初始数据长度', datas.length)
    const result = _.chain(datas).compact()
        .filter(item => item.tag && item.title && _.size(item.table.single) > 0 && item.dec && item.features) // 去除部分无效的数据
        .map(item => {
            let key = _.chain(item).get('version.default').split('_').head().toLower().value()
            let verTag = _.chain(item).get('version.tag').replace('系列','').trim().toLower().value()
            let table = _.chain(item)
                .get('table.single')
                .head()
                .slice(1)
                .head()
                .get('text')
                .split('\n')
                .head()
                .split('&')
                .map(item=>RemoveChinese(item))
                .head()
                .trim()
                .toLower()
                .value()
            // 处理默认展示的产品
            key = _.chain(key)
                .replace('_front_left', '')
                .replace('_pic_front', '')
                .replace('-front-view', '')
                .replace('-Front','')
                .replace('-front','')
                .replace('_Front', '')
                .replace('_front', '')
                .replace(' front view', '')
                .replace('_front', '')
                .replace(' 1+4', '')
                .value()

            item.name = key
            item.imgs = allFiles[key] || '没有图片'
            // 根据标题（系列）
            if(item.imgs === '没有图片' && verTag){
                key = verTag
                item.imgs = allFiles[key] || '没有图片'
                item.name = key
            }
            // 根据 所有型号
            if (item.imgs === '没有图片') {
                key = _.chain(item).get('version.all').head().toLower().value() || ''
                item.name = key || ''
                item.imgs = allFiles[key] || '没有图片'
                if(item.imgs === '没有图片' && (key.indexOf('airengine')>-1)){
                    let temp = key
                    key = temp.replace(' ','')
                    item.name = key
                    item.imgs = allFiles[key] || '没有图片'
                }
            }

            if (item.imgs === '没有图片' && table) {//通过表格内的型号名称作为图片地址
                key = table
                let temp = table
                let result = allFiles[key] || '没有图片'
                // s6730-h28y4c
                if (result === '没有图片' && (table.indexOf('cloudengine') > -1)) {
                    key = temp.replace('cloudengine ', '')
                    item.name2 = key
                    result = allFiles[key] || '没有图片'
                    if(result === '没有图片'){
                        key = temp.replace('cloudengine ', 'ce')
                        result = allFiles[key] || '没有图片'
                        if(result === '没有图片'){
                            key = temp.replace('cloudengine ', '')
                            result = allFiles[key] || '没有图片'
                            if(result === '没有图片'){
                                key = temp.replace('cloudengine ', 'ce')
                                result = allFiles[key] || '没有图片'
                            }
                        }
                    }

                }

                if (result === '没有图片' && (table.indexOf('netengine') > -1)) {
                    key = temp.replace('netengine ', '')
                    result = allFiles[key] || '没有图片'

                }

                if(result === '没有图片' && (table.indexOf('airengine') > -1)){
                    key =  temp.replace(' ','')
                    result = allFiles[key] || '没有图片'

                }

                item.name = key
                item.imgs = result 

            }


            if(!item.imgs){
                item.imgs = '没有图片'
            }
            if(item.imgs === '没有图片' && item.title && typeof item.title === 'string'){
                let temp = item.title
                item.name = 'other'
                item.imgs = {org:'other',img:[_.chain(temp).split('/').join('-').value()+'.png']}
            }
            // if(typeof item.imgs !== 'string'){
            //     item.imgs =  sortBy(item.imgs,sortArr)
            // }

            return item
        }).value()
    console.log(_.size(result))
    writeFile('./huawei3', result)
    //TODO 增加版本，做seo优化
    // const imgs = await readFile
    // const realImgName = _.chain(result).map(item=>_.last(item.tag.split('|'))).compact().value()


})()

function getFileName(path) {
    return new Promise((resolve, reject) => {
        readdir(path, (err, files) => {
            if (err) return reject(err);
            return resolve(files.filter(temp => temp !== '.DS_Store'))
        })
    })
}
// getFileName('./images/files/temp copy').then( res=>{
//     // console.log('res',res)
//      let temp = readeall(res,0,{})   
// })
async function readeall(info, i, result) {
    // console.log('=====',result)
    if (i >= info.length) {
        fs.writeFile('./datas/filename.json', JSON.stringify(result), err => {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        })
        return
    }
    let temp = await getFileName(`./images/files/temp copy/${info[i]}`)
    console.log(i, info[i], temp)
    let name = _.chain(info[i]).split('_').dropRight().join('_').toLower().value()
    // let temp1 = _.chain(name).slice(1).reverse().reduce((res,current)=>{
    //     let  result = {}

    //     result[current.toLowerCase()] = res
    //     return result
    // },temp)
    // if(_.size(name) === 1){
    //     result[name[0].toLowerCase()] = temp
    // }else{
    //     result[name[0].toLowerCase()] = temp1
    // }
    result[name] = {
        org:info[i],
        img:temp
    }
    return readeall(info, i + 1, result)
}

function RemoveChinese(strValue) {
    let result
    if (strValue != null && strValue != "") {
        var reg = /[\u4e00-\u9fa5]/g;
        result = strValue.replace(reg, "");
        return result
    }
    else
        return "";
}
function removerTrim(strValue) {
    if (strValue != null && strValue != "") {
        return strValue.replace(/\s+/g, '')
    }
    else
        return "";
}



function sortBy(res,sortArr){
    if(!res) return
    if(res.length < 1) return 
    let result = []
    // for(let i = 0;i<sortArr.length;i++){
    //     for(let j=res.length;j>0;j--){
    //         if( res[j] && sortArr[i] === res[j]) result.push(res[j])
    //     }
    // }
    result = _.intersection(sortArr,res)
    let temp = _.difference(res,sortArr)
    // 如果temp内有值，说明排序中存在未包含的文件名，添加进去重新排序即可。
    if(temp && temp.length>0){
        console.log('=====================',temp)
    }
    return result
}


// 数据格式
// "tag": "企业网络|交换机|园区交换机|核心/汇聚交换机|CloudEngine S12700E系列交换机|s12700e",
// "title": "CloudEngine S12700E系列交换机",
// "link": "https://e.huawei.com/cn/material/networking/b9f58ad188994a3dbd56580b036230a3",
// "table": {

// },
// "dec": "CloudEngine S12700E系列交换机是华为面向Wi-Fi 6全无线时代高端园区网络推出的全新一代旗舰级核心交换机，具备领先的数据交换能力及海量的终端接入能力，同时提供随板AC、VxLAN、业务随行、智能HQoS、iPCA、SVF等创新特性，是构建Wi-Fi 6时代高品质园区网络核心交换机的理想选择，助力全球客户数字化转型。",
// "features": 