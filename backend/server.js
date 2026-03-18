import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import database from "./src/config/database.js";

database();

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
