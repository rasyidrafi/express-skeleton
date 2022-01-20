const express = require("express"),
  jwt = require("express-jwt"),
  jsendie = require("jsendie"),
  app = express(),
  PORT = process.env.PORT || 5000;

// JSON standard response
app.use(jsendie());

// JWT Middleware
const noAuth = ["/token"];
app.use(jwt({ secret: 'shhhhhhared-secret', algorithms: ['HS256']}).unless({path: noAuth}));

app.get("/", (req, res) => {
  res.success({
    message: "Hi, JSendie!",
  });
});

// on invalid jwt
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.error("invalid jwt token", 401);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
module.exports = app;
