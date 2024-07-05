const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// create app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// database
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.uhbaknf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect with database
const dbConnect = () => {
  try {
    client.connect();
  } catch (error) {
    console.log("Database connection error", error);
  }
};
dbConnect();

// database and collection create
const projectCollection = client.db("portfolio").collection("projects");
const skillCollection = client.db("portfolio").collection("skills");
const blogCollection = client.db("portfolio").collection("blogs");

// skills api
app.get("/skills", async (req, res) => {
  try {
    const query = {};
    const result = await incomeCollection
      .find(query)
      .sort({ time: -1 })
      .toArray();
    res.json({
      success: true,
      data: result,
      message: "Skills fetch Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
      message: error.message || "Something went wrong!",
    });
    console.error(error);
  }
});

app.post("/skill", async (req, res) => {
  try {
    const data = req.body;
    const result = await skillCollection.insertOne(data);
    res.json({
      success: true,
      data: result,
      message: "Skill created successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error,
      message: error.message || "Something wrong!",
    });
    console.log(error.message);
  }
});

// root api
app.use("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Portfolio server is running...",
    });
  } catch (error) {
    res.json(error);
    console.error(error);
  }
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
