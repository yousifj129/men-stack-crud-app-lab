const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    enginePower:{
        type:Number,
        default: 200
    },
    weight:{
        type:Number,
        default:1000
    },
    dragCoeff:{
        type:Number,
        default:0.3
    }
    
}, {
    timestamps: true
})

const Car = mongoose.model("Car", carSchema)


module.exports = Car