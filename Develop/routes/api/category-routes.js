const router = require('express').Router();
const { Category, Product } = require('../../models');

// Middleware function to log request method and URL
const logRequest = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next(); // Pass control to the next middleware or route handler
};

// GET all categories
router.get('/', logRequest, async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categoriesData = await Category.findAll({
      include: [{ model: Product }]
    });

    if (categoriesData) {
      res.status(200).json(categoriesData);
    } else {
      res.status(404).json({ error: 'No categories found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single category by ID
router.get('/:id', logRequest, async (req, res) => {
  try {
    // Find one category by its ID and include associated Products
    const categoryOneItem = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (categoryOneItem) {
      res.status(200).json(categoryOneItem);
    } else {
      res.status(404).json({ error: 'Category ID not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new category
router.post('/', logRequest, async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a category by ID
router.put('/:id', logRequest, async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if (updateCategory[0] === 1) {
      res.status(200).json({ message: 'Category updated successfully!' });
    } else {
      res.status(404).json({ error: 'Category ID not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a category by ID
router.delete('/:id', logRequest, async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    });

    if (deleteCategory === 0) {
      res.status(404).json({ error: 'Category ID not found or already deleted' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;