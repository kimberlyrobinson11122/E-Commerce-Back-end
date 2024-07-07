const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');

// This Product belongsTo Category (multiple products but a product can only belong to one category)
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// This Category hasMany Products (Category has many Product Models)
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// This Product belongsToMany Tags through ProductTag (using ProductTag through model, allow products to havve multiple tags and tags to have manhy products)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// This Tag belongsToMany Products through ProductTag (Tab belongs to many Product models)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};