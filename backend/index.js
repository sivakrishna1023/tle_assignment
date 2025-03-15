const express = require("express");
const app=express();
const connectDatabase=require('./config/database');
const cors = require('cors');
const Contests=require('./routes/Contest_routes');
const Bookmarks=require('./routes/BookMark_routes')
connectDatabase();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api/v1",Contests);
app.use("/api/v1",Bookmarks);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;