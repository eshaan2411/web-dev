//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

//   Preferably use mailchimp services and API. 
  const jsonData = JSON.stringify(data);
  const url = "#your url";
  const options = {
    method: "POST",
    auth: "#your auth"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode ===200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Successfully Started at port 3000.");
});
