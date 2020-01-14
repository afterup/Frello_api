const router = require('express').Router();
const user = require('./user');
const board = require('./board');
const list = require('./list');
const card = require('./card');
const favorite = require('./favorite');

router.use('/', user);
router.use('/board', board);
router.use('/list', list);
router.use('/card', card);
router.use('/favorite', favorite);

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