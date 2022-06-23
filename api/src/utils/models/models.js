const { User } = require("../../db");
const boom = require("@hapi/boom");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { GMAIL_USER, GMAIL_PASSWORD, keyTokens } = process.env;

module.exports = {
  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  },
  checkRoles(...roles) {
    return (req, res, next) => {
      const user = req.user
      
      if (roles.includes(user.role)) {
        next();
      } else {
        
        next(boom.unauthorized());
      }
    };
  },
  todayDate() {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const yyyy = today.getFullYear();
    const now = `${yyyy}-${mm}-${dd}`;
    return now;
  },

  async sendEmailResetPassword(email) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw boom.unauthorized();
      }
      const payload = { sub: user.userId };
      const token = jwt.sign(payload, keyTokens, {
        expiresIn: "1h",
      });
      await User.update(
        {
          recoveryToken: token,
        },
        {
          where: {
            userId: user.userId,
          },
        }
      );

      const link = `http://localhost:3001/resetPassword?token=${token}`;

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: GMAIL_USER, // generated ethereal user
          pass: GMAIL_PASSWORD, // generated ethereal password
        },
      });
      await transporter.sendMail({
        from: GMAIL_USER, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Recuperar contraseña", // Subject line
        html: `<b>Ingresa a este Link para recuperar tu contraseña 👉👉 ${link} </b>`, // html body
      });
      return { status: true, message: "Email sent" };
    } catch (err) {
      console.log(err);
    }
  },

  async changePass(token, newPassword) {
    try {
      const payload = jwt.verify(token, keyTokens);
      const user = await User.findByPk(payload.sub);
      if (!user) throw boom.unauthorized();
      if (user.dataValues.recoveryToken !== token)
        throw boom.unauthorized();

      const hashPassword = await bcrypt.hash(newPassword, 10);

      await User.update(
        {
          recoveryToken: null,
          password: hashPassword,
        },
        {
          where: {
            userId: user.userId,
          },
        }
      );
      return { status: true, message: "Password changed" };
    } catch (err) {
      console.log(err);
      throw boom.unauthorized();
    }
  },
};
