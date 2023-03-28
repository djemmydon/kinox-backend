import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
  order: {
    type: Array,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  totalQuantity: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  shippingFee: {
    type: String,
    required: true,
  },
  overRawPrice: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  zipCode: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderModel);
export default Order;
// order,
// email,
// firstName,
// lastName,
// shippingAddress,
// totalQuantity,
// totalPrice,
// shippingFee,
// overRawPrice,
