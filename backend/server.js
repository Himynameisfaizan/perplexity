import "dotenv/config";
import app from "./src/app.js";
import database from "./src/config/database.js";

database();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
