const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  //
  //
  res.render("partials/registration");
});
router.post("/", async (req, res, next) => {
  //
  //
  //
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.sendStatus(400);
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: "User" });
    const user = new User({
      username,
      email,
      password: hashPassword,
      roles: [userRole.value],
    });
    await user.save();
    // req.session.username = req.body.username;
    return res.redirect("/constructor");
    // return res.json({ message: "Пользователь успешно зарегистрован" });
  } catch (error) {
    console.log(error);
    res.sendStatus(418);
  }
});

module.exports = router;
