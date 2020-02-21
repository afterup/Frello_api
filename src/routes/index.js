import user from './user/user.api';
import board from './board/board.api';
import list from './list/list.api';
import card from './card/card.api';

const router = require('express').Router();


router.use('/', user);
router.use('/board', board);
router.use('/list', list);
router.use('/card', card);

router.use(function(err, req, res, next) {
    if(err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key) {
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }
    return next(err);
});

module.exports = router;