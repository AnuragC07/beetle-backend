const express = require("express");
const mongoose = require("mongoose");
const port = 8000;
const app = express();
const cors = require("cors");
const blogsRoute = require("./routes/blogsRoute");
const userRoute = require("./routes/userRoute");


app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/', blogsRoute);
app.use('/', userRoute);
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
app.use(express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Hello from home");
});

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("Connected to Database");
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error("Connection Failed:", error);
    });
