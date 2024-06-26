import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import codeRoute from "./routes/codeRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use(reviewRoutes);
app.use(codeRoute);
app.use("/uploads", express.static("./uploads"));

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

app.use(bodyParser.json());
//PORT
const PORT = process.env.PORT;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
