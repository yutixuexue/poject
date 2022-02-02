function api(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.readyState <= 300) {
                    resolve(JSON.parse(xhr.response));
                }
            }
        }
    })
}

function getIcon(wea, flag = true) {
    switch (wea) {
        case '晴':
            return '&#xe6c8;'
            break;
        case '阴':
            return '&#xe609;'
            break;
        case '小雨':
            return '&#xe632;'
            break;
        case '多云':
            if (flag) return '&#xe60b;'
            else return '&#xe607;';
            break;
        case '阵雨':
            return '&#xe61c;';
            break;
        case '小雪':
            return '&#xe60a;';
            break;
        case '晴间多云':
            if (flag) return '&#xe631;';
            else return '&#xe635;';
            break;
        default:
            return '';
    }
}

function set_wea(cn) {
    api(find_city + cn).then(res => {
        if (res.code == 404) {
            res = {
                location: [{
                    name: '重庆',
                    id: '101040100'
                }]
            }
        }
        add.href = 'city.html?name=' + escape(res.location['0'].name);
        search.innerHTML = res.location['0'].name;
        api(find_wea + res.location['0'].id).then(res => {
            sundown = sun.children[0].innerHTML = '日落 ' + res.daily['0'].sunset;
            wea.children[0].innerHTML = res.daily['0'].textDay;
            wea.children[1].innerHTML = (parseInt(res.daily['0'].tempMax) + parseInt(res.daily['0'].tempMin)) / 2;
            wea.children[2].innerHTML = res.daily['0'].windDirDay + res.daily['0'].windScaleDay + '级 湿度' + res.daily['0'].humidity + '%';
            for (i in res.daily) {
                if (daily.children.length - 1 < i) {
                    let div1 = daily.children[0].cloneNode(true);
                    let div2 = night.children[0].cloneNode(true);
                    daily.append(div1);
                    night.append(div2);
                }
                option.series['0'].data[i] = parseInt(res.daily[i].tempMax);
                option.series['1'].data[i] = parseInt(res.daily[i].tempMin);
                daily.children[i].children[0].innerHTML = res.daily[i].fxDate.substring(5);
                daily.children[i].children[1].innerHTML = res.daily[i].textDay;
                daily.children[i].children[2].innerHTML = getIcon(res.daily[i].textDay);
                night.children[i].children[0].innerHTML = getIcon(res.daily[i].textNight, false);
                night.children[i].children[1].innerHTML = res.daily[i].textNight;
                night.children[i].children[2].innerHTML = res.daily[i].windDirDay;
                night.children[i].children[3].innerHTML = res.daily[i].windScaleDay + '级';
                if (i < 2) {
                    front[i].children[2].innerHTML = res.daily[i].tempMin + ' / ' + res.daily[i].tempMax + '°';
                    next[i].children[0].innerHTML = res.daily[i].textDay;
                    next[i].children[1].innerHTML = getIcon(res.daily[i].textDay);
                }
            }
            MyChart.setOption(option);
        })
    })
}


let name = window.location.search.substring(6) || '重庆';
let wea = document.querySelector('.wea');
let add = document.querySelector('.add');
let search = document.querySelector('.search');
let daily = document.querySelector('.box-daily');
let night = document.querySelector('.box-night');
let front = document.querySelectorAll('.front');
let next = document.querySelectorAll('.next');
let sun = document.querySelector('.sun');
let down = sun.querySelector('span');
let sundown;
let input;
let MyChart = echarts.init(document.querySelector('.chart'));
let tempChart = document.querySelector('.temp_chart');
let find_city = 'https://geoapi.qweather.com/v2/city/lookup?key=225d5152aef140278c1b2e3b13e4830b&location=';
let find_wea = 'https://devapi.qweather.com/v7/weather/7d?key=225d5152aef140278c1b2e3b13e4830b&location=';
let find_temp = 'https://devapi.qweather.com/v7/weather/24h?key=225d5152aef140278c1b2e3b13e4830b&location=';
let option = {
    xAxis: {
        data: [0, 1, 2, 3, 4, 5, 6],
        show: false,
        smooth: true,
    },
    yAxis: {
        show: false,
        data: []
    },
    series: [{
        type: 'line',
        data: [],
        label: {
            normal: {
                show: true,
                color: '#fff',
                position: 'top',
                formatter: function (p) {
                    return p.value;
                }
            }
        },
        itemStyle: {
            normal: {
                lineStyle: {
                    color: '#fff'
                }
            }
        }
    },
    {
        type: 'line',
        data: [],
        label: {
            normal: {
                show: true,
                color: '#fff',
                position: 'bottom',
                formatter: function (p) {
                    return p.value;
                }
            }
        },
        itemStyle: {
            normal: {
                lineStyle: {
                    color: '#fff'
                }
            }
        }
    }]
};

set_wea(name);

let flag = true;
search.onclick = function () {
    if (flag) {
        search.innerHTML = '<input type="text" value=' + search.innerHTML + '>';
        search.children[0].focus();
        search.children[0].onblur = function () {
            set_wea(this.value);
            search.innerHTML = this.value;
            flag = true;
        }
        search.children[0].onchange = function () {
            set_wea(this.value);
            search.innerHTML = this.value;
            flag = true;
        }
        flag = false;
    }
}

down.addEventListener('click', function () {
    if (this.down) {
        this.innerHTML = '&#xe668;';
        this.down = false;
        sun.children[0].innerHTML = sundown;
        tempChart.style.display = 'none';
    }
    else {
        this.innerHTML = '&#xe601;';
        this.down = true;
        sun.children[0].innerHTML = '温度';
        tempChart.style.display = 'block';
    }
})