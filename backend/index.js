const express = require("express");
const app=express();
const connectDatabase=require('./config/database');
const cors = require('cors');
const Contests=require('./routes/Contest_routes');
const Bookmarks=require('./routes/BookMark_routes');
const Youtubelinks=require('./routes/Youtubelinks_routes')
connectDatabase();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api/v1/contest",Contests);
app.use("/api/v1/bookmarks",Bookmarks);
app.use("/api/v1/youtube",Youtubelinks);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;