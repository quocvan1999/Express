import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
};

export { createToken };
