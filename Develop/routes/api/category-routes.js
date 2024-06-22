const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categoriesData = await Category.findAll({
      include: [{ model: Product, through: 'Category', as: 'categories_products' }]
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

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its ID and include associated Products
    const categoryOneItem = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: 'Category', as: 'categories_products' }]
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);

    if (newCategory) {
      res.status(200).json(newCategory);
    } else {
      res.status(404).json({ error: 'Category not created' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its ID
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
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

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its ID
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
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
