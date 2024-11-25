// const path=require("path");
// // console.log(path.parse(__filename));


// // FS

// const fs=require("fs");
// fs.readFile("demo.txt","utf8",(error,data)=>{
//     if(error){
//         console.log("error")

//     }
//     console.log(data);
// })
// fs.writeFile("example.css","utf8",(error)=>console.log(error))


// delete the file

// fs.unlink("example.css",(error)=>{
//     if(error) console.log(error);
//     else console.log("deleted success")
// })

// http

const http=require("http");
http.createServer((req,resp)=>{
    resp.write("Welcome to bgmi");
    resp.end();
}).listen(5000)