const mongoose = require("mongoose");

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery");
  if (isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }

  isConnected = db.connections[0].readyState;
};
