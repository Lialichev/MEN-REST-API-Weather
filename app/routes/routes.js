const ObjectID = require('mongodb').ObjectID;

module.exports = function (app, client) {
    const db = client.db('weather');

    // GET ALL
    app.get('/api/weather', (req, res) => {
        db.collection('weather-api').find().toArray()
            .then(data => res.send(data))
            .catch(err => {
            res.status(500).send({
                message: err.message || "Error server"
            });
        });
    });

    // GET ID
    app.get('/api/weather/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('weather-api').findOne(details, (err, item) => {
            if (err) return res.send({ 'error': 'An error has occurred' });

            return res.send(item);
        });
    });

    // POST
    app.post('/api/weather', (req, res) => {
        const data = {
            temp: req.body.temp,
            pressure: req.body.pressure,
            humidity: req.body.humidity
        };

        db.collection('weather-api').insertOne(data, (err, result) => {
            if (err) return res.send({ 'error': 'An error has occurred' });

            return res.send(result.ops[0]);
        });
    });
};