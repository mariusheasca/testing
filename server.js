const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 10000;

// Serve everything in "public"
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
