const express=require("express");
const path = require("path");
const app=express();
app.use(express.static(path.join(__dirname+"/src")));

app.listen((5001), () => {
    console.log("Server is Running localhost:5001");
})
