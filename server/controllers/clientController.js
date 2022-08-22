const {Client} = require("../models/models");
const ApiError = require("../error/ApiError");

class CompanyController {
    async create(req, res){

    }

    async getAll(req, res, next){
        const {id_company} = req.query;
        if (!id_company){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        const clients = await Client.findAll({where: {companyId: id_company}});

        return res.json(clients);
    }

    async getOne(req, res){

    }

}

module.exports = new CompanyController();