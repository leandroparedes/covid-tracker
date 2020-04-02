const express = require('express');
const app = express();

app.use(express.static(__dirname + "/dist/"));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get(/.*/, function (req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

app.listen(port, host, () => console.log(`Server started on ${port}`));