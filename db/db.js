const mongoose = require("mongoose")
require('dotenv').config()

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Server connect to database...");
}).catch((error) => {
    console.log(`Database connect error --->  ${error}`);
})




