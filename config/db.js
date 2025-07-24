const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.CONNECTION)
        console.log("connected to db")
    } catch (error) {
        console.log("error occured", error)
    }
}
module.exports = connectToDB