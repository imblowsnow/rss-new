import psl from 'psl';

class RssRule {

    static async getRules() {

    }

    static async parseRule(url) {
        let rules = await this.getRules()
        let parsedDomain;
        try {
            parsedDomain = psl.parse(new URL(url).hostname);
        } catch (error) {
            return [];
        }
        if (parsedDomain && parsedDomain.domain) {
            const subdomain = parsedDomain.subdomain;
            const domain = parsedDomain.domain;
            if (rules[domain]) {
                let rule = rules[domain][subdomain || '.'];
                if (!rule) {
                    if (subdomain === 'www') {
                        rule = rules[domain]['.'];
                    } else if (!subdomain) {
                        rule = rules[domain].www;
                    }
                }
            }
        }
    }
}
