const {Schema,model} = require("mongoose")

const carSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    enginePower: {
        type: Number,
        default: 200
    },
    weight: {
        type: Number,
        default: 1000
    },
    dragCoeff: {
        type: Number,
        default: 0.3
    },
    year: {
        type: Number,
        default: 2000
    },
    engineType: {
        type: String,
        default: "V4"
    }

}, {
    timestamps: true
})

const Car = model("Car", carSchema)


module.exports = Car