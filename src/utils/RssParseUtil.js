import { parseByContent } from '@/lib/rss-parse';

class RssParseUtil {
    static async parse(url, proxy=null){
        let content = await window.utils.requestRssAndDecode(url,proxy);
        return await parseByContent(content).catch((error)=>{
            throw new Error('订阅地址有误');
        });
    }
    static async checkUrl(url){
        try {
            await this.parse(url);
        }catch (error) {
            return false;
        }
        return true;
    }
}


export default RssParseUtil;
