const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 5000;

// Use middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.send("My first Node application for backend");
});


// MongoDB URI and client setup
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.h1hso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Access the 'userDB' database and 'users' collection
let collection;

// Connect to MongoDB once at the start of the app and keep the connection open
async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    // Set the collection after connecting to MongoDB
    const database = client.db("taskUser");
    const userCollection = database.collection("users");
    const taskCollection = database.collection("task");



      // ✅ API Route to Add Task
      app.post("/add-task", async (req, res) => {
        try {
          const task = req.body;
          if (!task.title || !task.category) {
            return res.status(400).send({ message: "Title and Category are required" });
          }
  
          const result = await taskCollection.insertOne(task);
          res.status(201).send({ message: "Task added", taskId: result.insertedId });
        } catch (error) {
          res.status(500).send({ error: "Failed to add task" });
        }
      });


      
      
    //    Added API route to fetch tasks by user email
    app.get("/tasks/:user_email", async (req, res) => {
      try {
        const user_email = req.params.user_email;

        const tasks = await taskCollection.find({ user_email: user_email }).toArray();
        res.send(tasks);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch tasks" });
      }
    });


  


  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);  // Exit the process if the connection fails
  }
}

// Call the connect function at the beginning of the app to establish the DB connection
connectToDB();

// delete user record






// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
