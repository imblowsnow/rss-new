export default {
    /** 计算时间间隔 */
    timeDistance(time) {
        let hour = 60 * 60;
        let day = hour * 24;
        let month = day * 31;
        let year = month * 12;
        let date = new Date(time)
        let oldTime = date.getTime() / 1000; // 精确到秒进行计算
        let currentTime = new Date().getTime() / 1000 // 现行时间戳
        let distance = currentTime - oldTime;
        if( distance < hour ) { // 一小时内
            return parseInt( distance / 60 ) +"分钟前"
        } else if( distance < day ) {// 一天内
            return  parseInt( distance / hour ) +"小时前"
        } else if( distance < month ) { // n天前来过
            return parseInt( distance / day )+"天前";
        } else if( distance < year ) {
            return parseInt( distance / month ) + "个月前";
        } else {
            return parseInt( distance / year ) + "年前"
        }
    },
    formatDate(time) {
        let fmt = "yyyy-MM-dd hh:mm:ss";
        let date = new Date(time)
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}
