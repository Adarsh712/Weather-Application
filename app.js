const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=69e71bdeb3b28049804825b8dc8a820d&units=metric&q=" +
    query;

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const weatherTemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log("Temperature in " + query + " is " + weatherTemp);
      console.log("Description : " + weatherDescription);
      console.log(weatherData.weather[0].icon);

      const icon =
        "http://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png";
      res.write("<h1>Temperature in " + query + " is " + weatherTemp + "</h1>");
      res.write("<p>Description : " + weatherDescription + "</p>");
      res.write("<img src=" + icon + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
