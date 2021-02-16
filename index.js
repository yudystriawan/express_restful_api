const express = require("express");
const app = express();

require("./services/logging")();
require("./routes/index")(app);
require("./datasources/remote-datasource")();
require("./services/config")();
require("./services/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}...`));
