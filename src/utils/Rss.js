import RssUtil from "@/utils/RssUtil";
import db from "@/utils/db";
import bus from "@/utils/bus";
function generateUniqueId() {
    const timestamp = Date.now().toString(36); // 使用时间戳的36进制表示
    const randomPart = Math.random().toString(36).substr(2, 5); // 使用随机数的36进制表示
    return `${timestamp}${randomPart}`;
}


class Rss{
    static async getConfig(name,defaultValue=null){
        let configStr = db.getItem(db.KEY_CONFIG);
        let value = defaultValue;
        if (configStr){
            let data = JSON.parse(configStr);
            value = data[name];
        }
        return value;
    }
    static async cronInterval(){
        let timer = await this.getConfig('timer', 5);
        // 订阅检查
        setInterval(() => {
            let articles = Rss.cron();
            if (articles.length > 0) {
                this.$notify({
                    title: '新文章',
                    message: '已更新' + articles.length + '篇文章',
                    type: 'success',
                });
            }
        }, timer * 60 * 1000);
    }
    static async cron(fromId=null){
        console.log('start cron');

        let allArticles = [];

        let subscribes = await this.getSubscribes();
        let promises = [];
        for (const subscribe of subscribes) {
            // 如果指定了fromId，只处理指定的订阅
            if (fromId != null && fromId !== subscribe.id) continue;

            promises.push(this.#parseRssArticles(subscribe.url).then((articles)=>{
                for (const article of articles) {
                    article.from = subscribe.name;
                    article.fromId = subscribe.id;
                }
                return articles;
            }));
        }

        let array = await Promise.all(promises);
        console.log('cron all subscribes result',array);
        for (const arrayElement of array) {
            if (!arrayElement) continue;
            allArticles = allArticles.concat(arrayElement);
        }

        console.log('cron all subscribes allArticles',allArticles);

        // 去重本地已经存在的数据
        let articleIndexs = this.getArticleIndexs()

        let articleIndexsMap = {};
        for (const articleIndex of articleIndexs) {
            if (!articleIndex.url) continue;
            articleIndexsMap[articleIndex.url] = articleIndex;
        }

        console.log('articleIndexsMap', articleIndexsMap);
        allArticles = allArticles.filter((article)=>{
            return !articleIndexsMap[article.link];
        })

        if (allArticles.length > 0){

            await this.addArticles(allArticles);

            bus.$emit(bus.EVENT_NEW_ARTICLE, allArticles);
        }

        console.log('cron end' , allArticles);

        return allArticles;
    }

    static async #parseRssArticles(url){
        try {
            let rss = await RssUtil.parse(url);
            console.log('cron parseRssArticles',url,rss);
            return rss.items;
        }catch (err){
            console.error('cron parseRssArticles error',url,err);
            return [];
        }
    }

    static getArticleIndexs(){
        let articleIndexs = db.getItem(db.KEY_ARTICLE_INDEXES);
        if (articleIndexs){
            articleIndexs = JSON.parse(articleIndexs)
        }else{
            articleIndexs = [];
        }
        if (!Array.isArray(articleIndexs)) return [];

        return articleIndexs;
    }

    static async addArticles(articles){
        // 把文章存到数据库
        let articleIndexs = this.getArticleIndexs();
        let articleIndexsMap = {};
        for (const articleIndex of articleIndexs) {
            if (!articleIndex.url) continue;
            articleIndexsMap[articleIndex.url] = articleIndex;
        }

        // 根据时间 published 倒序排序
        articles = articles.sort((a,b)=>{
            return b.published - a.published;
        });

        // 检查最大存储数量 5000，超过自动删除最后的数据
        // if (articleIndexs.length + articles.length > 5000){
        //     let deleteCount = articleIndexs.length + articles.length - 5000;
        //     articleIndexs.splice(5000,deleteCount);
        // }

        for (const article of articles) {
            if (articleIndexsMap[article.link]) continue;

            // 向上插入
            articleIndexs.unshift({
                url: article.link,
                title: article.title,
                from: article.from,
                fromId: article.fromId,
            })

            db.setItem(db.KEY_ARTICLE_PREFIX + article.link,JSON.stringify(article));
        }

        db.setItem(db.KEY_ARTICLE_INDEXES,JSON.stringify(articleIndexs));
    }

    static async  getArticles({page,limit, searchWord, from}){
        let articleIndexs = this.getArticleIndexs()
        articleIndexs = articleIndexs.reverse()

        let start = (page - 1) * limit;
        let end = page * limit;

        let newArticleIndexs = [];
        // 根据 searchWord 过滤文章
        for (const articleIndexInfo of articleIndexs) {
            if (searchWord && articleIndexInfo.title.indexOf(searchWord) === -1){
                continue;
            }
            if (from && articleIndexInfo.from.indexOf(from) === -1){
                continue;
            }
            newArticleIndexs.push(articleIndexInfo);
            // if (newArticleIndexs.length >= end){
            //     break;
            // }
        }

        // 根据 start 和 limit 获取文章
        let articles = [];

        if (end > newArticleIndexs.length){
            end = newArticleIndexs.length;
        }

        for (let i = start; i < end; i++) {
            let articleIndexInfo = newArticleIndexs[i];
            let articleId = articleIndexInfo.url;

            let article = db.getItem(db.KEY_ARTICLE_PREFIX + articleId);
            articles.push(JSON.parse(article));
        }

        return {
            total: newArticleIndexs.length,
            articles,
        };
    }

    /**
     * 收藏文章
     * @param url
     * @param flag
     * @returns {Promise<void>}
     */
    static async  collectArticle(url,flag=true){
        let collects = db.getItem(db.KEY_COLLECT);
        if (collects){
            collects = JSON.parse(collects);
        }else{
            collects = [];
        }
        if (flag){
            collects.push(url);
        }else{
            let index = collects.indexOf(url);
            if (index > -1){
                collects.splice(index,1);
            }
        }
        db.setItem(db.KEY_COLLECT,JSON.stringify(collects));
    }


    /**   订阅源相关   **/
    static getSubscribes(){
        let str = db.getItem(db.KEY_SUBSCRIBES);
        if (!str){
            return [];
        }
        return JSON.parse(str);
    }

    static async subscribe(url){
        let res =  await RssUtil.parse(url);
        console.log('subscribe',url,res);
        let site = {
            // 随机生成一个id
            id: generateUniqueId(),
            url: url,
            name: res.title,
            title: res.title,
            icon: res.image,
            count: 0
        }

        let subscribes = this.getSubscribes();
        subscribes.push(site);
        db.setItem(db.KEY_SUBSCRIBES,JSON.stringify(subscribes));

        await this.cron(site.id);
    }

    static unsubscribe(id){
        let subscribes = this.getSubscribes();
        subscribes = subscribes.filter(item => item.id !== id);
        db.setItem(db.KEY_SUBSCRIBES,JSON.stringify(subscribes));
    }

    static  saveSubscribe(item){
        let subscribes = this.getSubscribes();
        subscribes = subscribes.map(subscribe => {
            if (subscribe.id === item.id){
                return item;
            }
            return subscribe;
        });
        db.setItem(db.KEY_SUBSCRIBES,JSON.stringify(subscribes));
    }

    static getSubscribe(fromId) {
        let subscribes = this.getSubscribes();
        for (const subscribe of subscribes) {
            if (subscribe.id === fromId){
                return subscribe;
            }
        }
        return null;
    }
}



export default Rss;
