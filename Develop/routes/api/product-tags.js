const router = require('express').Router();
const { ProductTag, Product, Tag } = require('../../models');

// Get all product tags
router.get('/', async (req, res) => {
  try {
    const allProductTags = await ProductTag.findAll({
      include: [{ model: Product }, { model: Tag }],
    });
    res.status(200).json(allProductTags);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single product tag
router.get('/:id', async (req, res) => {
  try {
    const productTagSingleData = await ProductTag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: Tag }],
    });

    if (!productTagSingleData) {
      res.status(404).json({ message: 'Product Tag not found' });
      return;
    }

    res.status(200).json(productTagSingleData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product tag
router.post('/', async (req, res) => {
  try {
    const newProductTag = await ProductTag.create(req.body);
    res.status(200).json({ message: 'Product Tag created successfully', newProductTag });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Update product tag by id
router.put('/:id', async (req, res) => {
  try {
    const updatedProductTag = await ProductTag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedProductTag[0] > 0) {
      res.status(200).json({ message: 'Product Tag updated successfully' });
    } else {
      res.status(404).json({ message: 'Product Tag not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete a product tag by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProductTag = await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedProductTag > 0) {
      res.status(200).json({ message: 'Product Tag deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product Tag not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = router;