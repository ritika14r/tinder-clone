import * as dotenv from 'dotenv'
dotenv.config()
import  express  from "express";
import mongoose from 'mongoose';
import Cards from './models/dbCards.js';
import Cors from 'cors';
import  path  from "path";
import morgan from 'morgan'

const __dirname = path.resolve();
//App Config
const app=express();
const port=process.env.PORT ||8001

// const connection_url=`mongodb+srv://Ritika:ritika@cluster0.dppaf5c.mongodb.net/tinderdb?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);

//Middleware
app.use(express.json());
app.use(Cors())

//for deploying
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./tinder-clone/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./tinder-clone/build/index.html'))
})

//DB Config
mongoose.connect(process.env.connection_url,{
    useNewUrlParser: true,
});


//API Endpoints
app.get('/',(req,res)=>{
    res.status(200).send('Hello')
})

app.post('/tinder/cards',(req,res)=>{
    const dbCard=req.body;
    
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Listner
app.listen(port,()=>{console.log(`listening on localhost:${port}`)});

