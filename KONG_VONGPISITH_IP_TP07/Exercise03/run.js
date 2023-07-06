const express = require('express');
const path = require("path");
const app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname+"/src")));
app.listen(5000, () => {
    console.log("project run in port: 5000");
});

app.get('/detail', function (req, res) {
    
    fs.readFile('./src/fetchapi-detail.html', null, (err, data) => {
    res.write(data)
    })
})