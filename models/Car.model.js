const { Schema, model, default: mongoose } = require("mongoose");

const carSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true,
            enum: ["Toyota", "Ford", "Seat", "Suzuki", "Renault", "Tesla", "Mercedes", "Ferrari", "Volkswagen", "Nissan", "Bmw", "Audi", "Skoda"]
        },
        category: {
            type: String,
            required: true,
            enum: ["Suv", "Cabrio", "4x4", "Coupe", "Berlina", "Pick-Up"]
        },
        year: {
            type: Number,
            required: true
        },
        cv: {
            type: Number,
            required: true
        },
        km: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        isFavorite: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        },
        userCar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)






const Car = model("Car", carSchema);

module.exports = Car;