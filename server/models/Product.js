const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true,
        min:0
    },

    category:{
        type:String,
        required:true,
        enum:[
            "Living Room",
            "Bedroom",
            "Dining Room",
            "Office",
            "Outdoor",
            "Storage",
            "Lighting",
            "Decor"
        ]
    },

    brand:{
        type:String,
        default:"FurniSpace"
    },

    stock:{
        type:Number,
        required:true,
        min:0
    },

    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],

    material:{
        type:String
    },

    color:{
        type:String
    },

    dimensions:{
        type:String
    },

    discount:{
        type:Number,
        default:0
    },

    rating:{
        type:Number,
        default:0
    },

    numReviews:{
        type:Number,
        default:0
    },

    featured:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Product", productSchema);