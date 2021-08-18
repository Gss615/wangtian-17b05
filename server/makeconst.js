const fs = require('fs');
const _ = require('lodash')
const http = require('http')

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

        }
    })
    console.log(newdata,newdata.length)
});




