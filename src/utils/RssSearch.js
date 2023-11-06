function refreshRules(success) {
    fetch('https://rsshub.js.org/build/radar-rules.js')
        .then((response) => {
            done(response);
        })
        .catch(() => {
            fetch('https://cdn.jsdelivr.net/gh/DIYgod/RSSHub@gh-pages/build/radar-rules.js').then((response) => {
                done(response);
            });
        });
}

class RssSearch {
    static async searchRss(word) {

    }

    static async searchBilibli(word) {

    }

    static async searchWeibo(word) {

    }

    static async searchZhihu(word) {

    }
}


export default RssSearch;
