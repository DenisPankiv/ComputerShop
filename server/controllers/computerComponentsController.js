const uuid = require('uuid')
const path = require('path')
const {ComputerComponents, ComputerModels} = require('../models/models')

class ComputerComponentsController {
    async getAllComputerComponents(req, res) {
        let {componentName, price, page, limit} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit -limit
        let computerComponents;
        if (componentName && price){
            computerComponents = await ComputerComponents.findAndCountAll({where: {componentName, price}, limit, offset})
        }
        if(!componentName && price){
            computerComponents = await ComputerComponents.findAndCountAll({where:{price}, limit, offset})
        }
        if(componentName && !price){
            computerComponents = await ComputerComponents.findAndCountAll({where:{componentName}, limit, offset})
        }
        if (!componentName && !price){
            computerComponents = await ComputerComponents.findAndCountAll({limit, offset})
        }
        return res.json(computerComponents)
    }
    async getOneComputerComponents(req, res) {
        const { id } = req.params;

        return ComputerComponents.findByPk(id)
            .then((component) => {
                if (!component) {
                    return res.status(404).json({ error: 'Computer component not found' });
                }

                return res.json(component);
            });
    }

    async createComputerComponents(req, res) {
        const {componentName, description, price} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '..', "static", fileName))

        const computerComponents = await ComputerComponents.create({componentName, img: fileName, description, price})
        return res.json(computerComponents)
    }

    async updateComputerComponents(req, res){

    }
    async deleteComputerComponents(req, res){

    }
}

module.exports = new ComputerComponentsController();