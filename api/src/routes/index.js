const { Router } = require('express');
const Post = require('./Post');
const Categories = require("./Categories");
const User = require("./User");
const Comments = require("./Comments");
const passport = require("passport");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/post', Post);
router.use("/categories", Categories);
router.use("/user", User);
router.use("/comments", Comments);



module.exports = router;
