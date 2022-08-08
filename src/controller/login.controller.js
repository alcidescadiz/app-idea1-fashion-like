import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const KEY = process.env.KEY;
import { getOneDb } from "../services/lowdb.repository.js";

const database = "users";

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getOneDb(email, database);
    if (user.email === email && user.password === password) {
      const token = jwt.sign(user, KEY, { expiresIn: "48h" });
      res
        .cookie("app-fashion-token", token, {
          expires: new Date(Date.now() + 60 * 60 * 60 * 24 * 2)
        })
        .status(200)
        .json({ email: user.email, like: user.like, dislike: user.dislike });
    } else {
      throw "Error en los datos";
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
      msg: "Ud no tiene autorización",
    });
  }
}

export async function Logout(req, res) {
  try {
    res
      .cookie("app-fashion-token", "0", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .status(200)
      .json({ msg: "hasta luego" });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
}
