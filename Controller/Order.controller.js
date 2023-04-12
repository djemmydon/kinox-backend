import Order from "../Model/order.schema.js";
// import User from "../Model/user.schema.js";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import hbs from "nodemailer-express-handlebars";
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
      user: "kinoxapparel@gmail.com",
      pass: "hfktbzxqwvjavhcm",
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

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./view"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./view"),
      extName: ".handlebars",
    };

    mailTransporter.use("compile", hbs(handlebarOptions));



    const details = {
      from: '"Kinox Aparel" kinoxapparel@gmail.com',
      to: email,
      subject: "Your order is created successfully.",
      template: "index",
      context: {
        order,
        totalPrice,
        firstName,
        lastName,
      },
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
