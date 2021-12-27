const { User } = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { use } = require('../routes/authRouter');

const authController = {
    register: async(req, res) => {
        let result;        
        try {
            let password = req.body.password;
            if(password.length < 6 || password.length > 50){
               result = {success: false, msg: 'Password must be between 6 and 50 characters.'} 
               return res.send(400).json(result);
            } 
            let encryptedPassword = await bcrypt.hash(password, Number.parseInt(authConfig.salt));

            const user = await User.create({
                name: req.body.name,
                password: encryptedPassword,
                email: req.body.email
            })            
            result = {
                success: true,
                msg: 'User registered successfully',
                user: user
            }
            return res.status(201).json(result);
        } catch (err) {
            result = {success: false, msg: err}            
            return res.status(500).json(result);
        }
    },
    login: async (req, res) => {
        let result, token, passwordMatches;
        try {
            let {email, password} = req.body;
            const user = await User.findOne({where: {email: email}});
            if(!user){
                result = {sucess: false, msg: 'Email does not exist' }
                return res.status(400).json(result);
            } 
            passwordMatches = await bcrypt.compare(password, user.password);
            if(passwordMatches) {
                token = jwt.sign({user: user}, authConfig.secret, {
                    expiresIn: authConfig.expires
                })
                const resUser = {
                    name: user.name,
                    email: user.email
                }
                result = {success: true, token: token, user: resUser};
                return res.status(200).json(result);
            } else {
                result = {success: false, msg: 'Password is invalid'}
                return res.status(401).json(result);
            }          
        } catch (error) {
            result = {success: false, msg: err};
            return res.status(500).json(err);
        }
    }
}

module.exports = authController;