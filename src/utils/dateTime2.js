/**
 * 将秒数转为时间格式
 *
 * @format
 * @param data {number} 时间戳
 * @param format {string} 时间格式[完整格式：yyyy-MM-dd HH:mm:ss，默认yyyy-MM-dd]
 * @param implementText {string} 缺省文字
 */
export function timeFormat(data, format, implementText) {
    if (data === null || data === '' || data === undefined) {
        return implementText || '';
    }
    format = format || 'yyyy-MM-dd';
    let week = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
    ];
    let date = new Date(data);
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S+': date.getMilliseconds(),
        'W+': week[date.getDay()]
    };
    if (/(y+)/.test(format))
        format = format.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    for (let k in o)
        if (new RegExp('(' + k + ')').test(format))
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
    return format;
}

/**
 * 将字符串时间转换为时间戳
 * @param {string} date
 */
export function getDateTimeByStr(date) {
    let timestamp = '';
    if (date) {
        date = date.substring(0, 19);
        date = date.replace(/-/g, '/'); //必须把日期'-'转为'/'
        timestamp = new Date(date).getTime();
    }
    return timestamp;
}
/**
 * 获取年-月-日
 * @data {Any} 时间戳
 */
export function getDates(data) {
    let timeObj = {};
    data = new Date(data);
    let y = data.getFullYear();
    let m =
        data.getMonth() + 1 < 10
            ? '0' + (data.getMonth() + 1)
            : data.getMonth() + 1;
    let d = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    let w = data.getDay();
    switch (w) {
        case 1:
            w = '星期一';
            break;
        case 2:
            w = '星期二';
            break;
        case 3:
            w = '星期三';
            break;
        case 4:
            w = '星期四';
            break;
        case 5:
            w = '星期五';
            break;
        case 6:
            w = '星期六';
            break;
        case 7:
            w = '星期日';
            break;
    }
    let h = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
    let mi = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
    let s = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
    timeObj = {
        year: y + '',
        month: m + '',
        day: d + '',
        week: w + '',
        hour: h + '',
        minute: mi + '',
        second: s + ''
    };
    return timeObj;
}

/**
 * 根据格式获取日期
 * @param date
 * @param template
 * @returns {string|{}}
 */
export function getYyMmDdStrByDate(date,template){
    var dates = getDates(date);
    if(template==='-'){
        return dates.year+'-'+dates.month+'-'+dates.day;
    }else if(template==='/'){
        return dates.year+'/'+dates.month+'/'+dates.day;
    }else if (template==='_'){
        return dates.year+'_'+dates.month+'_'+dates.day;
    }else if (template==='.'){
        return dates.year+'.'+dates.month+'.'+dates.day;
    }else {
        return dates.year+dates.month+dates.day;
    }
}

/**
 * 获取时间
 * @param date
 * @returns {string}
 */
export function getHHmmssByDate(date){
    var dates = getDates(date);
    return dates.hour+':'+dates.minute+':'+dates.second;
}

/**
 * 获取过去七天的
 * @returns {string}
 */
export function getPastSevenDays(){
    var dates = getDates(new Date());
    const day = dates.day- 7;
    return dates.year+'-'+dates.month+'-'+day;
}


/**
 * 异常处理
 * @param {boolean} condition
 * @param {string} msg
 */
export function assert(condition, msg) {
    if (!condition) throw new Error(`[Apior] ${msg}`);
}

/**
 * URL编码;
 * @param {参数} param
 */
export function toParams(param) {
    let result = '';
    for (let name in param) {
        if (typeof param[name] != 'function') {
            if (param[name] === null) {
                result += '&' + name + '=';
            } else {
                result += '&' + name + '=' + encodeURI(param[name]);
            }
        }
    }
    return result.substring(1);
}
/**
 * 防抖函数
 * @param fn 高频函数
 * @param wait 等待时间
 * @returns {Function}
 */
export function debounce(fn, wait) {
    let context = this,
        args = arguments,
        timer = null;
    return function() {
        context = this;
        args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, wait || 250);
    };
}
/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function(item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function(item) {
        map[item.id] = item;
    });
    //        console.log(map);
    var val = [];
    data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}

/**
 * 对象深拷贝
 * @param  obj 对象
 */
export function cloneObj(obj) {
    let str;
    let newObj = obj.constructor === Array ? [] : {};
    if (
        Object.prototype.toString.call(obj) !== '[object Object]' &&
        Object.prototype.toString.call(obj) !== '[object Array]'
    ) {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj); // 系列化对象
        newObj = JSON.parse(str); // 还原
    } else {
        for (let i in obj) {
            newObj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
        }
    }
    return newObj;
}

/**
 * @function deepCopy 浅深拷贝
 * @param  {type} obj {description}
 * @return {type} {description}
 */
export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * 设置本地localStorage
 * @name {String} 数据对象的KEY
 * @data {all} 对应key的数据
 */
export function setStorage(name, data) {
    let storage = window.localStorage;
    storage.setItem(name, JSON.stringify(data));
}

/**
 * 拿到本地localStorage
 * @name {String} 数据对象的KEY
 */
export function getStorage(name) {
    let storage = window.localStorage;
    let data = JSON.parse(storage.getItem(name));
    return data;
}
/**
 * 设置本地sessionStorage
 * @name {String} 数据对象的KEY
 * @data {all} 对应key的数据
 */
export function setSessionStorage(name, data) {
    let storage = window.sessionStorage;
    storage.setItem(name, JSON.stringify(data));
}

/**
 * 拿到本地sessionStorage
 * @name {String} 数据对象的KEY
 */
export function getSessionStorage(name) {
    let storage = window.sessionStorage;
    let data = JSON.parse(storage.getItem(name));
    return data;
}
/**
 * 取出对象中制定属性返回新对象
 * @obj {Object} 数据对象的KEY
 * @keys {Array} 数据对象的KEY
 */
export function certainProperty(obj, keys) {
    return keys.reduce((result, key) => {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}