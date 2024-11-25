
const express= require("express");
const env= require("dotenv");

var bcryptjs= require("bcryptjs")
env.config();


const mongoose = require("mongoose");
mongoose.connect(process.env.URL).then(()=>console.log("mongodb connected succesfully")).catch((error)=>console.log("problem in mongo",error))



const App = express();

const session=require("express-session");
const mongodbstore=require("connect-mongodb-session")(session);

App.use(session({
    secret:"this is secret",
    resave:false,
    saveUninitialized:true
}))

const myStore=new mongodbstore({
    uri:process.env.URL,
    collection:"mySession"
})

App.use(express.urlencoded({extended:true}))




const User=require("./model/User");


const ejs = require("ejs")

App.set("view engine","ejs");

const port= 5000;
const checkAuthentication = (req,resp,next)=>{
    if(req.session.isAuthenticated)
    {
        next();
    }
    else{
        resp.redirect("/page")
    }
}

App.get("/page",(rq,rs)=>{
    rs.render("sample")
});

App.get("/login",(rq,rs)=>{
    rs.render("login")
});


App.get("/welcome",checkAuthentication,(rq,rs)=>{
    rs.render("welcome")
});



App.post("/register",async (rq,rs)=>{
    const {name,email,password}=rq.body;

    let user = await User.findOne({email});
    if(user)
    {
        return rs.redirect("/page");
    }
    const hashedPassword = await bcryptjs.hash(password,12)
        user  = new User({
            name,email,password:hashedPassword
        })

        rq.session.person=user.name;

        await user.save();
        rs.redirect("/login")
    
})


App.post("/userlogin",async (req,resp)=>{
    const {email,password}=req.body;

    console.log(email);

    try{
                    const user =await User.findOne({email});

                    console.log(user.password)

                if(!user)
                {
                    resp.redirect("/page")
                }
                const checkPassword=await bcryptjs.compare(password,user.password);

                if(!checkPassword)
                {
                    return resp.redirect("/page")
                }

                req.session.isAuthenticated=true;
                resp.redirect("/welcome")
    }
    catch(error){
        console.log("again problem")
    }


})





App.listen(port,()=>{
    console.log("Server running properly")
})