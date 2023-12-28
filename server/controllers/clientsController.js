const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Clients, Orders} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class ClientsController {
    async registration(req, res, next) {

        const { name, email, password, role, address, phone } = req.body
        if( !email || !password ){
            return next(ApiError.badRequest('Неправильно введено email або пароль!'))
        }
        const candidate = await Clients.findOne({ where: { email } });
        if (candidate){
            return next(ApiError.badRequest('Користувач з таким email вже існує'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const clients = await Clients.create({email, role, password: hashPassword, name, address, phone})
        const orders = await Orders.create({clientId: clients.id})
        const token = generateJwt(clients.id, clients.email, clients.role)
        return res.json({token});

    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const clients = await Clients.findOne({ where:  {email}  });
        if (!clients) {
            return next(ApiError.internal('Користувача не знайдено'));
        }
        let comparerPassword = bcrypt.compareSync(password, clients.password);
        if (!comparerPassword) {
            return next(ApiError.internal('Вказаний пароль невірний'));
        }
        const token = generateJwt(clients.id, clients.email, clients.role);
        return res.json({ token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.clients.id, req.clients.email, req.clients.role)
        return res.json({token})
    }

    updateClient(req, res) {

    }

    deleteClient(req, res) {

    }

}

module.exports = new ClientsController()