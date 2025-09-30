const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Category = require('../schemas/category');

// ✅ Create category
router.post('/', async (req, res) => {
    try {
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description
        });

        const savedCategory = await category.save();
        res.status(201).json({
            message: "Category created successfully",
            data: savedCategory
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().select('_id name description createdAt');
        res.status(200).json({ count: categories.length, categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).select('_id name description createdAt');
        if (category) {
            res.status(200).json({ data: category });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Update category
router.patch('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, description: req.body.description },
            { new: true }
        );

        if (updatedCategory) {
            res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Delete category
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (deletedCategory) {
            res.status(200).json({ message: "Category deleted successfully" });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
