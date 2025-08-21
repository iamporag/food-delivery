const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");



// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Food Delivery API</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          background: #282c34;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-family: sans-serif;
        }
        .emoji {
          position: absolute;
          top: -50px;
          font-size: 2rem;
          animation-name: fall;
          animation-timing-function: linear;
        }
        @keyframes fall {
          0% { transform: translateY(-50px); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        h1 {
          position: relative;
          z-index: 1000;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1>🍔 Food Delivery API is running 🚀</h1>
      
      <script>
        const emojis = ["🍔","🍕","🍟","🌭","🍩","🥤"];
        const total = 30; // number of emojis
        for(let i=0; i<total; i++){
          const span = document.createElement("span");
          span.className = "emoji";
          span.innerText = emojis[Math.floor(Math.random()*emojis.length)];
          span.style.left = Math.random() * window.innerWidth + "px";
          span.style.animationDuration = (3 + Math.random()*5) + "s";
          span.style.fontSize = (20 + Math.random()*30) + "px";
          document.body.appendChild(span);
        }

        // Redirect after 10 seconds
        setTimeout(() => {
          window.location.href = "https://youtube.com/iamporag";
        }, 10000);
      </script>
    </body>
    </html>
  `);
});



// API routes
app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/foods", foodRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/foods", foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
