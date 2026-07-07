const Product = require("../models/Product");

const createProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            brand,
            stock,
            material,
            color,
            dimensions,
            discount,
            featured
        } = req.body;

        const product = await Product.create({

            name,
            description,
            price,
            category,
            brand,
            stock,
            images: [],
            material,
            color,
            dimensions,
            discount,
            featured

        });

        res.status(201).json({

            success: true,

            message: "Product created successfully",

            product

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    createProduct
};