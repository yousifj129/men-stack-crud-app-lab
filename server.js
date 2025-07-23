// imports
const mongoose = require("mongoose")
const express = require("express") //importing express package
const dotenv = require("dotenv").config() // allows me to use .env values
const app = express() // creates a express application
const Car = require("./models/Car")


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





app.get("/cars/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/cars", async (req, res) => {
    const cars = await Car.find()
    console.log(cars)
    res.render("allCars.ejs", {cars:cars});
})
app.post("/cars/new", (req, res) => {
    Car.create(req.body)
    res.redirect("/cars")
})
app.get("/cars/:id", async (req,res)=>{
    const id = req.params.id
    const car = await Car.findById(id)
    console.log(car)
    res.render("carDetails.ejs", {car:car})
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
}) // Listen on port 3000