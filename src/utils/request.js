import axios from 'axios'
import Rss from './Rss'


export async function requestGet(url, options = {}) {
    if (window['utools']) {
        let proxy = Rss.getConfig('proxy');
        return await window.utils.requestRssAndDecode(url, proxy);
    } else {
        return axios.get(url, options).then(res => res.data)
    }
}
