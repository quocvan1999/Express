import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";

const model = initModels(sequelize);

const getVideo = async (req, res) => {
  try {
    let page = 3;
    let size = 4;
    let index = (page - 1) * size;
    let data = await model.video.findAll({
      offset: index,
      limit: size,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "erron for API get list video" });
  }
};

const getTypes = async (req, res) => {
  try {
    let data = await model.video_type.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "error for API get types video" });
  }
};

const getVideosTypeId = async (req, res) => {
  try {
    let { typeId } = req.params;
    let data = await model.video.findAll({
      where: {
        type_id: typeId,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error for API get videos type id" });
  }
};

const getVideoById = async (req, res) => {
  try {
    let { videoId } = req.params;
    let data = await model.video.findOne({
      where: {
        video_id: videoId,
      },
      include: [
        {
          model: model.users,
          as: "user",
        },
      ],
    });
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error for API get videos type id" });
  }
};

export { getVideo, getTypes, getVideosTypeId, getVideoById };
