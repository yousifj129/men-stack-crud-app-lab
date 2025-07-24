// imports
const express = require("express") //importing express package
const dotenv = require("dotenv").config() // allows me to use .env values
const app = express() // creates a express application
const methodOverride = require("method-override");
const morgan = require("morgan")
const connectToDb = require("./config/db")
const carRoutes = require("./routes/cars.routes")
connectToDb()

app.use(methodOverride("_method"));
app.use(morgan("dev"))

// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false }));

app.use("/", carRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
}) // Listen on port 3000