const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

const createProduct = async (req, res) => {
    try {

        console.log("Body:", req.body);
        console.log("Files:", req.files);

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
        } = req.body || {};

        let images = [];

        if (req.files && req.files.length > 0) {

            for (const file of req.files) {

                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "furnispace/products"
                });

                images.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });

                await fs.remove(file.path);
            }
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            stock,
            images,
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

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createProduct
};