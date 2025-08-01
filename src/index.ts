import express from "express";
import dotenv from "dotenv";
import weatherRoute from "./routes/weather";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/weather", weatherRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
