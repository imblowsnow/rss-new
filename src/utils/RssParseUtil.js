import { parseByContent } from '@/lib/rss-parse';
import {requestGet} from '@/utils/request';

class RssParseUtil {
    static async parse(url) {
        let content = await requestGet(url);
        return await parseByContent(content).catch((error)=>{
            console.error('解析rss失败', url, error);
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
