"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const users = require('./users.json');
app.get('/users', (req, res) => {
    console.log(1);
    return users;
});
app.post('/users/add', (req, res) => {
    users.push(req.body);
    console.log(2);
    res.send('User was added');
});
app.put('/users/:id', (req, res) => {
    const elementIndex = users.findIndex((element) => {
        return (element.id === req.params.id);
    });
    users.splice(elementIndex, 1, req.body);
    console.log(4);
    res.send('User was updated');
});
app.delete('/users/:id', (req, res) => {
    const elementIndex = users.findIndex((element) => {
        return (element.id === req.params.id);
    });
    users.splice(elementIndex, 1);
    console.log(3);
    res.send('User was deleted');
});
app.use(function (err, req, res, next) {
    res.status(500).send('Something broke!');
    res.render('error', { error: err });
});
app.listen(8080);
//# sourceMappingURL=app.js.map