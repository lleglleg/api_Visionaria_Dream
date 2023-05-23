let express = require("express"),
    router = express.Router();

const products = require('../Queris/PRODUCTS');

//=======================//=======================/SIPMENT_ORDER_LINES/=======================//=======================

router.get('/productos', products.getProduct);

router.get('/all_productos', products.getAllProduct);

router.post('/order' , products.newProduct);

router.put('/SIPMENT_ORDER_LINES/:id' , products.updateProduct);

router.delete('/SIPMENT_ORDER_LINES/:id' , products.removeProduct);

router.delete('/ACTIVE_SIPMENT_ORDER_LINES/:id' , products.removeProduct);


module.exports = router;