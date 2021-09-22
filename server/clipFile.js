const fs = require('fs')
const _ = require('lodash')
const util = require('util');
const path = require('path');
const readdir = util.promisify(fs.readdir);

function copyFile(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src));
}

// copyFile('./a.txt', './aa.txt')

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
    const allFiles = await readFile('./datas/filename.json')
    readFile('./datas/huawei3.json').then(res=>{
        let  real = _.chain(res).filter(item=>typeof item.imgs !== 'string').map(item=>_.get(item,'imgs.org')).value()
        // let allReal = _.chain(allFiles).values().map('org').value()
        // let removeFile= _.difference(allReal,real)
        // let removeFile2= _.intersection(real,allReal)
        // console.log(removeFile2.length)
        // console.log('resal',removeFile.length,_.size(allFiles),real.length)
        _.map(allFiles,item=>{
            if(_.indexOf(real,item.org)=== -1){
                // console.log(item.org)
                deleteDir(`./images/files/temp/${item.org}`)
            }
        })
        console.log(_.size(allFiles),real.length)

      
    })

})()


// ===== 3835


/**
 * 删除文件夹功能
 * @param  {String} url  文件路径，绝对路径
 * @return {Null}   
 */
 function deleteDir(url){
    var files = [];
        
    if( fs.existsSync(url) ) {  //判断给定的路径是否存在
           
        files = fs.readdirSync(url);   //返回文件和子目录的数组
        files.forEach(function(file,index){
            var curPath = path.join(url,file);
                
            if(fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteDir(curPath);
            } else {    
                fs.unlinkSync(curPath);    //是指定文件，则删除
            }
                
        });
           
        fs.rmdirSync(url); //清除文件夹
    }else{
        console.log("给定的路径不存在！");
    }

    
}


function getFileName(path) {
    return new Promise((resolve, reject) => {
        readdir(path, (err, files) => {
            if (err) return reject(err);
            return resolve(files.filter(temp => temp !== '.DS_Store'))
        })
    })
}
// getFileName('./images/files/temp').then( res=>{
//     console.log('res',res)
//      let temp = readeall(res,0,{})   
// })


async function readeall(info, i, result) {
    // console.log('=====',result)
    if (i >= info.length) {
        console.log('=====',_.size(info))
        // fs.writeFile('./datas/filename2.json', JSON.stringify(result), err => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("success");
        //     }
        // })
        return
    }
    let temp = await getFileName(`./images/files/temp/${info[i]}`)
    console.log(i, info[i], temp)
    let name = _.chain(info[i]).split('_').head().value()
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
    result[name.toLowerCase()] = {
        org:info[i],
        img:temp
    }
    return readeall(info, i + 1, result)
}


