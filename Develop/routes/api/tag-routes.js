const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single tag
router.get('/:id', async (req, res) => {
  try {
    const tagSingleData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagSingleData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tagSingleData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    if (req.body.productIds && req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map((product_id) => {
        return {
          product_id,
          tag_id: newTag.id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json({ message: 'Tag created successfully', newTag });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Update tag by id
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedTag[0] > 0) {
      res.status(200).json({ message: 'Tag updated successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedTag > 0) {
      res.status(200).json({ message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

module.exports = router;