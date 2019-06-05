const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');
const cors = require('cors');
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);

    require('./app/routes')(app, client);

    app.listen(port, () => console.log(`Server running on port ${port}`));
});