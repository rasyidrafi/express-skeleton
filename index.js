const express = require("express"),
  jwt = require("express-jwt"),
  jsendie = require("jsendie"),
  app = express(),
  PORT = process.env.PORT || 5000;

// JSON standard response
app.use(jsendie());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// JWT Middleware
const noAuth = ["/", "/token", "/oke"];
app.use(
  jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }).unless({
    path: noAuth,
  })
);

// Routes
const routes = require("./router");
routes.forEach(({ path, route }) => {
  console.log(`registered [${path}] => [${route}]`);
  app.use(path, require(route))
});

// invalid jwt / not found
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.error("invalid jwt token", 401);
  } else {
    // page not found
    res.error("page not found", 404);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
module.exports = app;
