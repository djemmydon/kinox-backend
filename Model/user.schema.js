import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  product: {
    type: Array,
    required: true,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  }],

});

const User = mongoose.model("User", userModel);
export default User;
