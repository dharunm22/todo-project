const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const cors=require('cors');

const app=express();
//use express.json() to get data into json format
app.use(express.json());
//port
const PORT=process.env.PORT||5500;

//use cors
app.use(cors());

//lets import routes
const TodoItemRoute=require('./routes/todoItems');


//lets connect to mongodb
mongoose.connect(process.env.DB_CONNECT)
.then(()=>console.log("Database is up and running"))
.catch(err=>console.log(err))

app.use('/',TodoItemRoute);



//Add port and connect to server
app.listen(PORT,()=>console.log("Server Connected"));