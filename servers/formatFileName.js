// 读取图片文件，分析每种型号图片名字，塞进json中【数据库根据部署在考虑是否添加为数据库】

const fs = require('fs');

let arr = {}

fs.readdir('./file',(err,files)=>{
    if(err) return console.log('目录不存在')

    console.log(files)
    files.map(item=>readFileName(item))
})

function readFileName(item){
    fs.readdir(`./file/${item}`,(err,files)=>{
        if(err) return console.log('not files')

        // arr[item] = []
        arr[item] = files
        
    })
}

setTimeout(()=>{
    console.log('final namel:',arr)
    fs.writeFile('filaName.json',JSON.stringify(arr),(err)=>console.log(err))
},3000)