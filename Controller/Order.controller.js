import Order from "../Model/order.schema.js";
import User from "../Model/user.schema.js";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
export const createOrder = async (req, res) => {
  const {
    order,
    email,
    firstName,
    lastName,
    shippingAddress,
    totalQuantity,
    totalPrice,
    shippingFee,
    overRawPrice,
    zipCode,
    phone,
    country,
    city,
  } = req.body;

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "peculiarsmith2000@gmail.com",
      pass: "lpdzjrqrfrohpqhn",
    },
  });

  try {
    // if (!orderUser) throw new Error("User not found")

    // orderUser.orders.push(newOrder._id);
    const newOrder = new Order({
      order,
      email,
      firstName,
      lastName,
      shippingAddress,
      totalQuantity,
      totalPrice,
      shippingFee,
      overRawPrice,
      zipCode,
      phone,
      country,
      city,
    });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(__dirname, "../view/index.ejs");
    const data = await ejs.renderFile(templatePath, {
      firstName,
      lastName,
      order,
      totalPrice,
    });

    const details = {
      from: "peculiarsmith2000@gmail.com",
      to: email,
      subject: "Testing for Kinox Apparel",
      text: "This is the body",
      html: data,
    };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("their is error", err);
      } else {
        console.log("sent it");
      }
    });

    const savedUser = await newOrder.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Order.findOne({ _id: id });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const product = await Order.find({});

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateeOrder = (req, res) => {};
