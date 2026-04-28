const router = require('express').Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authcontroller');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login',    login);
router.get('/profile',   protect, getProfile);
router.put('/profile',   protect, updateProfile);

module.exports = router;