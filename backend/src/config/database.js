import mongoose from "mongoose";

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database is connected");
    })
    .catch(() => {
      console.log("something went wrong in database");
    });
}

export default connectToDb;
