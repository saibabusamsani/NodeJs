const express=require("express");

const app=express();

const port=5000;


const firstMiddleWare=((req,resp,next)=>{
    if(true)
    {
        next();
    }

})

app.get("/apple",firstMiddleWare,(req,resp)=>{
    resp.send("There are five apples")
})

app.listen(port,()=>{
    console.log("Server start and running succesfully")
})
