let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/register", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.file.path,
    });
    await User.insertMany([newUser]);
    res.json({ status: "Success", msg: "Account created successfully" });
  } catch (error) {
    res.json({
      status: "Failure",
      msg: "Unable to create account",
      error: error,
    });
  }
});

app.listen(4444, () => {
  console.log("Listening to port 4444");
});

let connectToMdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jeevanrdy:jeevanrdy@skynet.ycaxxus.mongodb.net/PostTest?retryWrites=true&w=majority&appName=SkyNet"
    );
    console.log("Connected to MDB");
  } catch (error) {
    console.log("Unable to connect to MDB");
  }
};

connectToMdb();
