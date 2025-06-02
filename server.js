const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Optional: fallback route
app.get('*', (req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
