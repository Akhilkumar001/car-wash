const express = require("express")
const user = require("./apis/user.js")
const admin = require("./apis/admin.js")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
const dburl = `mongodb+srv://${process.env.DBUsername}:${process.env.DBPassword}@cluster0.iltyvpx.mongodb.net/car-wash?retryWrites=true&w=majority`
mongoose.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("Connected"))
.catch((err)=>console.log("Failed to connect to database " + err))


app.use('/admin',admin)
app.use('/user',user)

app.listen(process.env.PORT,()=>{console.log(`Server is listening at port ${process.env.PORT}`)})
