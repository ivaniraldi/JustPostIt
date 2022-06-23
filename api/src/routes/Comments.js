const express = require("express");
const router = require("express").Router();
const commentsController = require("../Controllers/Comments");
const passport = require("passport");
const { checkRoles } = require("../utils/models/models.js");

router.get("/",
    // passport.authenticate("jwt", { session: false }),
    // checkRoles(["admin"]),
    commentsController.get);

router.post("/",
    // passport.authenticate("jwt", { session: false }),
    // checkRoles(["admin"]),
    commentsController.post);

router.get("/:id",
    // passport.authenticate("jwt", { session: false }),
    // checkRoles(["admin"]),
    commentsController.getById);

router.delete("/:id",
    // passport.authenticate("jwt", { session: false }),
    // checkRoles(["admin"]),
    commentsController.delete);

router.put("/:id",
    // passport.authenticate("jwt", { session: false }),
    // checkRoles(["admin"]),
    commentsController.put);

module.exports = router;


