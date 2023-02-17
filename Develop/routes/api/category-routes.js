const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories (with associated Products)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: Product },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by ID (with associated Products)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      const updatedCategory = await category.update(req.body);
      res.json(updatedCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      await category.destroy();
      res.json({ message: 'Category deleted' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

