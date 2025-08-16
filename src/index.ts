import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import routers from "./router";
const app = express();
app.use(cors({ origin: ["https://client-a4c.vercel.app", "https://client-a4c.vercel.app"] }));
app.use(cors());
app.use(express.json());

app.use(routers);

app.get("/", (req, res) => {
   res.send({
      success: true,
      message: "Welcome to the server",
   });
});

app.listen(config.port, () => {
   console.log("✅Server is running on port 5000");
});

async function server() {
   try {
      await mongoose.connect(config.database_url!);
      console.log(`☑️CONNECT TO DATABASE${config.port}`);
   } catch (error) {
      console.error(`❌error server${server} `);
      process.exit(1);
   }
}
server();
