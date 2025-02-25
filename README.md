# 📝 Task Management API

A RESTful API built with Express.js and MongoDB for managing tasks. Features user-specific task operations with JWT authentication and MongoDB data persistence.

Node.js
Express.js
MongoDB
License

## 🚀 Features
- ✅ **Add a Task** with title and category
- 📋 **Fetch Tasks** by user email
- ✏️ **Update Task** status
- 🗑️ **Delete a Task** by title

## 📌 Installation

1️⃣ **Clone the repository**  

git clone https://github.com/sndpbag/Task-Management-Client-Apps.git
2️⃣ Navigate to the project directory


cd your-repo
3️⃣ Install dependencies


npm install
4️⃣ Set up environment variables
Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000
5️⃣ Start the server


npm start
📡 API Endpoints
➕ Add a Task
 
POST /add-task
Request Body:


{
  "title": "Learn Express",
  "category": "Backend Development"
}
Response:


{
  "message": "Task added",
  "taskId": "65a4f9b2d7b6e5fcd72"
}
📋 Fetch Tasks by User Email

GET /tasks/:user_email
Response:


[
  {
    "title": "Learn Express",
    "category": "Backend Development"
  }
]
✏️ Update Task Status

PUT /updateTask
Request Body:

{
  "title": "Learn Express",
  "category": "Completed"
}

Response:

{
  "success": true,
  "message": "Task updated successfully!"
}
🗑️ Delete a Task
http
Copy
Edit
DELETE /deleteTask

Request Body:

{
  "title": "Learn Express"
}
Response:
{
  "success": true,
  "message": "Task deleted successfully!"
}


🛠️ Technologies Used
Node.js & Express.js - Backend Framework
MongoDB - NoSQL Database
Mongoose - ODM for MongoDB
Dotenv - Environment Variable Management
🏗️ Project Structure
 
📂 Task-Management-Client-Apps
│── 📁 node_modules
│── 📁 routes
│── 📁 models
│── 📄 server.js
│── 📄 .gitignore
│── 📄 package.json
│── 📄 README.md
│── 📄 .env


🏆 Contributing
Contributions are welcome! Feel free to submit a PR or open an issue.

📜 License
This project is licensed under the MIT License.

📬 Contact
For any questions, reach out to me at:
📧 your-email@example.com
🔗 **[GitHub Repository](https://github.com/sndpbag/Task-Management-Client-Apps.git)**


<!--  for vercel ignoure -->
await client.connect();

 

---

### 🔥 What Makes This README Professional?
✅ **Well-structured** with clear sections  
✅ **Proper formatting** with Markdown elements  
✅ **Code snippets** for easy API testing  
✅ **Icons & emojis** for better readability  
✅ **Installation & usage guide** for developers  

Would you like any customization, such as adding an API testing tool (e.g., Postman collection)? 🚀