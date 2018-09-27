const AWS = require('aws-sdk');
const express = require('express')

const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    iotData.getThingShadow({thingName: 'my_temp_sensor'}, (err, data) => {
        if (err) {
            console.error(err, err.stack);
        } else {
            const payload = JSON.parse(data.payload)
            const temperature = payload.state.desired.temprature;
            console.log(temperature);
            res.send(temperature);
        }
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

iotData = new AWS.IotData({endpoint: 'a1rxr3meyz7der.iot.us-east-1.amazonaws.com', region: 'us-east-1'});
