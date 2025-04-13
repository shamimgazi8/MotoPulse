import express from "express";
import db from "./models";
import routes from "./routes/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/", routes);

db.sequelize.sync().then(() => {
  console.log("Database synced🚀");
});

export default app;
