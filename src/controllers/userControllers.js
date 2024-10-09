import connect from "../../dp.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";

const model = initModels(sequelize);

const getUserDb = async (req, res) => {
  const [data] = await connect.query(`
          SELECT * FROM users
      `);
  res.send(data);
};

const getUserOrm = async (req, res) => {
  try {
    let data = await model.users.findAll({
      where: {
        full_name: {
          [Op.like]: `%John%`,
        },
      },
      attributes: ["user_id", "full_name", "email"],
      include: [
        {
          model: model.video,
          as: "videos",
          attributes: ["video_name"],
        },
      ],
    });
    // let data = await model.users.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "erroe from ORM" });
  }
};

const getUserOrmById = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await model.users.findOne({
      where: {
        user_id: id,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "erroe from ORM" });
  }
};

const createUserOrm = async (req, res) => {
  try {
    let { full_name, email } = req.body;
    await model.users.create({
      full_name,
      email,
    });
    return res.status(201).json({ message: "Create user successfully" });
  } catch (error) {
    return res.status(500).json({ message: "erroe from ORM" });
  }
};

export { getUserDb, getUserOrm, getUserOrmById, createUserOrm };
