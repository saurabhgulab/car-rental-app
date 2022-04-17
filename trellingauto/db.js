const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    "mongodb+srv://root:Root123@cluster0.9osfj.mongodb.net/trellingauto",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("Database connected successfully!");
  });
  connection.on("error", () => {
    console.log("Connection Fail!");
  });
};

connectDB();

module.exports = mongoose;
