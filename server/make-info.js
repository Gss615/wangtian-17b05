const fs = require('fs')
const _ = require('lodash')
// 封装

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
            let temp = _.omit(item, ['imgs'])
            temp.tag = _.omit(item.tag, ['imgsUrl'])
            const version = _.get(temp,'tag.version')
            if(version){
                const key = _.intersection(temp.tag.version,fileArr)
                temp.tag.imgsUrl = {}
                temp.tag.imgsUrl[key] = sortBy(fileName[key],sortArr)
            }
         
            return temp
        })
        fs.writeFile('final1.json',JSON.stringify(result),(err)=>console.log(err))
    } catch (error) {

    }

})()

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
