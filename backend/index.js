require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({
  origin: [
    'https://personal-portfolio-six-xi-91.vercel.app',
    'https://personal-portfolio-dulu.onrender.com',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000'
  ]
}));
app.use(express.json());

// 🔥 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Route
app.post("/contact", async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });

    await newContact.save();

    console.log("✅ Data saved in MongoDB");

    res.json({ message: "Message sent successfully!" });

  } catch (error) {
    console.log("❌ Save Error:", error);
    res.status(500).json({ message: "Error saving data" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
