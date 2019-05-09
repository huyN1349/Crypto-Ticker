const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  //console.log(req.body.crypto);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var apiUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var fullAPI = apiUrl + crypto + fiat;
  request(fullAPI,function(error,response,body){
    var data = JSON.parse(body);
    var price = data.last;
    res.send(`Current price of ${crypto} is ${price} ${fiat}`)
    console.log(price);
  });
})

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
