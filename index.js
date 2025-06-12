//import express module
const express = require("express");
//create an express app
const app = express();
app.use(express.static("public"));

//translator
const translate = require("translate-google");

async function translateText(text, targetLanguage = "hi") {
        let value = await translate(text, { from: "en",to: targetLanguage }).then((res) => {
            console.log(res);
            return res;
        });
    console.log("Translated text:", value);
    return value;
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
let qrcode = [];
app.get("/posts/new",( req , res )=>{
    res.render("newBirth.ejs");
});

app.use(express.static(path.join(__dirname, 'public')));

app.post("/posts", async (req, res) => {
    let { name, gender, birth, address, mother, motheroaadhar, father, fatheroaadhar, place, locate, registration, block1, district1, hospital } = req.body;
    let hiblock = await translateText(block1);
    let hdist = await translateText(district1);
    let hihosp = await translateText(hospital);
    console.log(`Block: ${block1}, District: ${district1}`);
    posts.push({ name, gender, birth, address, mother, motheroaadhar, father, fatheroaadhar, place, locate, registration, block1, district1 ,hospital , hiblock , hdist , hihosp });
    res.redirect("/posts");
    qrcode=[];
    qrcode.push({name,gender,birth,address,mother,father,registration});
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

    const name = qrcode.name;
    const registration = qrcode.registration;
    const address = qrcode.address;
    const gender = qrcode.gender;
    const birth = qrcode.birth;
    const father = qrcode.father;
    const mother = qrcode.mother;
    app.get("/qrcode", (req, res) => {
        const { name, registration, address, father, mother ,gender,birth} = req.query;

        if (!name && !registration && !date && !address && !father && !mother) {
            return res.status(400).send("Missing required query parameters.");
        }

            res.render("qrcode.ejs", {
                name,
                registration,
                gender,
                birth,
                address,
                father,
                mother
            });
    });

app.listen(port,()=>{
    console.log(`App is listening on port :${port}`);
});