const express = require("express");
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", require("./routes/userprofile"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connectDb();
module.exports = app;
