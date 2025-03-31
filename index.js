//import express module
const express = require("express");
//create an express app
const app = express();
//translator
const translate = require("translate-google");

async function translateText(text, targetLanguage = "hi") {
    try {
        var translation = await translate(text, { from: "en",to: targetLanguage }).then((res) => {
            console.log(res);
            return res;
        });
    } catch (error) {
        console.error("Error translating text:", error);
        return null;
    }
}
//set the port
const port = 3000;
//import path module
const path =require("path");
//set the view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let posts =[];

app.get("/posts/new",( req , res )=>{
    res.render("newBirth.ejs");
});

app.use(express.static(path.join(__dirname, 'public')));

app.post("/posts", (req, res) => {
    let { name, gender, birth, address, mother, motheroaadhar, father, fatheroaadhar, place, locate, registration, block1, district1 , hospital ,hiblock=translateText(block1),hdist=translateText(district1),hihosp=translateText(hospital)} = req.body;
    console.log(`Block: ${block1}, District: ${district1}`);
    posts.push({ name, gender, birth, address, mother, motheroaadhar, father, fatheroaadhar, place, locate, registration, block1, district1 ,hospital , hiblock , hdist , hihosp });
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    const { id } = req.params;
    const post = posts[id];
    res.render("index.ejs",{ post });
}
);

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
    posts=[];
});

let qrcode = [];

app.get("/posts/new",( req , res )=>{
    res.render("newBirth.ejs");
});

app.use(express.static(path.join(__dirname, 'public')));

app.post("/qrcode", (req, res) => {
    let { name, gender, birth, address, mother, father,registration, } = req.body;
    posts.push({ name, gender, birth, address, mother, father,registration});
    res.redirect("/qrcode");
});

app.get("/qrcode/:id", (req, res) => {
    const { id } = req.params;
    const qr = qrcode[id];
    res.render("qrcode.ejs", { qr });
});

app.get("/qrcode", (req, res) => {
    res.render("qrcode.ejs", { qrcode });
   qrcode = [];
});

app.listen(port,()=>{
    console.log(`App is listening on port :${port}`);
});