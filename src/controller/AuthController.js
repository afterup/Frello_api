// const {User} = require('../models')

module.exports = {
    register (req, res) {
        res.send({
            message: `${req.body.email} register`
        });
    }
};