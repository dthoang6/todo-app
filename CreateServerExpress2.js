let express = require("express");

let ourApp = express();

ourApp.use(express.urlencoded({ extended: false }));

ourApp.get("/", function (req, res) {
  res.send(`
    <form action = "/answer", method = "POST" >
      <p>What is the sky's color in the clear day?</p>
      <input name = "skyColor">
      <button>Submit Answer.</button>
    </form>
  `);
});

ourApp.post("/answer", function (req, res) {
  if (req.body.skyColor == "blue") {
    res.send(`
      <p>Congrats. It is correct.</p>
      <a href="/" >Back to homepage</a>
    `);
  } else {
    res.send(`
      <p>It is not correct. Please try again.</p>
      <a href="/" >Back to homepage</a>
    `);
  }
});

ourApp.listen(3000);
