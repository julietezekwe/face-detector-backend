import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import pool from './db/config';
import bodyParser from "body-parser";
import cors from 'cors';
// const  signin = require('./controllers/signin');
import { HandleSignin } from './controllers/signin';
import { HandleImage } from './controllers/image';
import { HandleRegister } from './controllers/register';
import HandleProfileGet from './controllers/profile';



const app = express();




app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) =>{
    let query = {
        text: 'SELECT * FROM users',
    }
    pool.query(query).then(data => {
      res.json(data.rows);
    }).catch(err => res.json(err));
});
app.post('/signin', (req, res) => {HandleSignin(req, res, bcrypt)});

app.post('/register', (req, res) => {HandleRegister(req, res, bcrypt)});

app.get('/profile/:id', (req, res) => {HandleProfileGet(req, res)});

app.put('/image', (req, res) => {HandleImage(req, res)});


app.listen(process.env.PORT || 3002);