const router = require('express').Router();

const user = require('./user/user.api');
const board = require('./board/board.api');
const list = require('./list/list.api');
const card = require('./card/card.api');


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