const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride= require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));// ejs work

app.use(express.static(path.join(__dirname,"public")));

let posts= [
    {
        id:uuidv4(),
        username: "apnacollege",
        content: "Hard work is important for success"
    },
    {
        id:uuidv4(),
        username: "Raghav",
        content: "World is full of lives"
    },
    {
        id:uuidv4(),
        username: "Vishu",
        content: "The soul is undying"
    }
]
app.get("/posts",(req,res)=>{
 res.render("index.ejs",{ posts });   
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let { username, content}= req.body;
    let id= uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
   let {id}= req.params;
   let post = posts.find((p)=>id==p.id);
   res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{// method ovverride
    let {id}= req.params;
    let newContent= req.body.content;
    let post = posts.find((p)=>id==p.id);
    post.content= newContent;
    console.log(post);
 
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=>id==p.id);
    res.render("edit.ejs",{post});
 });
 app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
 })
app.listen(port, () => {
console.log("listening to port");
});