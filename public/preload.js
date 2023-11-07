const request = require('node-fetch')
const iconv = require('iconv-lite')
const {Buffer} = require("buffer");
const {HttpsProxyAgent} = require('https-proxy-agent');

window.utils = {
    request: async (url, params) => {
        return request(url, params);
    },
    requestRssAndDecode: async (url, proxy=null) => {
        let agent = proxy ? new HttpsProxyAgent(proxy) : null
        console.log('requestRssAndDecode', url, proxy);
        let response = await window.utils.request(url, {
            agent: agent,
        });
        if (response.status !== 200) throw new Error('请求失败，无法访问：' + response.status);
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
