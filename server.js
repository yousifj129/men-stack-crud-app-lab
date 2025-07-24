// imports
const mongoose = require("mongoose")
const express = require("express") //importing express package
const dotenv = require("dotenv").config() // allows me to use .env values
const app = express() // creates a express application
const Car = require("./models/Car")
const methodOverride = require("method-override");
const morgan = require("morgan")
const carRoutes = require("./routes/cars.routes")

app.use(methodOverride("_method"));
app.use(morgan("dev"))

async function connectToDB() {
    try {
        await mongoose.connect(process.env.CONNECTION)
        console.log("connected to db")
    } catch (error) {
        console.log("error occured", error)
    }
}
connectToDB()
// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false }));

app.use("/", carRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}) // Listen on port 3000