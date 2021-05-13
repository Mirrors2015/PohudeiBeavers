const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("partials/login");
});
// router.post("/constructor", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.sendStatus(400);
//     }
//     const validPassword = bcrypt.compareSync(password, user.password);
//     if (!validPassword) {
//       res.sendStatus(401);
//     }
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(418);
//   }
// });

module.exports = router;
