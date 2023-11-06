import axios from 'axios';

class RssRule {
    static rules = null;
    static async getRules() {
        if (this.rules !== null) {
            return this.rules;
        }
        return axios.get("./rsshub.json").then((res) => {
            let mapping = {};
            res.data.forEach((item) => {
                let domain = item.domain;
                mapping[domain] = mapping[domain] || [];
                mapping[domain].push(item);
            })

            return this.rules = mapping;
        })
    }

    static async parseRule(url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url;
        }
        let domain = new URL(url).hostname;
        let rules = await this.getRules();
        let domainRules = rules[domain];
        return domainRules;
    }
}

export default RssRule;
