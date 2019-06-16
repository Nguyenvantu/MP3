const express = require("express");
const path = require("path");
const compression = require("compression");
const app = express();

app.disable("x-powered-by");
app.use(compression());
app.use(express.static(path.join(__dirname, "../build")));
const buildPath = path.join(__dirname, "../build", "index.html");

app.get("/*", function(req, res) {
  res.sendFile(buildPath);
});

const PORT = process.env.PORT || 3999;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
