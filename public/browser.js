/* step 4.5: write a browser based code to detect the submit event for that create form for create feature */
function itemTemplate(item) {
  return `
            <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">${item.text}</span>
                <div>
                    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
            </li>
          `;
}

//Initial page load render and use the raw data which is items array from server to generate the html.
let ourHTML = items
  .map(function (item) {
    return itemTemplate(item);
  })
  .join("");

document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML);

//create feature
let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  //use axios to have the browser send off an asynchronous or on the fly request to our node server.
  axios
    .post("/create-item", { text: createField.value })
    .then(function (response) {
      //this line of code will run when our server response the object using res.json(response object) by passing through as argument response
      //create html for new item on the fly without reload
      document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data)); //response.data will access that js object that represents the newest document in the database that the server is sending back to our browser.
      createField.value = "";
      createField.focus();
    })
    .catch(function () {
      console.log("Please try again later.");
    });
});

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
