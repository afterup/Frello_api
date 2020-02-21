import * as controller from './list.controller';
import auth from '../../middlewares/auth';
const router = require('express').Router();

// routes '/list'

router.post('/', auth.required, controller.createList);
router.put('/:id', auth.required, controller.updateList);
router.delete('/:id', auth.required, controller.deleteList);

module.exports = router;