// controllers/itemController.js
const Item = require('../models/itemModel');

const getItems = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort_by = 'price', sort_order = 'asc' } = req.query;
        
        page = parseInt(page);
        limit = parseInt(limit);
        const sortOptions = {};
        sortOptions[sort_by] = sort_order === 'asc' ? 1 : -1;

        const totalItems = await Item.countDocuments();
        const items = await Item.find().sort(sortOptions).skip((page - 1) * limit).limit(limit);

        res.json({
            page,
            limit,
            total_items: totalItems,
            total_pages: Math.ceil(totalItems / limit),
            data: items
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getItems };
