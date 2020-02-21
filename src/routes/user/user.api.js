import auth from '../../middlewares/auth';
import * as controller from './user.controller';
const router = require('express').Router();

// routes '/user'

router.post('/user/login', controller.loginUser);
router.get('/user', auth.required, controller.fetchUser);
router.post('/user', controller.createUser);
router.put('/user', auth.required, controller.updateUser);
router.delete('/user', auth.required, controller.deleteUser);

module.exports = router;