import RssRule from './RssRule';

class RssSearch {
    static async searchRss(word) {
        return RssRule.parseRule(word);
    }

    static async searchBilibli(word) {

    }

    static async searchWeibo(word) {

    }

    static async searchZhihu(word) {

    }
}


export default RssSearch;
