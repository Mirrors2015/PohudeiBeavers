const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("partials/admin");
});

module.exports = router;
