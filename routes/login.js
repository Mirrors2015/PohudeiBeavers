const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.render("partials/login");
});
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.redirect("/constructor");

      // req.session.email = email;
    } else {
      res.sendStatus(418);
    }
    // const validPassword = bcrypt.compareSync(password, user.password);
    // if (!validPassword) {
    // return res.sendStatus(401);
    // }
  } catch (error) {
    console.log(error);
    res.sendStatus(418);
  }
});

module.exports = router;
