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
router.get("/:categoryId", async (req, res) => {
    Categories.findOne({
        where: {
            categoryId: req.params.categoryId
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

router.put("/:categoryId", async (req, res) => {
    const { name } = req.body;
    const category = await Categories.update({
        name
    }, {
        where: {
            categoryId: req.params.categoryId
        }
    });
    res.json(category);
}
);

router.delete("/:categoryId", async (req, res) => {
    const category = await Categories.destroy({
        where: {
            categoryId: req.params.categoryId
        }
    });
    res.json(category);
}
);



module.exports = router;
