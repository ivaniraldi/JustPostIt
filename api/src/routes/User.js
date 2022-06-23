const express = require("express");
const router = require("express").Router();
const userController = require("../Controllers/User");
const passport = require("passport");
const { checkRoles } = require("../utils/models/models.js");

require("../utils/auth");

router.route("/register").post(userController.post);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.passport
);

router.route("/googlelogin").post(userController.googleloginPost);

router.get(
  "/",
  userController.get
);

router.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("user", "admin"),
  userController.getById
);

router.put(
  "/:id",
//   passport.authenticate("jwt", { session: false }),
//   checkRoles("admin", "user", "employed"),
  userController.put
);

module.exports = router;
