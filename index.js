const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config()
 

const port = process.env.PORT || 5000;

// Use middleware
app.use(cors(
  {
    origin: "https://singup-18412.web.app", // Allow only your frontend
    credentials: true // Allow cookies, if needed
  }
));
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
    // await client.connect();
    console.log("Connected to MongoDB!");

    // Set the collection after connecting to MongoDB
    const database = client.db("taskUser");
    const userCollection = database.collection("users");
    const taskCollection = database.collection("task");


    //  add user when google login at first time
app.post("/add-user",async(req,res)=>{
  const data = req.body;
  console.log(data);
  if(!data.email){
    return res.status(400).send({ message: "Email is required" });
  }

  //  chack user already exist 

  const userExist = await userCollection.findOne({email:data.email});
  if(userExist)
  {
    return res.send({ message: "Welcome Back again" });
  }

  const result = await userCollection.insertOne(data);
 if(result.insertedId)
 {
  res.status(201).send({ message: "Your Accoun is Creating..", userId: result.insertedId });
 }
  
})







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



      //   Updated API route to modify task status by title
      app.put("/updateTask", async (req, res) => {

        const { category, title } = req.body;
        const cleanedTitle = title.replace(/^task-/, "").replace(/-\d+$/, "");
        console.log(cleanedTitle, category)
  
        try {
          const result = await taskCollection.updateOne(
            { title: cleanedTitle }, // Convert id to ObjectId
            { $set: { category } } // Update category field
          );
  
  
          if (result.modifiedCount > 0) {
            res.json({ success: true, message: "Task updated successfully!" });
          } else {
            res.status(400).json({ success: false, message: "No changes made." });
          }
        } catch (error) {
          res.status(500).json({ success: false, message: "Server error." });
        }
      });



          //  Added API route to delete a task by title
    app.delete("/deleteTask", async (req, res) => {
      try {
        const { id}  = req.body;

       if (!id) {
          return res.status(400).json({ message: "ID is required" });
        }

        const result = await taskCollection.deleteOne({ _id:new ObjectId(id) });

        console.log("Delete Result:", result);

        if (result.deletedCount > 0) {
          res.json({ success: true, message: "Task deleted successfully!" });
        } else {
          res.status(404).json({ success: false, message: "Task not found" });
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    })


    //  fetch single data for update task record
    app.post('/task/single/fetch',async(req,res)=>{
  try {
    
    const  {id} = req.body;

    if(!id)
    {
      return res.status(400).send({ message: "Title is required" });
    }


     const result = await taskCollection.findOne({_id:new ObjectId(id)});
     if(!result)
     {
      return res.status(404).json({ error: "Task not found" });
     }
     
     return res.status(200).json(result);
     
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
    })


    // update task record

    app.put('/update/task',async(req,res)=>{
   try {
    const { id, title, category, description,endDateTime } = req.body; // Destructure only required fields
    const queary = {_id:new ObjectId(id)}; //// Find task by id

   
    const updateDocument = {
      $set: {
           title :title,
           category : category,
           description : description,
           endDateTime:endDateTime,
   
      },
   };


    const result = await taskCollection.updateOne(queary,updateDocument);
   if(result.modifiedCount > 0)
   {
    return res.json({success: true, 'message':'Update successfully Tasks'})
   }
   else{
   return res.json({ success: false, message: "Update Not successfully!" });
   }
    
   } catch (error) {
  return  res.status(500).json({ success: false, message: "Internal Server Error",error:error});

   }
    })

  


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
