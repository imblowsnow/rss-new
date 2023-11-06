import { parseByContent } from '@/lib/rss-parse';

class RssUtil{
    static async parse(url, proxy=null){
        let content = await window.utils.requestRssAndDecode(url,proxy);
        return await parseByContent(content);
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


export default RssUtil;
