const ApiError = require('../error/ApiError');
const {Stock, Client, PhoneNumbers, ClientsEmail, RentalPoints, RentalCategories, RentalStatuses, ImagesClient,
    ImagesStock
} = require("../models/models");
const {Op} = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const {promises: fs} = require("fs");

class StockController{
    async create(req, res, next){
        let {name, vendor_code, inventory_number, rentalPointId, rentalCategoryId, rentalStatusId} = req.body.client;
        let {id_company} = req.body;

        name = name.trim();
        vendor_code = vendor_code.trim();
        inventory_number = inventory_number.trim();
        rentalPointId = rentalPointId.trim();
        rentalCategoryId = rentalCategoryId.trim();
        rentalStatusId = rentalStatusId.trim();
        if (!name || name.length == 0){
            return next(ApiError.badRequest("Name not specified"));
        }
        const check_user = await Stock.findOne({where:{name}})
        if (check_user){
            return next(ApiError.badRequest("Inventory already added"));
        }
        if (!id_company || id_company <= 0){
            return next(ApiError.badRequest("Company not specified"));
        }
        if (!vendor_code || vendor_code.length == 0){
            return next(ApiError.badRequest("Vendor code not specified"));
        }
        if (!inventory_number || inventory_number.length == 0){
            return next(ApiError.badRequest("Inventory number not specified"));
        }
        if (!rentalPointId || rentalPointId <= 0){
            return next(ApiError.badRequest("Rental point not specified"));
        }
        const checkRentalPointId = RentalPoints.findOne({where:{[Op.and]:[{companyId: id_company}, {id: rentalPointId}]}})
        if (checkRentalPointId){
            return next(ApiError.badRequest("Rental point not specified"));
        }

        if (!rentalCategoryId || rentalCategoryId <= 0){
            return next(ApiError.badRequest("Rental category not specified"));
        }
        const checkRentalCategoryId = RentalCategories.findOne({where:{[Op.and]:[{companyId: id_company}, {id: rentalCategoryId}]}})
        if (checkRentalCategoryId){
            return next(ApiError.badRequest("Rental category not specified"));
        }

        if (!rentalStatusId || rentalStatusId <= 0){
            return next(ApiError.badRequest("Rental category not specified"));
        }
        const checkRentalStatusId = RentalStatuses.findOne({where:{companyId: id_company}});
        if (checkRentalStatusId){
            return next(ApiError.badRequest("Rental statuses not specified"));
        }

        const add_inventory = await Stock.create(
            {
                name,
                vendor_code,
                inventory_number,
                companyId: id_company,
                rentalPointId,
                rentalCategoryId,
                rentalStatusId
            });

        return res.json({status: true, message:"Client added", inventory_id: add_inventory.id});
    }

    async edit(req, res, next){
        let {id, name, vendor_code, inventory_number, rentalPointId, rentalCategoryId, rentalStatusId} = req.body.inventory;
        let {id_company, id_inventory} = req.body;

        if(id != null) id = id.trim();
        if(name != null) name = name.trim();
        if(vendor_code != null) vendor_code = vendor_code.trim();
        if(inventory_number != null) inventory_number = inventory_number.trim();
        if (!name || name.length == 0){
            return next(ApiError.badRequest("Name not specified"));
        }
        const stock = await Stock.findOne({where:{[Op.and]:[{id: id_inventory},{companyId: id_company}]}})
        if (!stock){
            return next(ApiError.badRequest("Inventory already added"));
        }
        if (!id_company || id_company <= 0){
            return next(ApiError.badRequest("Company not specified"));
        }
        if (!vendor_code || vendor_code.length == 0){
            return next(ApiError.badRequest("Vendor code not specified"));
        }
        if (!inventory_number || inventory_number.length == 0){
            return next(ApiError.badRequest("Inventory number not specified"));
        }
        if (!rentalPointId || rentalPointId <= 0){
            return next(ApiError.badRequest("Rental point not specified"));
        }
        const checkRentalPointId = RentalPoints.findOne({where:{[Op.and]:[{companyId: id_company}, {id: rentalPointId}]}})
        if (!checkRentalPointId){
            return next(ApiError.badRequest("Rental point not specified"));
        }

        if (!rentalCategoryId || rentalCategoryId <= 0){
            return next(ApiError.badRequest("Rental category not specified"));
        }
        const checkRentalCategoryId = RentalCategories.findOne({where:{id: rentalCategoryId}});
        if (!checkRentalCategoryId){
            return next(ApiError.badRequest("Rental category not specified"));
        }

        if (!rentalStatusId || rentalStatusId <= 0){
            return next(ApiError.badRequest("Rental category not specified"));
        }
        const checkRentalStatusId = RentalStatuses.findOne({});
        if (!checkRentalStatusId){
            return next(ApiError.badRequest("Rental statuses not specified"));
        }
        console.log(inventory_number)
        console.log(id_company)
        console.log(rentalPointId)
        console.log(rentalCategoryId)
        console.log(rentalStatusId)

        stock.set({
            name,
            vendor_code,
            inventory_number,
            companyId: id_company,
            rentalPointId,
            rentalCategoryId,
            rentalStatusId
        });

        const save = await stock.save();
        return res.json({status: true, message:"Stock edit"});
    }
    async getAll(req, res, next){
        const {id_company} = req.query;
        if (!id_company){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        const stock = await Stock.findAll({where: {companyId: id_company}});
        return res.json(stock);
    }

    async getOne(req, res, next){
        console.log("111");
        const {id_company, id_inventory} = req.query;
        console.log(id_company);
        console.log(id_inventory);
        if (!id_company){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        const inventory = await Stock.findOne({where: {[Op.and]:[{id: id_inventory}, {companyId: id_company}]}});

        return res.json(inventory);
    }


    async uploadImages(req, res, next){
        try {
            const {id_stock} = req.body;
            const {images} = req.files;
            const expanse = images.name.split('.').pop();
            if (['png', 'jpg', 'jpeg'].indexOf(expanse) < 0){
                return next(ApiError.badRequest("Photo extension is not supported"));
            }
            let fileName = uuid.v4() + "."+expanse
            images.mv(path.resolve(__dirname, '..', 'static', 'images', fileName));
            const add_images = ImagesStock.create({path: fileName, stockId: id_stock});
            return res.json(add_images);
        }catch (e){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
    }

    async deleteImages(req, res, next){
        const {id_company, images_name} = req.body;
        if (!images_name){
            return next(ApiError.badRequest("Incorrect data entered1"));
        }
        let checkImage = await ImagesStock.findOne({where:{path: images_name}});
        if (!checkImage){
            return next(ApiError.badRequest("Incorrect data entered2"));
        }
        let checkStock = await Stock.findOne({where:{[Op.and]:[{id: checkImage.stockId}, {companyId:id_company}]}});
        if (!checkStock){
            return next(ApiError.badRequest("Incorrect data entered3"));
        }

        let file = path.resolve(__dirname, '..', 'static', 'images', images_name);
        await fs.unlink(file);
        const del_images = await ImagesStock.destroy({where:{id: checkImage.id}});
        return res.json(del_images);
        // return res.json("dd");
    }

    async getAllImages(req, res, next){
        const {id_stock} = req.query;
        if (!id_stock){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        const all_images= await ImagesStock.findAll({where: {stockId: id_stock}});

        return res.json(all_images);
    }

    async getRentalPoints(req, res, next){
        const {id_company} = req.query;
        if (!id_company){
            return next(ApiError.badRequest("Incorrect data entered"));
        }
        const all_rental_points = await RentalPoints.findAll({where: {companyId: id_company}});

        return res.json(all_rental_points);
    }
    async getRentalCategory(req, res){
        const all_rental_category = await RentalCategories.findAll({});
        return res.json(all_rental_category);
    }

    async getRentalStatus(req, res){
        const all_rental_status= await RentalStatuses.findAll({});
        return res.json(all_rental_status);
    }


}

module.exports = new StockController();