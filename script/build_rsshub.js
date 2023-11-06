const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require("fs");
async function buildDocItems() {
    const isEnglish = false;

    const lang = isEnglish ? '' : 'zh/';
    const types = [
        'social-media',
        'new-media',
        'traditional-media',
        'bbs',
        'blog',
        'programming',
        'design',
        'live',
        'multimedia',
        'picture',
        'anime',
        'program-update',
        'university',
        'forecast',
        'travel',
        'shopping',
        'game',
        'reading',
        'government',
        'study',
        'journal',
        'finance',
        'other',
    ];
    const all = await Promise.all(
        types.map(async (type) => {
            const data = await fetch(`https://docs.rsshub.app/${lang}routes/${type}`).then((res) => res.text());

            const $ = cheerio.load(data);
            const page = $('.page').toArray();
            const item = $('.routeBlock').toArray();
            return {page, item, type};
        })
    );
    const list = all.flatMap(({page, item, type}) => item.map((item) => ({page, item, type})));

    return {
        title: isEnglish ? 'RSSHub has new routes' : 'RSSHub 有新路由啦',
        link: 'https://docs.rsshub.app',
        description: isEnglish ? 'Everything is RSSible' : '万物皆可 RSS',
        language: isEnglish ? 'en-us' : 'zh-cn',
        item: list.map(({page, item, type}) => {
            const $ = cheerio.load(page);
            item = $(item);
            const h2Title = item.prevAll('h2').eq(0);
            const h3Title = item.prevAll('h3').eq(0);
            const example = item.find('.example').find('a').text().trim()
            const path = item.attr('id');
            item.find('.badges').remove();
            item.find('.author').remove();
            item.find('.example').remove();
            item.find('.path').remove();
            const paramsDom = item.find('.params');
            let params = [];
            let i = 0;
            let pathArray = path.split('/');
            // 解析URL参数   /nga/forum/:fid/:recommend?
            pathArray.forEach((item) => {
                // 是否是变量
                if (!item.startsWith(':')) {
                    return;
                }
                // 是否可选  ? 结尾可选
                const required = !item.endsWith('?');
                const liDom = paramsDom.eq(i++);
                liDom.find('code').remove();
                let name = item.replace(':', '').replace('?', '')
                let text = liDom.text().replace('，必选 — ', '').replace('，可选 — ', '').replace('，', ',');
                params.push({
                    name: name,
                    desc: text,
                    required: required,
                })
            })
            // 查找到 /: 之前的路径
            let newPath = path.indexOf('/:') !== -1 ? path.substring(0, path.indexOf('/:')) : path;

            return {
                pid: h2Title.attr('id'),
                id: h3Title.attr('id'),
                title: `${h2Title.text().trim()} - ${h3Title.text().trim()}`,
                example: example,
                description: item.html(),
                link: `https://docs.rsshub.app/${lang}routes/${type}#${encodeURIComponent(h2Title.find('.hash-link').attr('href') && h3Title.find('.hash-link').attr('href')?.substring(1))}`,
                path: path,
                newPath: newPath,
                params: params,
            };
        }),
    };
};

async function buildRadarRules(){

    let rulesText = await fetch('https://raw.githubusercontent.com/DIYgod/RSSHub-Radar/master/src/js/common/radar-rules.js').then((res) => res.text());
    rulesText = rulesText.replace('export const defaultRules =', '');
    let rules = eval(rulesText);
    let mapping = {};
    Object.keys(rules).forEach((domainName) => {
        Object.keys(rules[domainName]).forEach((subName) => {
            if (subName === '_name') return;
            let domain = '';
            if (subName === '.'){
                domain = domainName;
            }else{
                domain = subName + '.' + domainName;
            }
            for (const rule of rules[domainName][subName]) {
                let path;
                // 判断是否是函数
                if (typeof rule.target === 'function'){
                    // 看看能不能从 docs里面取到
                    let docs = rule.docs;
                    // 取 #后面的内容
                    let hash = docs.substring(docs.indexOf('#') + 1);
                    if (hash.startsWith('_')){
                        path = hash.substring(1);
                    }
                }else{
                    path = rule.target;
                }
                if (!path) continue;
                mapping[path] = {
                    domain: domain,
                    ...rule,
                };
            }

        })
    })

    let data = await buildDocItems();
    let items = data.item;
    items = items.filter((item) => {
        if (mapping[item.id]){
            item.domain = mapping[item.id].domain;
        }else if (mapping[item.path]){
            item.domain = mapping[item.path].domain;
        }
        return !!item.domain;
    })
    return items;
}

buildRadarRules().then(result => {
    // 生成json路由数据
    const fs = require('fs');
    const data = JSON.stringify(result);
    fs.writeFileSync('../public/rsshub.json', data);
})
