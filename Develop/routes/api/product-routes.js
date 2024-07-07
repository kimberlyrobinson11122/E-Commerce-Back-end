const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all available products
router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get a single product
router.get('/:id', async (req, res) => {
  try {
    const productSingleData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!productSingleData) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(productSingleData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json({ message: 'Product created successfully', newProduct });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// update product by id
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      // Update product tags
    }

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// delete this product by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedProduct === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;