const router = require('express').Router();
const auth = require('../../middlewares/auth');
import * as controller from './card.controller';

// routes '/card' 

router.post('/', auth.required, controller.createCard);
router.get('/:id', controller.fetchCard);
router.put('/:id', auth.required, controller.updateCard);
router.delete('/:id', auth.required, controller.deleteCard);

module.exports = router;