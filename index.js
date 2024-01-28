import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
const API_Key = "08be1e375181449f87b21654182d85e9";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const Country = req.body.country;
  const Month = req.body.month;
  const Day = req.body.day;
  try {
    const response = await axios.get(
      `https://holidays.abstractapi.com/v1/?api_key=${API_Key}&country=${Country}&year=2021&month=${Month}&day=${Day}`
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      location: result[0].location,
      date: result[0].date,
      name: result[0].name,
      day: result[0].week_day
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
