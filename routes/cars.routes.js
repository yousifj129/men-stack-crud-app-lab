const Car = require("../models/Car")
const router = require("express").Router()

router.get("/", (req, res) => {
    res.redirect("/cars")
})

router.get("/cars/new", (req, res) => {
    res.render("new.ejs");
})
router.get("/cars/delete", (req, res) => {
    res.render("delete.ejs");
})

router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find()
        res.render("allCars.ejs", { cars: cars });
    }
    catch (error) {
        console.log(error)
    }

})
router.post("/cars/new", async (req, res) => {
    try {
        await Car.create(req.body)
        res.redirect("/cars")
    } catch (error) {
        console.log(error)
    }

})
router.get("/cars/update/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        res.render("update.ejs", { car: car })
    } catch (error) {
        console.log(error)
    }
})
router.post("/cars/update/:id", async (req, res) => {
    try {
        await Car.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/cars")
    } catch (error) {
        console.log(error)
    }
})
router.get("/cars/:id", async (req, res) => {
    try {
        const id = req.params.id
        const car = await Car.findById(id)
        res.render("carDetails.ejs", { car: car })
    } catch (error) {
        console.log(error)
    }

})
router.get("/cars/delete/:id", async (req, res) => {
    try {
        const ids = req.params.id
        const car = await Car.findByIdAndDelete(ids)
        res.redirect("/cars")
    }
    catch (error) {
        console.log(error)
    }
})
router.post("/cars/delete", async (req, res) => {
    try {
        const ids = req.body._id
        const car = await Car.findByIdAndDelete(ids)
        res.redirect("/cars")
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router