import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import transporter from "../config/transporter.js";
import { createToken } from "../config/jwt.js";
import crypto from "crypto";

const model = initModels(sequelize);

const singUp = async (req, res) => {
  try {
    // Lấy input từ body
    let { full_name, email, pass_word } = req.body;

    // Kiểm tra email có tồn tại hay không
    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      return res.status(400).json({ message: "Email is wrong" });
    }

    // Create - create
    // update - update
    // remove - destroy

    await model.users.create({
      full_name,
      email,
      pass_word: bcrypt.hashSync(pass_word, 10),
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Our Service",
      html: `
        <h1>Welcome ${full_name}</h1>
      `,
    };

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        return res.status(500).json({ message: "Send email fail" });
      }
      return res.status(201).json({ message: "Create user successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error API sign up" });
  }
};

const login = async (req, res) => {
  try {
    let { email, pass_word } = req.body;

    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return res.status(400).json({ message: "Email is wrong" });
    }

    let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);

    if (!checkPass) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const payload = {
      userId: checkUser.user_id,
    };

    let accessToken = createToken(payload);

    return res.status(200).json({
      message: "Login successfully",
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error API login" });
  }
};

const loginFacebook = async (req, res) => {
  try {
    let { id, email, name } = req.body;

    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    if (!checkUser) {
      let newUser = await model.users.create({
        full_name: name,
        email,
        face_app_id: id,
      });

      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Our Service",
        html: `
          <h1>Welcome ${name}</h1>
        `,
      };

      return transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          return res.status(500).json({ message: "Send email fail" });
        }

        const payload = {
          userId: newUser.user_id,
        };

        let accessToken = createToken(payload);

        return res
          .status(201)
          .json({ message: "Login successfully", token: accessToken });
      });
    }

    const payload = {
      userId: checkUser.user_id,
    };

    let accessToken = createToken(payload);

    return res
      .status(201)
      .json({ message: "Login successfully", token: accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Error Api login facebook" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return res.status(400).json({ message: "Email is wrong" });
    }

    let randomCode = crypto.randomBytes(6).toString("hex");
    let expire = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

    await model.code.create({
      code: randomCode,
      expire,
    });

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Code xác thực",
      html: `
        <h1>${randomCode}</h1>
      `,
    };

    return transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        return res.status(500).json({ message: "Send email fail" });
      }

      return res.status(200).json({
        message: "Send forgot password successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "error API forgot password" });
  }
};

const changePassword = async (req, res) => {
  try {
    let { email, code, newPass } = req.body;

    let checkEmail = await model.users.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail) {
      return res.status(400).json({ message: "Email is wrong" });
    }

    if (!code) {
      return res.status(400).json({ message: "Code is wrong" });
    }

    let checkCode = await model.code.findOne({
      where: {
        code,
      },
    });

    if (!checkCode) {
      return res.status(400).json({ message: "Code is wrong" });
    }

    let hashNewPass = bcrypt.hashSync(newPass, 10);

    // C1
    checkEmail.pass_word = hashNewPass;
    checkEmail.save();

    // C2

    // Huỷ code sau khi đã change pasword
    await model.code.destroy({
      where: {
        code,
      },
    });

    return res.status(200).json({ message: "Change password successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error API change password" });
  }
};

export { singUp, login, loginFacebook, forgotPassword, changePassword };
