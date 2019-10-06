const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize the app middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")));

// MongoDB Database connection
const { db } = require("./config/Keys");
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully \n${db}`))
  .catch(err => console.log(`Unable to connect with the database ${err}`));

// App listener
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

// Bring in the routes
const imageUploadRoutes = require("./routes/images");
app.use("/api/images", imageUploadRoutes);

// Send the static file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
