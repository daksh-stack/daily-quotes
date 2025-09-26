const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const data = response.data[0]; // API returns an array
    res.json({
      content: data.q,
      author: data.a,
    });
  } catch (err) {
    console.error("❌ Backend error:", err.message);
    res.status(500).json({ error: "error fetching" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
