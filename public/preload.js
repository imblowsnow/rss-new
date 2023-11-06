const request = require('node-fetch')
const iconv = require('iconv-lite')
const {Buffer} = require("buffer");
const httpsProxyAgent = require('https-proxy-agent');

window.utils = {
    request: async (url, params) => {
        return request(url, params);
    },
    requestRssAndDecode: async (url, proxy=null) => {
        let response = await window.utils.request(url, {
            agent: new httpsProxyAgent(proxy),
        });
        // 拿到原始数据流
        let chunk = await response.buffer();
        let encoding = 'utf8';
        if (/encoding\s*?=\s*?"gbk"/i.test(chunk.toString())){
            encoding = "gbk";
        }
        console.log('encoding: ', encoding, chunk);
        if (encoding === "gbk"){  //编码转换
            chunk = iconv.decode(chunk, 'gbk');
        }
        return chunk;
    },
    decode(content){
        // GBK 编码的文本
        const gbkText = Buffer.from(content, 'binary');

        // 将 GBK 转换为 UTF-8
        const utf8Text = iconv.decode(gbkText, 'gbk').toString('utf-8');

        return utf8Text;
    }
}


console.log(window.utils);
