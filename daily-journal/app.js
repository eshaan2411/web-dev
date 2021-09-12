//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// Content
const homeStartingContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Like what you see? Contact us through EMAIL for more amazing templates."
const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Home page
app.get('/', function(req, res) {
  res.render("home", {
    startContent: homeStartingContent,
    entries: posts
  });
});

// About Page
app.get('/about', function(req, res) {
  res.render("about", {
    aboutMe: aboutContent
  });
});

// Contact Page
app.get('/contact', function(req, res) {
  res.render("contact", {
    contactUs: contactContent
  });
});


// Compose
app.get('/compose', function(req, res) {
  res.render("compose", {});
});

app.post('/compose', function(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);

  res.redirect("/");
});


// Post Route
app.get('/posts/:myPost', function(req, res) {
  const requestedPost = _.lowerCase(req.params.myPost);

  posts.forEach(function(post) {
    const postTitle = _.lowerCase(post.title);

    if (requestedPost === postTitle) {
      res.render("post", {
        sentPost: post
      });
    };

  });
  res.redirect('/');

});



app.listen(3000, function() {
  console.log("Server successfully started on port 3000");
});
