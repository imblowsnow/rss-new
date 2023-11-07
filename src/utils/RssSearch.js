import RssRule from './RssRule';

class RssSearch {
    commonSearch = [
        '/atom.xml',
        '/feed',
        '/feed.xml',
        '/rss',
        '/rss.xml',
        '/forum.php?mod=rss'
    ];
    static async searchRss(word) {
        return RssRule.parseRule(word);
    }
}


export default RssSearch;
