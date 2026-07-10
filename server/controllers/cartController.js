const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        let cart = await Cart.findOne({
            user:userId
        });

        if (!cart) {
            cart = new Cart({
                user:userId,
                items:[],
                totalAmount:0
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({
                product:productId,
                quantity,
                price:product.price
            });
        }

        cart.totalAmount = cart.items.reduce(
            (total,item)=>
                total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(200).json({
            success:true,
            message:"Product added to cart",
            cart
        });
    }

    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

module.exports = {
    addToCart
};