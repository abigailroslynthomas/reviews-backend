require("dotenv").config();
const express = require("express");
const { connectDB, sequelize } = require("./config/database");
const { User, Item, Review } = require("./models"); // ✅ Import models

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());


app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});


app.get("/api/items", async (req, res) => {
  const items = await Item.findAll({ include: Review });
  res.json(items);
});

app.get("/api/items/:itemId", async (req, res) => {
  const item = await Item.findByPk(req.params.itemId, { include: Review });
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/api/items/:itemId/reviews", async (req, res) => {
  const { rating, reviewText, userid } = req.body;
  try {
    const review = await Review.create({
      itemid: req.params.itemId,
      userid,
      rating,
      reviewText,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/reviews/:reviewId", async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) return res.status(404).json({ error: "Review not found" });

  await review.destroy();
  res.json({ message: "Review deleted successfully" });
});


connectDB();
app.listen(5000, async () => {
  await sequelize.sync();
  console.log("🚀 Server running on http://localhost:5000");
});
