const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

//mongoDBconnection
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode port ${process.env.PORT}`
  );
});
