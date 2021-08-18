const fs = require('fs');
const _ = require('lodash')
let request = require('request')
let path = require('path')


const base = (name)=> `https://info.support.huawei.com/network/imagelib/downloadZip4web?productName=${name}&imgType=pic%2524%2524${name}_pic.zip&domain=0&lang=zh&ipNum=local`

fs.readFile('./final.json',{encoding:'utf-8'},(err,data)=>{
    if(err) return console.log(err);
    console.log('success')

    const newdata = _.map(JSON.parse(data),res=>{
        if(res && res.tag) {
            
            return _.chain(res.tag.version).difference(res.tag.expand).head().value()


        } else{
             return console.log(res,'=======') 
        }
    })
    newdata.map(item=>{
        if(item){
            downloadZIP(item)
        }
    })
    
    console.log(newdata,newdata.length)
});

//文件下载


//创建文件夹目录
const dirPath = path.join(__dirname, "file");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log("文件夹创建成功");
} else {
    console.log("文件夹已存在");
}

//循环多线程下载
function downloadZIP(name){
    let fileName = name+'.zip';
    let url = base(name)
    let stream = fs.createWriteStream(path.join(dirPath, fileName));
    request(url).pipe(stream).on("close", function (err) {
        console.log("文件[" + fileName + "]下载完毕");
    });
}

