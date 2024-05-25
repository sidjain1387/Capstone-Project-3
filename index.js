import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port=3000;

let raw_text = "";
let raw_content = "";
let raw_time_now = "";
let raw_short_post="";
let data={};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


function input_text(req,res,next){
    raw_text = req.body["title"];
    raw_content = req.body["content"];
    raw_short_post=req.body["short-post"];  
    raw_time_now = new Date().toLocaleString();
    data={text:raw_text,content:raw_content,time_now:raw_time_now,short_post:raw_short_post};
    next();
}




app.get("/create",(req,res)=>{
    if(raw_text.length>0){
        res.render("error.ejs");
    }
    else{
        res.render("create.ejs");
    }
    
})

app.get("/blogs",(req,res)=>{
    res.render("blogs.ejs",data);
})

app.post("/submit",input_text,(req,res)=>{
    res.render("post.ejs",
    data);
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})

app.get("/post",(req,res)=>{
    res.render("post.ejs",{text:raw_text , content:raw_content, time_now:raw_time_now});
})

app.get("/update",(req,res)=>{
    if(raw_text.length<=0){
        res.render("error2.ejs");
    }
    else{
        res.render("update.ejs");
    }
})

app.get("/reset",(req,res)=>{
    raw_text="";
    raw_content="";
    raw_time_now="";
    raw_short_post="";
    data={};
    res.render("index.ejs");
})

app.get("/delete",(req,res)=>{
    if(raw_text.length<=0){
        res.render("error2.ejs");
    }
    else{
        res.render("delete.ejs");
    }

})
app.get("/",(req,res)=>{
    res.render("index.ejs");
})



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})