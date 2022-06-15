const { Router } = require('express');
const Post = require('./Post');
const Categories = require("./Categories");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/post', Post);
router.use("/categories", Categories);



module.exports = router;
