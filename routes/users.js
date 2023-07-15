const router = require('express').Router();
const {
<<<<<<< Updated upstream
  getCurrentUser,
  updateDetails,
} = require('../controllers/users');

const {
  validateUserInfo
} = require('../middlewares/dataValidation');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserInfo, updateDetails);

module.exports = router;
=======
  getUserById,
  updateUserInfo
} = require('../controllers/user');

const { validateChangeUser } = require('../middlewares/validation');

router.get('/me', getUserById);
router.patch('/me', validateChangeUser, updateUserInfo);

module.exports = router;
>>>>>>> Stashed changes
