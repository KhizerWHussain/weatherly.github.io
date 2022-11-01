const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const APIKey = 'put your api key here';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${APIKey}`;
    console.log(req.body.city);
    request(url, function (err, errorresponse, body) {
        if (err) {
            err.render("index", { weather: null, error: "Error! invalid city name" })
        }
        else {
            let weather = JSON.parse(body);
            if (weather.main === undefined) {
                res.render('index', { weather: null, error: "Error! please try again later" })
            }
            else {
                let weatherText = `It's ${weather.main.temp} degree celsius with ${weather.weather[0].main} in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
                console.log("body", body);
            }
        }

    })
});

app.listen(3000, function () {
    console.log("weatherly app listening on port : 3000")
});