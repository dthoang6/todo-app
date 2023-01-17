/* step 1: create a server to listen for incoming request */
let express = require("express");
//step 4.1
//we want to look inside of mongodb package for something called: Mongo Client, and we can use destructuring object to pull out 4 or 5 different things of mongodb package instead of just MongoClient.
let { MongoClient } = require("mongodb");

/* let mongodb = require(mongodb); //we are not going to use the package directly
 */
let App = express();

//we need to set up a variable to represents a MongoDB database that we've opened a connection to.
let db;
/* //this is the connection string to our database that gives us access or permission.
//starting by creating a client variable to hold the return of the new instance of Mongo Client.
let client = new MongoClient("");
client.connect();//we need to wait this connect to finish.
db = client.db(); 
- there is one big problem with this code, we need to wait for this connect method to actually finish or complete before we can do anything else. We don't know how long this is going to take to complete. use async/await modern approach instead of callback function.
*/
async function go() {
  let client = new MongoClient("mongodb+srv://todoAppUser:12347@cluster0.wraxtma.mongodb.net/TodoApp?retryWrites=true&w=majority"); //this is where we tell or what we want to connect to, we want to connect to a database that lives within our mongodb atlas account.
  await client.connect(); //we need to wait this connect to finish so use await.
  db = client.db(); //this line of code will make our database available from the global db variable.
  App.listen(3000);
}
go();

App.use(express.urlencoded({ extended: false }));
//step 2: in future we will keep html template in the separated file: hard code fake items.
App.get("/", function (req, res) {
  res.send(`
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple To-Do App!</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1 class="display-4 text-center py-1">To-Do App!</h1>
    
    <div class="jumbotron p-3 shadow-sm">
      <form action="/create-item", method = "POST" >
        <div class="d-flex align-items-center">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <button class="btn btn-primary">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul class="list-group pb-5">
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #1</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #2</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
      <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">Fake example item #3</span>
        <div>
          <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>
    </ul>
    
  </div>
  
</body>
</html>
  `);
});

App.post("/create-item", function (req, res) {
  //step 4.1 create a document, collection
  //we need to set up a variable to represents a MongoDB database that we've opened a connection to.
  //this collection method is going to select items collection to perform CRUD operations.
  //create operation: insertOne method with the first argument is an object which is the object that's going to be stored as a document in the database. Inside this object, we can make up different properties and get values when user submit data.
  //the second argument is a function that will call once to create item in the database.
  //in this case we use call back function rather modern way, we need to use promise, async/await because we don't know how long it will take to create that item in database.
  db.collection("items").insertOne({ text: req.body.item }, function () {
    res.send("Thanks for submitting the form.");
  });
});
