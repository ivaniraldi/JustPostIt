const express = require("express");
const router = express.Router();
const { Post, Categories, User, Comments } = require('../db.js')
const axios = require("axios");
const passport = require("passport");
const { checkRoles } = require("../utils/models/models.js");


module.exports = {
    get: async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: Categories,
                attributes: ["categoryId", "name"],
            }, {
                model: User,
                attributes: ["userId", "name", "email"],
            }, {
                model: Comments,
                attributes: ["commentId", "comment", "createdAt", "updatedAt", "userId", "userName"],
            }],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }},

    post: async (req, res) => {  
    const {
        userId,
        title,
        image,
        content,
        categories,
    } = req.body;
    try {
        let HoyArgentina = new Date()
        HoyArgentina = HoyArgentina.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
        let createdAt = HoyArgentina;
        let updatedAt = HoyArgentina;
        const post = await Post.create({
            userId,
            title,
            content,
            image,
            categories,
            createdAt,
            updatedAt,
        });
        const cats = categories?.map(async c => {
        const categ = await Categories.findByPk(c);
        
        post.addCategory(categ);
        })
        await Promise.all(cats)
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
} ,
put: async (req, res) => {
    const { id } = req.params;
    const {
        userId,
        title,
        image,
        content,
        categoryId,
    } = req.body;
    try {
        let HoyArgentina = new Date()
        HoyArgentina = HoyArgentina.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
        let updatedAt = HoyArgentina;
        const post = await Post.update(
            {
                userId,
                title,
                image,
                content,
                categoryId,
                updatedAt,
            },
            {
                where: {
                    postId: id,
                },
            },
        );
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}, delete: async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.destroy({
            where: {
                postId: id,
            },
        });
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}, getId: async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({
            where: {
                postId: id,
            },
            include: [{
                model: Categories,
                attributes: ["categoryId", "name"],
            }, {
                model: User,
                attributes: ["userId", "name", "email"],
            },{
                model: Comments,
                attributes: ["commentId", "comment", "createdAt", "updatedAt", "userId", "userName"],
            }],
        });
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}, getComments: async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comments.findAll({
            where: {
                postId: id,
            },
            include: [{
                model: User,
                attributes: ["userId", "name", "email"],
            }],
        });
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}, postComment: async (req, res) => {
    const { id } = req.params;
    const {
        userId,
        comment,
    } = req.body;
    let user = await User.findOne({
        where: {
            userId,
        },
        attributes: ["name"],
    })
    let userName = user.name
    try {
        let HoyArgentina = new Date()
        HoyArgentina = HoyArgentina.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
        let createdAt = HoyArgentina;
        let updatedAt = HoyArgentina;

        const comment1 = await Comments.create({
            userId,
            comment,
            postId: id,
            createdAt,
            updatedAt,
            userName,
        });
        const post1 = await Post.findByPk(id);
        post1.addComment(comment1);
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}, putComments: async (req, res) => {
    const { id, commentId } = req.params;
    const {
        userId,
        comment,
    } = req.body;
    try {
        let HoyArgentina = new Date()
        HoyArgentina = HoyArgentina.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
        let updatedAt = HoyArgentina;
        const comment1 = await Comments.update(
            {
                userId,
                comment,
                updatedAt,
            },
            {
                where: {
                    commentId: commentId,
                },
            },
        );
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}, deleteComments: async (req, res) => {
    const { id, commentId } = req.params;
    try {
        const comment = await Comments.destroy({
            where: {
                commentId: commentId,
            },
        });
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
}
