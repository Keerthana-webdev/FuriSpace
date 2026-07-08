const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");
const mongoose = require("mongoose");

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

const getProducts = async (req, res) => {

    try {
        const {
            keyword,
            category,
            minPrice,
            maxPrice,
            sort,
            page = 1
        } = req.query;

        let filter = {};

        if (keyword) {
            filter.name = {
                $regex: keyword,
                $options: "i"
            };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const limit = 10;

        const skip = (page - 1) * limit;

        let sortOption = {
            createdAt: -1
        };

        if (sort === "price") {
            sortOption = { price: 1 };
        }

        if (sort === "-price") {
            sortOption = { price: -1 };
        }

        if (sort === "rating") {
            sortOption = { rating: -1 };
        }

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

const getProductById = async (req, res) => {

    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProduct = async (req, res) => {

    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

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

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price ?? product.price;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.stock = stock ?? product.stock;
        product.material = material || product.material;
        product.color = color || product.color;
        product.dimensions = dimensions || product.dimensions;
        product.discount = discount ?? product.discount;
        product.featured = featured ?? product.featured;
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct
};