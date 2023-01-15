//step 2: make the server sending back of different responses, depending on the url that the visitor try to visit. How can we accomplish it with request object?
//creating this simple server open the door to all sorts of possibilities.
//what's next, where do we go from here?
/* - so far, our server or app can respond to the role of the incoming request.
- what if we can use our server to respond to the value that users type into form fields? 
- How to work with user submitted data in our server? 
- What is the process of working with an evaluating user submitted data?
- In the real world, we would want other people to be able to access our server or application.
 - we would send this code CreateServer2.js to a hosting company.
 - so that the address for our server instead at local machine which is localhost:3000, will be ourAppDomain.Com
*/

let http = require("http");

let ourApp = http.createServer(function (req, res) {
  //the request object contains a bunch of information about the current incoming request.
  //if you want to be aware of which url the users trying to visit, dig into the request object
  //console.log(req.url);//this really open the door to a lot of possibilities with if statement.

  //sending back response with res object
  //res.end("hello world");

  //using an if statement to send back a different response, depending on the url the users trying to visit.
  if (req.url == "/") {
    res.end("Hello, and welcome to our homepage.");
  }

  if (req.url == "/about") {
    res.end("Hello, and welcome to our about page.");
  }

  //add a fallback so that if someone tries to visit a different url, the world doesn't end and our server doesn't just sit there or throw an error.
  res.end("We cannot find the page your are looking for.");
});

ourApp.listen(3000);
