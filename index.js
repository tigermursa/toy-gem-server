const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" Alhamdulillah! ToyGem server running.....");
});
// starting the server>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.listen(port, () => {
  console.log(`Alhamdulillah the server running at the ${port} port`);
});
