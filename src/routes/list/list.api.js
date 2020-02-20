const router = require('express').Router();
const auth = require('../../middlewares/auth');
import * as controller from './list.controller';

// routes '/list'

router.post('/', auth.required, controller.createList);
router.put('/:id', auth.required, controller.updateList);
router.delete('/:id', auth.required, controller.deleteList);

module.exports = router;