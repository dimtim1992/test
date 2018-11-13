import {User} from './user';
import * as express from 'express';
import * as cors from 'cors';
import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';

const app = express();

import * as bodyParser from 'body-parser';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const users: User[] = require('./users.json');

app.get('/users', (req: Request, res: Response) => {
    console.log(1);
    return users;
});

app.get('/users/:id', (req: Request, res: Response) => {
    return users.find((element: User) => {
        return (element.id === req.params.id);
    });
});

app.post('/users/add', (req: Request, res: Response) => {
    users.push(req.body);
    console.log(2);
    res.send('User was added');
});

app.put('/users/:id', (req: Request, res: Response) => {
    const elementIndex: number = users.findIndex((element: User) => {
        return (element.id === req.params.id);
    });
    users.splice(elementIndex, 1, req.body);
  console.log(4);
    res.send('User was updated');
});

app.delete('/users/:id', (req: Request, res: Response) => {
    const elementIndex: number = users.findIndex((element: User) => {
        return (element.id === req.params.id);
    });
    users.splice(elementIndex, 1);
  console.log(3);
    res.send('User was deleted');
});

app.use(function (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    res.status(500).send('Something broke!');
    res.render('error', {error: err});
});


app.listen(8080);

