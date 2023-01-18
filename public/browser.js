/* 4.3.tell the web browser to listen for the event when the edit buttons is clicked on */

document.addEventListener("click", function (e) {
  //4.4 Delete Feature
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you really want to delete this item permanently?")) {
      //use axios to have the browser send off an asynchronous or on the fly request to our node server.
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then(function () {
          e.target.parentElement.parentElement.remove();
        })
        .catch(function () {
          console.log("Please try again later.");
        });
    }
  }

  //4.3.1 Edit Feature
  //if the element that was clicked on contains a class of edit me
  if (e.target.classList.contains("edit-me")) {
    //give user a place to type in and save it to a variable.
    let userInput = prompt("Enter you desired new text:", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML);
    //we want to send this value in userInput from web browser to our node server. Tell the web browser to send a request to our server without submitting a form or visiting a new url.
    //we could send a request to the server on the fly or behind the scene using: fetch or Axios, we going to use cdn axios
    //this is how we can send an on the fly post request to a server.
    //post(a,b): a = url you want to send a post request to. b = js object, data that's going to get sent along with the request to that. Data that server will receive.
    //the axios.post(a, b) will return a promise.
    //we handle the promise using then and catch instead of call back function.
    //next step is jump to server.js to receive the userInput data from web browser.
    if (userInput) {
      //if the user input is not blank, as long as it is exist, the userInput == true.
      axios
        .post("/update-item", { text: userInput, id: e.target.getAttribute("data-id") })
        .then(function () {
          //4.3.2 this is what will run once when our axios request has had a chance to complete.
          //we know that our node server is not going to send back its response until its database update action is complete.
          //manipulate the html interface or manipulate the current item to show the new input text.
          e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
        })
        .catch(function () {
          console.log("Please try again later.");
        });
    }
  }
});
