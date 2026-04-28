const router = require('express').Router();
const ctrl = require('../controllers/productcontroller');
const upload = require('../middleware/upload');

router.get('/',         ctrl.getAllProducts);
router.get('/:id',      ctrl.getProduct);
router.post('/',        upload.array('images', 5), ctrl.createProduct);
router.put('/:id',      upload.array('images', 5), ctrl.updateProduct);
router.delete('/:id',   ctrl.deleteProduct);

module.exports = router;