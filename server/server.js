import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
const app = express();

const PORT = 5000;
app.use(cors());

// Handle requests for news data
app.get("/", async (req, res) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.log(`Failed to fetch data: ${response.statusText}`);
  }
  const parsedData = await response.json();
  //console.log(parsedData);
  res.json(parsedData);
});

// Handle requests for manifest.json
app.get("/manifest.json", (req, res) => {
  // Customize the content of your manifest.json file
  const manifest = {
    name: "Your App Name",
    short_name: "Short Name",
    // Add other manifest properties as needed
  };
  res.json(manifest);
});

app.listen(PORT, () => {
  // console.log(`App is listening at http://${serverIp}:${PORT}`);
  console.log(`App is listening at http://localhost:${PORT}`);
});
