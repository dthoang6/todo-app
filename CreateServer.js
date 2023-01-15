//in the node environment, whenever we use a special node word or ability like http, we need to explicitly tell node to load or import or require in that functionality.

//even though http is part of node, we still need to add a new line of code to tell node to load in that functionality, and we store that functionality in a variable http.
let http = require("http");

/*Step 1: Using node to create a server
-we want to create a server that listens for incoming requests so that we can visit that server in our web browser.
-have a server send back a response that's say something.

-Realize that we are writing code for the node environment, not the web browser environment.
-we need to use node special word: http
-web browser environment: document.

//step 2: make the server sending back of different responses, depending on the url that the visitor try to visit. How can we accomplish it with request object?
*/

//using node environment with js language to create a server.
let ourApp = http.createServer(function (req, res) {
  //pass into an argument a function to response to an incoming request:
  //inside this anonymous function we can leverage the request object and response object which the server is going to pass into createServer method every time it call this anonymous function.
  //use response object
  //we want to end our response object by sending a little bit of tex that say hello
  res.end("hello");
});
//tell the server to begin listening incoming request.
//we need to pass a port number 3000 as argument
ourApp.listen(3000);

//what should the server do in response to an incoming request?

//when we call the http.createServer method, we want to pass it a function as an argument and then the server is going to call that function every time it receives an incoming request.

//we can use anonymous function as an argument
//req is request, res is response
//localhost is the address for your own computer, we chose 3000 as a port number

//test: node test.js
//web browser: localhost:3000
