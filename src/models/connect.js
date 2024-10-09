import { Sequelize } from "sequelize";

// Tạo object sequelize để connect tới DB
const sequelize = new Sequelize("node47_youtube", "root", "123456", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
});

export default sequelize;
