// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsToMany(Category, {
  foreignKey: 'product_id',
  through: ProductTag,
  as: 'category',
  onDelete: 'cascade',
  constraints: false,
});

Product.belongsTo(Category, {
  foreignKey: 'category_id', 
  onDelete: 'cascade',
  constraints: false,
});


// Product belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'cascade',
  constraints: false,
});

// Category hasMany Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'cascade',
  constraints: false,
});

// Product belongsToMany Tags through ProductTag
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'cascade',
  constraints: false,
});

// Tag belongsToMany Products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'cascade',
  constraints: false,
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};


