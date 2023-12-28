const {ComputerModels, ListComponent, ComputerComponents} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require("uuid");
const path = require("path");

class ComputerModelsController {
    async getAllComputerModels(req, res) {
        let {modelName, price, page, limit} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit -limit
        let computerModels;
        if (modelName && price){
            computerModels = await ComputerModels.findAndCountAll({where: {modelName, price}, limit, offset})
        }
        if(!modelName && price){
            computerModels = await ComputerModels.findAndCountAll({where:{price}, limit, offset})
        }
        if(modelName && !price){
            computerModels = await ComputerModels.findAndCountAll({where:{modelName}, limit, offset})
        }
        if (!modelName && !price){
            computerModels = await ComputerModels.findAndCountAll({limit, offset})
        }
        return res.json(computerModels)
    }

    async getOneComputerModels(req, res) {
        const { id } = req.params;

        return ComputerModels.findByPk(id)
            .then((model) => {
                if (!model) {
                    return res.status(404).json({ error: 'Computer model not found' });
                }

                return res.json(model);
            });
    }

    async createComputerModels(req, res) {
        const {modelName, specifications, price, modelDiscount} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '..', "static", fileName))

        const computerModels = await ComputerModels.create({modelName, img: fileName, specifications, price, modelDiscount})
        return res.json(computerModels)
    }

    async updateComputerModel(req, res) {
        const { id } = req.params;
        const updates = req.body;

        const [updatedRowsCount, updatedModels] = await ComputerModels.update(updates, {
            where: { modelId: id },
            returning: true,
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Computer model not found' });
        }

        return res.json(updatedModels[0]);
    }

    async deleteComputerModel(req, res) {
        const { id } = req.params;

        const deletedRowsCount = await ComputerModels.destroy({
            where: { modelId: id },
        });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 'Computer model not found' });
        }

        return res.json({ message: 'Computer model deleted successfully' });
    }
}

module.exports = new ComputerModelsController();