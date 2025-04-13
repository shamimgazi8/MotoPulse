import express from "express";
import db from "./models";
import routes from "./routes/index";
import dotenv from "dotenv";
const cors = require("cors");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // allow requests from your frontend
    credentials: true, // if you're using cookies or auth headers
  })
);

app.use(express.json());
app.use("/", routes);

db.sequelize.sync().then(() => {
  console.log("Database synced🚀");
});

export default app;
