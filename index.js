var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});
app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) => {
  try {
    return res.json({
      name: req.file.filename,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } catch (e) {
    return res.json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
