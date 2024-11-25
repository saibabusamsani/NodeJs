
const employeeRoutes=require("./routes/employeeRoute")

const bodyParser=require("body-parser")

const express=require("express");

const dotenv=require("dotenv");

const ejs=require("ejs")

// const {MongoClient}=require("mongodb");

const mongoss=require("mongoose");


const app = express();


dotenv.config();


const port=process.env.Port || 4000;


app.use(bodyParser.json())


app.set("view engine","ejs");


app.get("/page",(req,res)=>{
    res.render("sample")
})

mongoss.connect(process.env.MONGO_URI)
.then(()=>console.log("mongo db connected sucessfully"))
.catch((err)=>console.log(err))


app.use("/employees",employeeRoutes);

app.listen(port,()=>{
    console.log("server start successfully",port)
})
