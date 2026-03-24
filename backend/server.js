import "dotenv/config";
import app from "./src/app.js";
import readline from 'readline';
import database from "./src/config/database.js";
database();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is your name? ", (name)=>{
  console.log(`Hello ${name}`);
})