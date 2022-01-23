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

function set_wea(cn) {
    api(find_city + cn).then(res => {
        search.innerHTML = res.location['0'].name;
        api(find_wea + res.location['0'].id).then(res => {
            wea.children[0].innerHTML = res.daily['0'].textDay;
            wea.children[1].innerHTML = (parseInt(res.daily['0'].tempMax) + parseInt(res.daily['0'].tempMin)) / 2;
            wea.children[2].innerHTML = res.daily['0'].windDirDay + res.daily['0'].windScaleDay + '级 湿度' + res.daily['0'].humidity + '%';
            for (i in res.daily) {
                option.series['0'].data[i] = parseInt(res.daily[i].tempMax);
                option.series['1'].data[i] = parseInt(res.daily[i].tempMin);
            }
            MyChart.setOption(option);
        })
    })
}


let wea = document.querySelector('.wea');
let search = document.querySelector('.search');
let input;
let MyChart = echarts.init(document.querySelector('.chart'));
let find_city = 'https://geoapi.qweather.com/v2/city/lookup?key=225d5152aef140278c1b2e3b13e4830b&location=';
let find_wea = 'https://devapi.qweather.com/v7/weather/3d?key=225d5152aef140278c1b2e3b13e4830b&location=';
let option = {
    xAxis: {
        data: ['0', '1', '2'],
        show: false
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
                position: 'top',
                formatter: function (p) {
                    return p.value;
                }
            }
        },
    },
    {
        type: 'line',
        data: [],
        label: {
            normal: {
                show: true,
                position: 'bottom',
                formatter: function (p) {
                    return p.value;
                }
            }
        },
    }]
};

set_wea('重庆');

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



