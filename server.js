const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const path = require("path");

const routerUser = require("./Routes/User");
const routerProduct = require("./Routes/Product");
const routerLogin = require("./Routes/LoginRoute");
const routerPanier = require("./Routes/Panier");

const methodOverride = require("method-override");

const app = express();

const paymentRouter = require("./Routes/Payment");
app.use("/payment", paymentRouter);

const port = 3040;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(methodOverride("_method"));

const session = require("express-session");

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const connectionMongo = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://danick:dany1972@cluster0.gxvht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Connection Mongo : ${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

connectionMongo();

const Cart = require("./Models/panier");

app.post("/confirmation", async (req, res) => {
  const { firstName, lastName, address, total, tax, gtotal } = req.body;

  if (!firstName || !lastName || !address || !total) {
    return res.status(400).send("All fields are required.");
  }

  try {
    await Cart.deleteMany({ userId: req.session.userId });
    console.log("Panier vidé de la base de données.");

    res.render("PaymentConfirmation", {
      firstName,
      lastName,
      address,
      total,
      tax,
      gtotal,
    });
  } catch (err) {
    console.error("Erreur lors de la suppression du panier :", err);
    res.status(500).send("Erreur interne du serveur.");
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/Products", routerProduct);

app.use("/Users", routerUser);

app.use("/login", routerLogin);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/cart", routerPanier);

app.get("/test", (req, res) => {
  res.render("test", { message: "Hello, EJS!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
