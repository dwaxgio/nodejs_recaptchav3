require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.json());

const handleSend = (req, res) => {
  const SECRET_KEY = "6LdALYAbAAAAAH7AyqGVfELLUP8MJnk_K-GivN9Q";
  const secret_key = SECRET_KEY;
  const token = req.body.token;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => res.json({ google_response }))
    .catch((error) => res.json({ error }));
};

app.post("/send", handleSend);

app.listen(port, () => console.log(`Listening on port ${port}!`));
