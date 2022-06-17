const express = require("express");
const router = express.Router();
const { Post, Categories } = require('../db.js')
const axios = require("axios");


router.get("/", (req, res) => {
//get all posts including categories
    Post.findAll({
        include: [{
            model: Categories,
            attributes: ['name']
        }]
    })
        .then(posts => {
            res.json(posts);
        }
        )
        .catch(err => {
            res.status(500).json({ message: err.message });
        }
        );

});

router.get("/:id", async (req, res) => {
    //find a post by id including categories
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Categories,
            attributes: ['name']
        }]
    })
        .then(post => {
            res.json(post);
        }
        )
        .catch(err => {
            res.status(500).json({ message: err.message });
        }
        );

});

router.post("/", async (req, res) => {
    const { title, content, image, signature, categories, comments } = req.body;
    const toDay = new Date();
    const createdAt = toDay.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"})



    const post = await Post.create({title,content,image,signature, createdAt, comments});
    const cats = categories?.map(async c => {
    const categ = await Categories.findByPk(c);
    
    post.addCategory(categ);
    });
    await Promise.all(cats)
    res.send('Your post has been created successfully id:' + post.id);

}

);

router.delete("/:id", async (req, res) => {
    const post = await Post.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json(post);
}
);

router.put("/:id", async (req, res) => {
    //update a post but not the categories
    const { title, content, image, signature, comments } = req.body;
    const post = await Post.update({title,content,image,signature,comments}, {
        where: {
            id: req.params.id
        }
    });
    res.json(post);
    
}
);




module.exports = router;
