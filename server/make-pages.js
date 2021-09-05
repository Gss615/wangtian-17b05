
const fs = require('fs');
const { flatten, reject } = require('lodash');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const _ = require('lodash')


const templates = (title,dec,img,order,category,template,table,features,link)=>{
  return `---
id: '1'
price: '49.40'
title: ${title}
description: ${dec}
default_thumbnail_image: images/plant1-lg.jpg
default_original_image: images/plant1-lg.jpg
featured: true
order: ${order}
category: ${category}
other1: 
  table: ${JSON.stringify(table)}
other2:
  features: ${JSON.stringify(features)}
other3: ${link}
other4:
  images: ${JSON.stringify(img)}
seo:
  title: Nulla suscipit
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Nulla suscipit
      keyName: property
    - name: 'og:description'
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      keyName: property
    - name: 'og:image'
      value: images/plant1-lg.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Nulla suscipit
    - name: 'twitter:description'
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    - name: 'twitter:image'
      value: images/plant1-lg.jpg
      relativeUrl: true
template: product
---

# Nulla suscipit

Aliquam quis laoreet lectus. Proin non mattis nulla, quis posuere mi. Mauris venenatis, magna at pellentesque commodo, lectus risus vehicula elit, nec dignissim nisl sapien id leo. Nulla non pretium metus, vitae finibus lectus. Aliquam in posuere risus. Curabitur ultrices ornare magna porttitor commodo. Curabitur eu tempor orci, sed pretium quam. Vestibulum condimentum, arcu nec pulvinar fringilla, lorem odio varius arcu, in porta tellus eros sed neque. Suspendisse efficitur eget erat sit amet efficitur. Proin maximus nibh eu sapien consequat, non porttitor risus consequat. Donec maximus odio sed nibh convallis luctus.`
}

const writeMD = (fileName,content)=>{
    fs.writeFile(`../src/pages/products/${fileName}.md`,content,(err)=>{
        if(err) return console.log(err)
    })
}
const readFile = (fileName)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(fileName,'utf-8',(err,res)=>{
            if(err) {
                reject(err)
                return console.log(err)
            }
            resolve(JSON.parse(res))
        })
    })
}
readFile('./final1.json').then((res,err)=>{
    if(err) return console.log(err);
    console.log(res);
    _.compact(res).map((list,i)=>{
        const content = templates(list.title,list.dec,list.tag.imgsUrl,i, `src/pages/category/${list.tag.tag}.md`,list.tag,list.table,list.features,list.link)
        console.log(i)
        writeMD(list.title,content)
    })
    // data.map((list,i)=>{
    //     const content = templates(list.title,list.dec,i,'src/pages/category/bigplants.md','product')
    //     writeMD(content)
    // })
})

