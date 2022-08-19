const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');

const generateJwt = (id, name, email) => {
    return jwt.sign({id, name, email}, process.env.SECRET_KEY, {expiresIn:'24h'});
}

class UserController {
    async reg(req, res, next){
        const {name, email, password} = req.body;
        if (!name || !email || !password){
            return next(ApiError.badRequest("Incorrect data entered"+req.body));
        }
        const candidate = await User.findOne({where: {email}});
        if (candidate){
            return next(ApiError.badRequest("User with this email already exists"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({name, email, password: hashPassword});
        const token = generateJwt(user.id, name, email);
        return res.json({token});

    }

    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user){
            return next(ApiError.internal('User is not found'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.internal('Incorrect password specified'));
        }
        const token = generateJwt(user.id, user.name, user.email);
        return res.json({token});
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.name, req.user.email);
        return res.json({token});
    }
}

module.exports = new UserController();