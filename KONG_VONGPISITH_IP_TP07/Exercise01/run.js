// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//     res.send('Hello from api');
// })

// app.get('/detail', function (req, res) {
//     res.send('Hello from api in detail');
// })
// app.listen(3000, () => {
//     console.log("project run in port: 3000");
// });

// app.get('/', function (req, res) {
//     const fs = require('fs');
//     fs.readFile('./src', 'utf8', (err, data) => {
//     if (err) {
//     console.error(err);
//     return;
//     }
// });
//     res.send(data);
// })

const express = require('express');
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname+"/src")));
app.listen(3000, () => {
    console.log("project run in port: 3000");
});

app.get('/detail', function (req, res) {
    res.send('Hello from api in detail');
})