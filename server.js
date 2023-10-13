
const express = require("express");
const app = express();
const cors = require('cors');

require('dotenv').config()
const db = require("./db/db")





const auth = require("./middleware/authMiddleware")
const authRouter = require("./router/authRouter");
const bankRouter = require("./router/bankRouter")
const botRouter = require("./router/botRouter")





app.use(express.json());
app.use(cors());



app.use("/", authRouter);
app.use("/bot", botRouter);
app.use("/bank",auth, bankRouter);















app.get("/", async (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Server is running...!',
    })
})

app.use((req, res) => {
    res.status(404).json({
        status: false,
        data: null,
        message: 'Not found Page :)',
    })
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} port`);
})