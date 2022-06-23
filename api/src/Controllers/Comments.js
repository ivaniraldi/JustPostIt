require("dotenv").config();
const axios = require("axios");
const { Comments, User } = require("../db");

module.exports = {
    get: async (req, res) => {
        try {
            const comments = await Comments.findAll({
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
    },

    post: async (req, res) => {
        const {
            userId,
            comment,
            postId,
        } = req.body;
        try {
            let HoyArgentina = new Date()
            HoyArgentina = HoyArgentina.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
            let createdAt = HoyArgentina;
            let updatedAt = HoyArgentina;
            const comment1 = await Comments.create({
                userId,
                postId,
                comment,
                createdAt,
                updatedAt,
            });
            res.status(200).json(comment1);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    put: async (req, res) => {
        const { id } = req.params;
        const {
            userId,
            comment,
            postId,
        } = req.body;
        try {
            let HoyArgentina = new Date()
            HoyArgentina = HoyArgentina.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
            let updatedAt = HoyArgentina;
            const comment1 = await Comments.update(
                {
                    userId,
                    postId,
                    comment,
                    updatedAt,
                },
                {
                    where: {
                        commentId: id,
                    },
                }
            );
            res.status(200).json(comment1);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const comment1 = await Comments.destroy({
                where: {
                    commentId: id,
                },
            });
            res.status(200).json(comment1);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const comment1 = await Comments.findOne({
                where: {
                    commentId: id,
                },
                include: [{
                    model: User,
                    attributes: ["userId", "name", "email"],
                }],
            });
            res.status(200).json(comment1);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}