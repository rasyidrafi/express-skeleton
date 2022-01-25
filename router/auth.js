const router = require("express").Router();

// router.get('/', (req, res) => res.redirect("/dashboard"));
router.get("/login", (req, res) => {
  res.render("pages/login", {
    title: "Sign-In",
    msg: "Silahkan Login untuk Melanjutkan",
  });
});

module.exports = router;
