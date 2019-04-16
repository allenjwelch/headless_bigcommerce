const router = require("express").Router();

// Require routes from within api directory
const userRoutes = require("./users");
const productRoutes = require('./products');
const brandsRoutes = require('./brands');
const categoryRoutes = require('./categories');
const cartRoutes = require('./cart');

// Routes -- Appends api path to .../eyAPI/... (add additional route paths below)
router.use("/users", userRoutes);
router.use('/products', productRoutes);
router.use('/brands', brandsRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
