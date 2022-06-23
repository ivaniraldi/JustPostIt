const express = require("express");
const router = express.Router();
const { Post, Categories, User, Comments } = require('../db.js')
const axios = require("axios");
const passport = require("passport");
const { checkRoles } = require("../utils/models/models.js");
const controllersPost = require("../Controllers/Post");


router.get("/", 
    // passport.authenticate("jwt", { session: false }),
    // checkRoles("admin", "user"),
    controllersPost.get

)

router.post("/", 
    passport.authenticate("jwt", { session: false }),
    checkRoles("user", "admin"),
    controllersPost.post
)

router.delete("/:id", 
    controllersPost.delete
)

router.get("/:id", 
    controllersPost.getId
)
router.get("/:id/comments", 
    controllersPost.getComments
)

router.post("/:id/comments", 
passport.authenticate("jwt", { session: false }),
checkRoles("admin", "user"),
    controllersPost.postComment
)

router.put("/:id/comments/:commentId", 
passport.authenticate("jwt", { session: false }),
checkRoles("admin", "user"),
    controllersPost.putComments
    
)

router.delete("/:id/comments/:commentId", 
    controllersPost.deleteComments
)



module.exports = router;