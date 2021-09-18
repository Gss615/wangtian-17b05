// 华为交换机，资料目录 baseUrl: https://e.huawei.com/cn/products-and-solutions
const huaweiUrl = ' https://e.huawei.com/cn/products-and-solutions';
const fenlei = {
    invalid:['企业网络', '企业光网络', '数据存储', '数据中心', '企业无线', '智能协作', '机器视觉', '数字能源', '服务', '管理系统', '行业使能', '行业'],
    void:['智能协作', '数字能源', '服务', '管理系统', '行业使能', '行业']
}

const puppeteer = require('puppeteer');
const fs = require("fs");
//引入node文件路径模块(path)
const path = require("path");
// 华为交换机，资料目录 baseUrl: https://e.huawei.com/cn/products-and-solutions
const huaweiUrl = ' https://e.huawei.com/cn/products-and-solutions';
// 数据结构
let huaweiDatas = [
    {//1
        tag: '企业网络|交换机｜园区交换机｜核心/汇聚交换机',
        title: 'CloudEngine S12700E系列交换机',
        url: 'https://e.huawei.com/cn/products/enterprise-networking/switches/campus-switches/s12700e'
    },
    {//2
        tag: '企业网络|交换机｜园区交换机｜核心/汇聚交换机',
        title: 'CloudEngine S12700E系列交换机',
        url: 'https://e.huawei.com/cn/products/enterprise-networking/switches/campus-switches/s12700e'
    }
]
// 获取所有系列
async function getAllUrl(url) {
    if (i >= res.length) {
        let file = path.join(__dirname, `fenlei/fenlei.json`);
        let list = JSON.stringify(info);

        fs.writeFile(file, list, err => {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        })
        return info
    }
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.main'); // 等待主页内容显示

    const datas = await page.evaluate((fenlei) => {
        const result = []
        let tag = ''
        const Mains = document.querySelectorAll(`div.main`);
        // const List = document.querySelectorAll(`div.main ul>li`)

        for (let i = 0; i < fenlei.invalid.length; i++) {
            if(fenlei.void.indexOf(fenlei.invalid[i]) > -1) {
                const currentMain = Mains[i]
                tag = fenlei.invalid[i]
                const List = [].slice.call(currentMain.querySelectorAll(`ul>li`))
                List.map(li=>{
                    if([].slice.call(li.classList).indexOf('title') > -1){
                        // 拿到标签
                        tag = tag.split['|'][0]
                        tag = tag + '|' + li.parentElement.parentElement.parentElement.querySelector('div.title-box span').innerText
                        tag = tag + '|' + li.innerText
                    }else{
                        const title = li.children[0].text
                        const url = li.children[0].href
                        result.push([{
                            tag,
                            title,
                            url
                        }])
                    }
                })
                
            }
        }

        return result
    },fenlei);
    console.log(datas)
    await browser.close();
}

getAllUrl(huaweiUrl)