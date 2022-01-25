const express = require("express"),
  path = require("path"),
  jwt = require("express-jwt"),
  jsendie = require("jsendie"),
  app = express(),
  PORT = process.env.PORT || 5000;

// Third Party
app.use(jsendie());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// JWT Middleware
const noAuth = [new RegExp("^/auth")];
app.use(
  jwt({
    secret: process.env.JWT_SECRET || "shhhhhhared-secret",
    algorithms: ["HS256"],
  }).unless({
    path: noAuth,
  })
);

// Routes
const routes = require("./router");
routes.forEach(({ path, route }) => {
  console.log(`registered [${path}] => [${route}]`);
  app.use(path, require(route));
});

// invalid jwt / not found
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // res.status(401).render("pages/error", {
    //   errorMsg: "Please Login",
    //   dir: __dirname,
    //   statusCode: 401,
    // });
    res.redirect("/auth/login");
  }
});

// error handler
app.use((req, res) =>
  res
    .status(404)
    .render("pages/error", {
      errorMsg: "Page Not Found",
      dir: __dirname,
      statusCode: 404,
    })
);

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
module.exports = app;
