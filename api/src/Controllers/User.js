require("dotenv").config();
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { keyTokens } = process.env;

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const user1 = await User.findOne({
        where: {
          email: email,
        },
      });

      let HoyArgentina = new Date();
        HoyArgentina = HoyArgentina.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"})
      let createdAt = HoyArgentina;
      let updatedAt = HoyArgentina;

      if (user1) {
        res.status(400).send("Email already exists");
      } else if (email && password && name) {
        const passwordhash = await bcrypt.hash(password, 10);
        await User.create({
          email,
          password: passwordhash,
          name,
          createdAt,
            updatedAt,
        });
        res.status(201).json({
          message: "cuenta creada",
        });
      } else {
        res.status(400).send("parameters missing");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  googleloginPost: async (req, res) => {

    const { email, name } = req.body;
    try{
      if(email){
        const [user, created] = await User.findOrCreate({
          where: {
            email,
          },
          defaults: {
            name: name.split(" ")[0],
            email,
          },
        });
        const payload = {
          sub: user.idUser,
          role: user.role,
        };
        const token = jwt.sign(payload, keyTokens, {
          expiresIn: "1h",
        });
        const prueba = {user, token};
        console.log(prueba);
        res.json({
          user,
          token,
        });
      }else{
        res.status(400).send("email incorrect");
      }

    }catch(error){
      res.status(400).send("hubo un error en el server");
    }
  },
  get: async (req, res) => {
    try {
      const user1 = await User.findAll();
      delete user1.password;
      delete user1.recoveryToken;
      res.status(200).json(user1);
    } catch (error) {
      console.log(error);
      res.status(400).send("hubo un error en el server");
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user1 = await User.findOne({
        where: {
          userId: id,
        },
      });
      if (user1) {
        delete user1.dataValues.password;
        delete user1.dataValues.recoveryToken;
        res.status(200).json(user1);
      } else {
        res.status(400).send("user not found");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("bad request");
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      email,
      role,
    } = req.body;

    // if(email){
    try {
        let HoyArgentina = new Date();
        HoyArgentina = HoyArgentina.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"})
        let updatedAt = HoyArgentina;
      await User.update(
        {
          name,
          email,
          role,
            updatedAt,
        },
        {
          where: {
            userId: id,
          },
        }
      );
      res.status(200).json({ message: "user updated", name: User.name });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "error updating User" });
    }
  },

  passport: async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.userId,
        role: user.role,
      };
      const token = jwt.sign(payload, keyTokens, {
        expiresIn: "1d",
      });
      const prueba = {user, token};
      console.log(prueba);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
