function setCookie(name, value, hours = 24) {
    let str = name + "=" + value;
    const time = new Date(new Date().getTime() + hours * 3600 * 1000).toGMTString();  // toGMTstring将时间转换成字符串
    str += "; expires=" + time;
    document.cookie = str;
}

function getCookie(name) {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"),
        arr = document.cookie.match(reg);
    if (arr !== null) {
        return arr[2];
    } else {
        return null;
    }
}


function clearCookie(name) {
    setCookie(name, '', -1)
}
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}