const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = require("./models/models").userModel;
const roomModel = require("./models/models").roomModel;
const messageModel = require("./models/models").messageModel;

const JWTsecret =
  "d07cf581667a1d7a283cd908531206f0066cf0fe225747474eadc2afc47c9c12faad9ff822db5ce53efb7cc3b73dbb07d3b84d6467b5a53d35be98bbc53a8099";
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;
  const id = socket.id;

  console.log("Room : ", roomId, "Id : ", id);

  socket.join(roomId);

  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  socket.on("message", (msg) => {
    storeMessage(msg);
    io.to(roomId).emit("message", { message: msg, id: id });
  });
});

function storeMessage(value) {
  const { message, token } = value;
  if (message) {
    const newMessage = new messageModel({
      message: message,
      id: token,
    });
    newMessage.save();
  }
}

io.on("disconnection", (socket) => {
  console.log("Disconnect");
});

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb://localhost:27017/users",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully connected to Database");
    }
  }
);

app.get("/user-verify", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, JWTsecret, function (err, decode) {
      if (err) {
        console.log(err);
        res.send({ err: "Bad Token" });
      } else {
        res.send({ token, status: "ok", data: decode });
      }
    });
  } else {
    res.send({ redirect: "/authenticate?method=sign-up" });
  }
});

app.use("/sign-up", function (req, res, next) {
  const userId = crypto.randomBytes(10).toString("hex");
  req.userId = userId;
  const { first_name, last_name, username, email, phone } = req.body;
  if (first_name && last_name && username && email && phone) {
    const user = { first_name, last_name, username, email, phone, id: userId };
    const token = jwt.sign(user, JWTsecret);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    req.user = user;
    next();
  } else {
    res.send({ err: "Bad sign-up action." });
  }
});

app.post("/sign-up", function (req, res) {
  const socket_id = crypto.randomBytes(45).toString("hex");
  const { password } = req.body;
  const user = req.user;
  const userId = req.userId;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const newUser = new userModel({
        id: userId,
        data: user,
        password: hash,
        socket_id,
      });
      console.log(newUser);
      newUser.save((err) => console.log("Error : ", err));
    });
  });

  res.cookie("Logged_At", new Date().getTime(), {
    path: "/",
  });

  res.send({ user, socket_id });
});

app.use("/login", (req, res, next) => {
  const { email } = req.body;
  userModel.findOne({ "data.email": email }, function (err, data) {
    if (err) {
      res.send({ err: "Wrong login" });
    }
    req.token = makeCookie(res, JSON.stringify(data.data));
    next();
  });
});

function makeCookie(response, data) {
  const jwtToken = jwt.sign(JSON.parse(data), JWTsecret);
  response.cookie("token", jwtToken, {
    path: "/",
    httpOnly: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return { jwtToken };
}

app.post("/login", function (req, res) {
  const { token } = req;
  const { email, password } = req.body;

  userModel.findOne({ "data.email": email }, function (err, response) {
    if (err) return console.log(err);
    else if (response) {
      bcrypt.compare(password, response.password, (err, match) => {
        if (match) {
          console.log(response);
          res.send({ user: response.data, token: token });
        } else {
          console.log("Bad password or username");
          res.send({ err: "Bad password or username" });
        }
      });
    } else {
      console.log(`User with email : ${email} doesn't exists.`);
    }
  });
});

app.get("/log-out", (req, res) => {
  console.log("Cookie : ", req.cookies);
  res.clearCookie("token");
  res.send("logged-out");
});

app.get("/api", (req, res) => {
  res.send(JSON.stringify({ alert: "Hello world" }, null, 2));
});

// *END* -> Sign-up || Login || user-verify || render API <- *END* //

app.use("/create-room", function (req, res, next) {
  let routeName = crypto.randomBytes(10).toString("base64");
  routeName = routeName
    .split("")
    .map((value) => value.toUpperCase())
    .join("");
  routeName = routeName.slice(0, routeName.length - 2);
  req.routeName = routeName;

  next();
});

app.post("/create-room", function (req, res) {
  const { name, password, admin } = req.body;
  const code = crypto.randomBytes(25).toString("hex");
  const routeName = req.routeName;

  bcrypt.genSalt(15, function (err, salt) {
    bcrypt.hash(password, salt, (err, encryptedPassword) => {
      const newRoom = new roomModel({
        admin: admin,
        name: name,
        code: code,
        password: encryptedPassword,
        members: [],
      });

      newRoom.save();
    });
  });

  res.send({ code, routeName });
});

app.post("/join-room", function (req, res) {
  const { name, code, password, id, userName } = req.body;
  if (code) {
    roomModel.find({ code: code }, function (err, data) {
      if (err) return console.log(err);
      else {
        res.send(data[0]);
      }
    });
  } else {
    roomModel
      .findOneAndUpdate(
        { name: name },
        { $push: { members: { id: id, userName: userName } } }
      )
      .then((value) => {
        bcrypt.compare(password, value.password, (err, match) => {
          if (match) {
            res.send(value);
          }
        });
      });
  }
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("Server is listenong on PORT ", port);
});
