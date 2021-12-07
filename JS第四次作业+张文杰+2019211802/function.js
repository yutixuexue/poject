window.onload = function () {
    let search_button = document.querySelector('.search-button');
    let song_list = document.querySelector('.song-list');
    let offset = document.querySelector('.offset');
    let forword = offset.children[0];
    let offset_button = offset.children[1];
    let backword = offset.children[2];
    let offset_input = offset.children[3];
    let audio = document.querySelector('audio');

    // 实现点击播放功能
    song_list.addEventListener('click', function (e) {
        e = e || event;
        let id = parseInt(e.target.id) ? e.target.id : e.target.parentNode.id;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://cloud-music.pl-fe.cn/song/url?id=' + id);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.readyState <= 300) {
                    audio.src = JSON.parse(xhr.response).data[0].url;
                    audio.style.display = 'block';
                }
            }
        }
    })

    // 判断当前页面选择栏是否被选中
    function isChecked() {
        return offset.now <= offset_button.children[3].innerHTML - 1 && offset.now >= offset_button.children[0].innerHTML - 1;
    }

    // 添加被选中样式
    function setChecked() {
        offset_button.children[offset.now % 4].classList.add('checked');
    }

    // 移除被选中样式
    function removeChecked() {
        offset_button.children[offset.now % 4].classList.remove('checked');
    }

    // 改变页码
    function changePage(num) {
        for (let i = 0; i < 4; i++)
            offset_button.children[i].innerHTML = offset_button.children[i].innerHTML * 1 + num;
    }

    // 向前翻页功能
    forword.addEventListener('click', function () {
        if (offset_button.children[0].innerHTML - 1) {
            changePage(-4);
            isChecked() ? setChecked() : removeChecked();
        }
    })

    // 向后翻页功能
    backword.addEventListener('click', function () {
        changePage(4);
        isChecked() ? setChecked() : removeChecked();
    })

    // 页面切换功能
    offset_button.addEventListener('click', function (e) {
        e = e || event;
        if (!e.target.children[0]) {
            removeChecked();
            offset.now = e.target.innerHTML - 1;
            setChecked();
            search_button.click();
        }
    })

    // 页面跳转功能
    offset_input.children[1].addEventListener('click', function () {
        removeChecked();
        offset.now = parseInt(offset_input.children[0].value) || offset.now;
        let mul = Math.floor(--offset.now / 4);
        changePage(mul * 4 + 1 - offset_button.children[0].innerHTML);
        setChecked();
        search_button.click();
        offset_input.children[0].value = '';
    })
}