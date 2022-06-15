const express = require("express");
const router = express.Router();
const { Categories } = require('../db.js')
const axios = require("axios");


router.get("/", (req, res) => {
    Categories.findAll()
        .then(categories => {
            res.json(categories);
        }
        )
        .catch(err => {
            res.status(500).json({ message: err.message });
        }
        );
}
);
router.get("/:id", async (req, res) => {
    Categories.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(category => {
        res.json(category);
    }
    )
    .catch(err => {
        res.status(500).json({ message: err.message });
    }
    );
}
);


router.post("/", async (req, res) => {
    const { name } = req.body;
    const category = await Categories.create({
        name
    });
    res.json(category);
}
);

router.put("/:id", async (req, res) => {
    const { name } = req.body;
    const category = await Categories.update({
        name
    }, {
        where: {
            id: req.params.id
        }
    });
    res.json(category);
}
);


module.exports = router;
