import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// import { register } from "./contoller/auth.js";
import userRoutes from "./Routes/user.route.js";
import orderRoutes from "./Routes/orders.route.js";

// config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "500mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 100000,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://kinoxoriginal.com"],
  })
);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route with file

//Routes
// app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/order", orderRoutes);

// Mongoose setup

const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

export default app;
