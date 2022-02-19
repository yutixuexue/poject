const express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();
app.use(cookieParser('yuti'));
app.use(session({
    secret: 'yuti',
    resave: false,
    saveUninitialized: true,
}))

var user = [{
    username: 'yuti',
    password: '123',
    login: 1
}]

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let flag = true;
    for (let i in user) {
        if (user[i].username == req.query.username && user[i].login == 1) {
            flag = false;
            res.send('true');
        }
    }
    if (flag) res.send('false');
})

app.get('/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.query);
    console.log(user);
    let flag = true;
    if (req.query.username != '' && req.query.password != '') {
        for (let i in user) {
            if (user[i].username == req.query.username) {
                flag = false;
                if (user[i].password == req.query.password) {
                    user[i].login = 1;
                    res.send('true');
                }
                else res.send('false');
            }
        }
        if (flag) {
            user[user.length] = {
                username: req.query.username,
                password: req.query.password,
                login: 1
            }
            res.send('true');
        }
    }
    else res.send('false');
})

app.get('/back', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    for (let i in user) {
        if (user[i].username == req.query.username) {
            user[i].login = 0;
        }
    }
    res.send('true')
})

app.listen(8000, () => {
    console.log('服务已经启动，端口8000监听中')
})