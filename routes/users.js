const router = require('express').Router();
const {
  getUserById,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateUserInfo
} = require('../middlewares/dataValidation');

router.get('/me', getUserById);
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
