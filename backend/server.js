require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./database/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

/* ✅ REGISTER USER */
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash],
    (err) => {
      if (err) return res.status(400).json({ error: "User exists" });
      res.json({ success: true });
    }
  );
});

/* ✅ LOGIN USER */
app.post("/", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (!user) return res.status(401).json({ error: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Wrong password" });

      res.json({ success: true });
    }
  );
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
