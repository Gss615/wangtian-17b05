// 华为交换机，资料目录 baseUrl: https://e.huawei.com/cn/products-and-solutions
const huaweiUrl = ' https://e.huawei.com/cn/products-and-solutions';

// 拿到分类页面的产品型号



const puppeteer = require('puppeteer');
const fs = require("fs");
//引入node文件路径模块(path)
const path = require("path");
// 华为交换机，资料目录 baseUrl: https://e.huawei.com/cn/products-and-solutions
const huaweiUrl = ' https://e.huawei.com/cn/products-and-solutions';
// 数据结构
let = [
    {
        tag:'交换机｜园区交换机｜核心/汇聚交换机'
        [
            {//1
                title:'CloudEngine S12700E系列交换机',
                url:'https://e.huawei.com/cn/products/enterprise-networking/switches/campus-switches/s12700e'
            },
            {//2
                title:'CloudEngine S12700E系列交换机',
                url:'https://e.huawei.com/cn/products/enterprise-networking/switches/campus-switches/s12700e'
            }
        ]
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

    const datas = await page.evaluate(() => {
        const result = []
        const elements = document.querySelectorAll(`div.main`);
        for (let i = 0; i < elements.length; i++) {
            //获取新闻的标签
            let title = elements[i].innerText;
            //获取新闻的链接地址
            let url = elements[i].getAttribute('href');
            //将获取到的标题和链接地址添加到数组中
            result.push({
                title,
                url,
                tag
            });
        }

        return result
    });
    console.log(datas)
    info = info.concat(datas)
    await browser.close();
    getAllSeries(res, i + 1, info)
}

getAllSeries(fenleiUrl, 0, [])