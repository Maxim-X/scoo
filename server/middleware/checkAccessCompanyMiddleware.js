const jwt = require("jsonwebtoken");
const {RoleAccess} = require("../models/models");
const {Op} = require("sequelize");

module.exports = async function (req, res, next){
    if (req.method === "OPTIONS"){
        next();
    }
    try {
        const {id_company} = req.query;
        console.log(id_company);

        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return res.status(401).json({message: "Not authorized"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const {roleId} = decoded;

        const access = await RoleAccess.count({where: {[Op.and]:[{id: roleId}, {companyId: id_company}]}});

        if (access == 0){
            return res.status(401).json({message: "Access denied"});
        }

        next();
    } catch(e){
        res.status(401).json({message: "Not authorized"});
    }
}