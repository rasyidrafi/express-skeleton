const router = require("express").Router();

// router.get('/', (req, res) => res.redirect("/dashboard"));
router.get("/", (req, res) => {
  res.success({
    message: "Hi, JSendie!",
  });
});

module.exports = router;
