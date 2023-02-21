const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "123456",
    database: "yuti"
})

connection.connect();

var menu = [
    {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'mall/index'
    }
]
var adminMenu = [
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'User/index'
    },
    {
        label: '其他',
        icon: 'location',
        children: [
            {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'other/pageOne.vue'
            },
            {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'other/pageTwo.vue'
            }
        ]
    }
]


app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
})

app.post('/login', (req, res) => {
    //设置响应头 设置允许跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')

    var comment = JSON.parse(Object.keys(req.body));

    connection.query(`select *
    from user
    where username='${comment.username}'`, function (error, result) {
        if (error) throw (error);
        // console.log(result);
        var data = {
            menu: result[0].admin ? [...menu, ...adminMenu] : menu,
            token: result[0].username
        };
        res.send(data);
    })
})

app.post('/putList', (req, res) => {
    //设置响应头 设置允许跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')

    var comment = JSON.parse(Object.keys(req.body));
    // console.log(comment);
    for (let item of comment) {
        connection.query(`insert into user_manage values 
        ('${item.id}','${item.name}','${item.addr}',${item.age},'${item.birth}','${item.sex}')`, (error, result) => {
            if (error) throw error;
            console.log('ok');
        })
    }
})

app.post('/edit', (req, res) => {
    //设置响应头 设置允许跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')

    var comment = JSON.parse(Object.keys(req.body));
    // console.log();
    var str = '';
    for (let key in comment) {
        if (key === 'id') continue;
        else if (key === 'sex') comment[key] = comment[key] ? '男' : '女'
        str += key + '="' + comment[key] + '",'
    }
    // console.log(`update user_manage set ${str}`);
    connection.query(`update user_manage set ${str.slice(0, str.length - 1)} where id='${comment.id}'`, (error, result) => {
        if (error) throw error;
        // console.log('ok');
        res.send('ok')
    })
})

app.post('/add', (req, res) => {
    //设置响应头 设置允许跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')

    var comment = JSON.parse(Object.keys(req.body));
    // console.log();
    var str = '"' + comment.name + comment.addr + '"';
    for (let key in comment) {
        if (key === 'sex') comment[key] = comment[key] ? '男' : '女'
        str += ',"' + comment[key] + '"'
    }
    // console.log(`update user_manage set ${str}`);
    connection.query(`insert into user_manage values (${str})`, (error, result) => {
        if (error) throw error;
        // console.log('ok');
        res.send('ok')
    })
})

app.post('/del', (req, res) => {
    //设置响应头 设置允许跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')

    var id = req.query[0];
    // console.log(id);

    connection.query(`delete from user_manage where id='${id}'`, (error, result) => {
        if (error) throw error;
        console.log('ok');
        res.send('ok')
    })
})

app.get('/getUser', (req, res) => {
    //设置响应头 设置允许跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')

    var limit = 20, { page, name } = req.query, total = 0;
    // console.log(page, name);
    connection.query('select count(*) from user_manage', (error, result) => {
        if (error) throw error;
        total = result[0]['count(*)'];
    })
    if (name.length) {
        connection.query(`select * from user_manage where name='${name}'`, (error, result) => {
            if (error) throw error;
            res.send({
                'list': result,
                total
            });
        })
    }
    else {
        connection.query(`select * from user_manage limit ${--page * limit}, ${limit}`, (error, result) => {
            if (error) throw error;
            res.send({
                'list': result,
                total
            });
        })
    }
})

app.get('/getData', (req, res) => {
    //设置响应头 设置允许跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')

    var date = ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'];
    var tables = ['video_data', 'user_data', 'order_data', 'table_data'];
    var datas = { videoData: [], userData: [], orderData: {}, tableData: [] };
    // console.log(comment.orderData.data.length);
    for (let i = 0; i < 4; i++) {
        connection.query(`select * from ${tables[i]}`, (error, result) => {
            if (error) throw error;
            datas[Object.keys(datas)[i]] = i == 2 ? { data: result, date } : result;
            if (i == 3) {
                // console.log(datas);
                res.send(datas)
            }
        })
    }
})

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('Server running on port ' + port);
})