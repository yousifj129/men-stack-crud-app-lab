// imports
const mongoose = require("mongoose")
const express = require("express") //importing express package
const dotenv = require("dotenv").config() // allows me to use .env values
const app = express() // creates a express application
const Car = require("./models/Car")
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

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




app.get("/", (req, res) => {
    res.redirect("/cars")
})

app.get("/cars/new", (req, res) => {
    res.render("new.ejs");
})
app.get("/cars/delete", (req, res) => {
    res.render("delete.ejs");
})

app.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find()
        res.render("allCars.ejs", { cars: cars });
    }
    catch (error) {
        console.log(error)
    }

})
app.post("/cars/new", async (req, res) => {
    try {
        await Car.create(req.body)
        res.redirect("/cars")
    } catch (error) {
        console.log(error)
    }

})
app.get("/cars/update/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        res.render("update.ejs", { car: car })
    } catch (error) {
        console.log(error)
    }
})
app.post("/cars/update/:id", async (req, res) => {
    try {
        await Car.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/cars")
    } catch (error) {
        console.log(error)
    }
})
app.get("/cars/:id", async (req, res) => {
    try {
        const id = req.params.id
        const car = await Car.findById(id)
        res.render("carDetails.ejs", { car: car })
    } catch (error) {
        console.log(error)
    }

})
app.get("/cars/delete/:id", async (req, res) => {
    try {
        const ids = req.params.id
        const car = await Car.findByIdAndDelete(ids)
        res.redirect("/cars")
    }
    catch (error) {
        console.log(error)
    }
})
app.post("/cars/delete", async (req, res) => {
    try {
        const ids = req.body._id
        const car = await Car.findByIdAndDelete(ids)
        res.redirect("/cars")
    }
    catch (error) {
        console.log(error)
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
}) // Listen on port 3000