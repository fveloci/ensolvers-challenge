const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth');
const { User } = require('../database/models')

module.exports = async (req, res, next) => {
    let result, token, userDecoded;

    if(!req.headers.authorization){
        result = {success: false, msg: 'Access not allowed without token'};
        return res.status(401).json(result);
    }
    token = req.headers.authorization.split(' ')[1];
    try {
        userDecoded = jwt.verify(token, authConfig.secret);
        const user = User.findByPk(userDecoded.user.id, {included: 'roles'});
        if(!user){
            result = { success: false, msg: 'User not found'}
            return res.status(404).json(result);
        }
        req.user = user;
        next();
    } catch (err) {
        result = {success: false, msg: err}
        return res.status(400).json(result);
    }
}

