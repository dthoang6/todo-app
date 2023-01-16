/* Learn how to receive form data from a visitor and work with that data to response it.
- Instead of building a web server with http we can use Express package, which is specifically designed for the purpose of creating Web Servers.
- Express is a fast, unopinionated, minimalist web framework for Nodejs
- Express is a bunch of pre written JS code for the node environment that we can leverage.
- Express takes care of a thousand different details for us so that we can keep our code more organized and avoid reinventing the wheel.
- Express simply provides functions or methods that are specifically designed for creating web servers.

- Node without Express is like Legos.
- There's all kinds of different lego block types, some that you'll want to use, a bunch that you will not need to use. And you can use these Lego blocks to build anything.

- If we use Express, we are still using Node, but Express give us new Lego block types that were specifically designed to be used to build the Web Server.
*/

/* How to use Express to create a web server */
let express = require("express"); //node will know to look inside a folder named node modules for express folder
//begin to write code to use Express
let ourApp = express(); //this will create or return an express application or server.

//We need to tell express to enable feature: add the user's inputs to the body object that belongs to the request object.
ourApp.use(express.urlencoded({ extended: false })); //this is more of boilerplate code that you would find on the express documentation website, copy, paste, and include in each of your new express project.

//now we have a server that lives in ourApp variable
//tell a server what it should do if someone sends a request to our homepage. Using get method with 2 arguments, a = url that you want to look out for '/' represent the home page, b = anonymous function with 2 arguments with req, res.

//within anonymous function, what do we actually want to do?
//we want to send back a bit of html, when someone sends a request to the home page url. using response object with send method and literal template.

//action attribute: whatever you set as the action attribute for an html form, it's the url the browser will send the form result to.

//method attribute: this control the type of request that the browser is going to send to the server. There are many type of internet and http requests. Focus on GET request and POST request at this time.

//our server will be able to respond different depending on whether it's a get request or a post request.

//what is a GET request: when you're surfing the web, the get request is sort of the standard type of request. if you are manually type in the url or click on traditional navigation link.
ourApp.get("/", function (req, res) {
  res.send(`
    <form action="/answer" method="POST">
      <p>What color is the sky on a clear sunny day?</p>
      <input name="skyColor" autocomplete="off">
      <button>Submit Answer</button>
    </form>
  `);
});

//If i fill out the above form and then tried to submit it, my browser not only wants to get information about that new url answer, but it also needs to send along its own data to that url.
//So it needs to send that data or it needs to post that data

//how to tell the express server what it should do in response to receiving a post request to the answer url
//how can we access the data that the user submits from within our server? req.body.skyColor, out of the box, express actually will not add the user's inputs to the body object that belongs to the request object. We need to tell express to enable that feature. ourApp.use(express.urlencoded({ extended: false })).

//how to evaluate the data answer and tell them if it's correct or not? use if statement

ourApp.post("/answer", function (req, res) {
  if (req.body.skyColor == "blue") {
    res.send(`
      <p>Congrat, that is the correct answer. </p>
      <a href="/">Back to homepage.</a>
    `);
  } else {
    res.send(`
      <p>Sorry, that is incorrect. </p>
      <a href="/">Back to homepage.</a>
    `);
  }
});
/* //what is the difference between get vs post request?

ourApp.post("/answer", function (req, res) {
  res.send("Thank you for submitting a form.");
});//so this is the response if user submit the form.

ourApp.get("/answer", function (req, res) {
  res.send("Are you lost?");
});//so this is the response if user manually type the /answer url or click a traditional navigation link. */

//what is POST request? a post request typically happens when you submit a form or when user wants to send a bit of data to the server.

//let's tell ourApp server to begin listening for incoming requests.
ourApp.listen(3000);
