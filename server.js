"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  .get("/bot-message", (req, res) => {
    const getBotMessage = (text) => {
      let botMsg = text;
      let userText = text.toLowerCase();
      let hearJoke = false;

      const commonGreetings = ["hi", "hello", "howdy"];
      commonGreetings.forEach((greeting) => {
        if (userText.includes(greeting)) {
          botMsg = "Hello!";
        }
      });
      const commonGoodbyes = ["goodbye", "bye", "ciao"];
      commonGoodbyes.forEach((goodbye) => {
        if (userText.includes(goodbye)) {
          botMsg = "see ya!";
        }
      });
      const somethingFunny = ["something funny"];
      const jokes = [
        "What's brown and sticky? A stick.",
        "Why can't you hear a psychiatrist using the bathroom? Because the 'P' is silent.",
        "What did the fisherman say to the magician? Pick a cod, any cod.",
      ];

      if (hearJoke === true) {
        if (userText.includes("yes")) {
          botMsg = jokes[Math.floor(Math.random() * 2)];
          hearJoke = false;
        } else if (userText.includes("no")) {
          botMsg = "Goodbye...";
          hearJoke = false;
        }
      }
      // couldn't figure out how to use the hearJoke function properly. Everything works except for the joke output.

      somethingFunny.forEach((funny) => {
        if (userText.includes(funny)) {
          botMsg = "do you want to hear a joke?";
          hearJoke = true;
        }
      });

      return botMsg;
    };

    const message = {
      author: "bot",
      text: "bzzt " + getBotMessage(req.query.text),
    };

    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
