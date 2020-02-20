import express from 'express';
const router = express.Router();
import auth from '../../middlewares/auth';
import * as controller from './board.controller';

// routes '/board'

router.post('/', auth.required, controller.createBoard);
router.get('/', auth.required, controller.fetchAllBoard);
router.get('/:id', controller.fetchOneBoard);
router.put('/:id', auth.required, controller.updateBoard);
router.delete('/:id', auth.required, controller.deleteBoard );
router.put('/:id/favorite', auth.required, controller.updateFavoriteBoard);

module.exports = router;
