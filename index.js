const express = require("express");
const app = express();
const mongoose = require('mongoose');
const chat = require("./models/chat.js");
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const port = process.env.PORT || 8080

main().then(()=>{
    console.log("Connect to DB");

}).catch(err => console.log(err));

async function main() {
// await mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
 await mongoose.connect(process.env.DB_URL);

};
app.get("/",(req,res)=>{
   res.send("root is working");
});

//all chats
app.get("/chats", async (req,res)=>{
    let allChats = await chat.find();
    res.render("index.ejs",{allChats});
    
});

// add new chat
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");

});

app.post("/chats", (req,res)=>{
    let {from:from,mess:mess,to:to} = req.body;
    let newChat =  new chat({
        from: from,
        mess:mess,
        to:to,
        created_at: new Date(),
    });
    newChat.save()
    .then((resl)=>{
        console.log(resl);
    }).catch((err)=>{
        console.log(err);
    })

    res.redirect("/chats");
});

//edit 
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
   let ID = await chat.findById(id);
    res.render("edit.ejs", {ID});

});
app.patch("/chats/:id" , async(req,res)=>{

    let {id} = req.params;
    let {mess: NewMess} = req.body;
    const update =  await  chat.findByIdAndUpdate(id, {mess:NewMess} );
    console.log(update);
    res.redirect("/chats");

});

//delete
app.delete("/chats/:id", async(req,res)=>{
    let {id } = req.params;
    await chat.findByIdAndDelete(id);
    res.redirect("/chats");

});

app.listen(port,()=>{
    console.log("App is listening");
});



