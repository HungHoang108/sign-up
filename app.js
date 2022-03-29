const express = require("express");
const bodyParser = require("body-parser");
const requrest = require("request"); // to get and send inserted data
const { json } = require("body-parser"); // to connecting html file
const https = require("https");
const { options } = require("request");
const { request } = require("http");

const app = express();


// send access to server and send back to root

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

// connect to css file

app.use(express.static("public"));

// bodyParser to retreive and send back data from html

app.use(bodyParser.urlencoded({extended: true}));
app.post("/", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    
    const data = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/3ccace4dbf/members";
    
    const options = {
        method: "POST",
        auth: "hung:d5d3630304e2071f3b98b18a542953db-us14"
      };
    
    
    const request = https.request(url, options, function (response) {

      // Connecting success and failure page

        if (response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
        } else {
          res.sendFile (__dirname + "/failure.html");
        }

      // Converting Js data to Json

        response.on("jsonData", function (jsonData) {
            console.log (JSON.parse(jsonData));
        })
        
    })
    request.write(jsonData);
    request.end();
    
})

app.post("/failure", function (req, res) {
  res.redirect("/");
  
})

// Create a server gate

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
})



// d5d3630304e2071f3b98b18a542953db-us14

// audience Id: 3ccace4dbf