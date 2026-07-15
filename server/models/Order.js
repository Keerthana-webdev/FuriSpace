const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },

    name:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    quantity:{
        type:Number,
        required:true,
        min:1
    }

});

const shippingAddressSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    state:{
        type:String,
        required:true
    },

    postalCode:{
        type:String,
        required:true
    },

    country:{
        type:String,
        required:true
    }

},{ _id:false });

const orderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    orderItems:[orderItemSchema],

    shippingAddress:{
        type:shippingAddressSchema,
        required:true
    },

    paymentMethod:{
        type:String,
        enum:["COD","RAZORPAY","STRIPE"],
        default:"COD"
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed"],
        default:"Pending"
    },

    orderStatus:{
        type:String,
        enum:[
            "Processing",
            "Confirmed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default:"Processing"
    },

    totalAmount:{
        type:Number,
        required:true
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Order",orderSchema);