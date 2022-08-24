const {Client} = require("../models/models");
const ApiError = require("../error/ApiError");
const {Op} = require("sequelize");

class CompanyController {
    async create(req, res, next){
        let {name, phone, email, series, numberPass, birthday} = req.body.client;
        let {id_company} = req.body;

        name = name.trim();
        phone = phone.trim();
        email = email.trim();
        series = series.trim();
        numberPass = numberPass.trim();
        birthday = birthday.trim();
        if (!name || name.length == 0){
            return next(ApiError.badRequest("First and last name not specified"));
        }
        if (!id_company || id_company <= 0){
            return next(ApiError.badRequest("Company not specified"));
        }
        if (!phone || phone.length == 0){
            phone = null;
        }
        if (!email || email.length == 0){
            email = null;
        }
        if (!series || series.length == 0){
            series = null;
        }
        if (!numberPass || numberPass.length == 0){
            numberPass = null;
        }
        if (!birthday || birthday.length == 0){
            birthday = null;
        }
        const add_client = await Client.create({name, phone, email, passport_series: series, passport_number: numberPass, birthday, companyId: id_company});

        return res.json({status: true, message:"Client added"});

    }

    async edit(req, res, next){

    }

    async getAll(req, res, next){
        const {id_company} = req.query;
        if (!id_company){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        const clients = await Client.findAll({where: {companyId: id_company}});

        return res.json(clients);
    }

    async getOne(req, res, next){
        console.log("1");
        const {id_company, id_client} = req.query;
        if (!id_company){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        if (!id_client || id_client <= 0){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        const client = await Client.findOne({where: {[Op.and]:[{id: id_client}, {companyId: id_company}]}});

        return res.json(client);
    }


}

module.exports = new CompanyController();