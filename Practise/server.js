
const express=require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://sai:123@cluster0.orqfx.mongodb.net/EmployeeProject").then(()=>console.log("connected successfully")).catch(()=>console.log("problem in database"))


const Employee =mongoose.model("Employee",new mongoose.Schema({
    name:{
        type :String
    },
    salary:{ type :Number}
}))



const route=express.Router();


const addEmployee =async (req,resp)=>{
    try{
        const {name,salary}= req.body;
       const emp= new Employee({
         name,salary
        });
        await emp.save();
        resp.status(201).json(emp);

    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg :"please once again check"})
    }
          


}

const getEmployee = async (req,resp)=>{
    try{

         const employees= await Employee.find();
         resp.status(200).json(employees)

    }
    catch{
        resp.status(500).json({status:"problem"})
    }
}

route.post("/add",addEmployee);
route.get("/get",addEmployee);






const App=express();

App.set("view engine","ejs");
App.use(express.json());

App.use("/employee",route)

App.use(bodyParser.urlencoded({extended:true}));





App.listen(5000,()=>{
    console.log("server succesfully load")
})
