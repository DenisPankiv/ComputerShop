const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Clients = sequelize.define("clients", {
    clientsId: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},
    address: {type:DataTypes.STRING},
    email: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    phone: {type:DataTypes.STRING, unique: true},
    role: {type:DataTypes.STRING, defaultValue: "USER"},
})

const Orders = sequelize.define("orders", {
    orderId: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type:DataTypes.STRING},
    orderDate: {type:DataTypes.DATE},
    deliveryDate: {type:DataTypes.DATE},
    orderTotal: {type:DataTypes.DECIMAL},
})

const ComputerModels = sequelize.define("computerModels", {
    modelId: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    modelName: {type:DataTypes.STRING},
    img:{type:DataTypes.STRING, allowNull: true},
    specifications: {type:DataTypes.TEXT},
    price: {type:DataTypes.DECIMAL},
    modelDiscount: {type:DataTypes.DECIMAL, allowNull: true},
})

const Branches = sequelize.define("branches", {
    branchId: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    branchName: {type:DataTypes.STRING},
    branchAddress: {type:DataTypes.TEXT},
    contactPerson: {type:DataTypes.STRING},
})

const Workshops = sequelize.define("workshops", {
    workshopId: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    workshopName: {type:DataTypes.STRING},
    workshopAddress: {type:DataTypes.TEXT},
    contactPerson: {type:DataTypes.STRING},
})

const ComponentInventory = sequelize.define("componentInventory", {
    inventoryId: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type:DataTypes.INTEGER},
})

const ComputerComponents = sequelize.define("computerComponents", {
    componentId: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    componentName: {type:DataTypes.STRING, unique: true},
    img:{type:DataTypes.STRING, allowNull: true},
    description: {type:DataTypes.TEXT},
    price: {type:DataTypes.DECIMAL}
})

const ListComponent = sequelize.define("listComponent", {
    listId:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})
const Discounts = sequelize.define("discounts", {
    discountId:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    discount: {type:DataTypes.DECIMAL},
})

Clients.hasOne(Discounts)
Discounts.belongsTo(Clients)

Orders.hasOne(Clients)
Orders.belongsTo(Clients)

Orders.hasOne(Branches)

Orders.hasOne(Workshops)
Workshops.belongsTo(Orders)

Orders.hasMany(ComputerModels)
ComputerModels.belongsTo(Orders)

ComputerModels.hasOne(ListComponent)
ListComponent.belongsTo(ComputerModels)

ComponentInventory.hasOne(Workshops)
ComponentInventory.belongsTo(Workshops)

ComponentInventory.hasMany(ComputerComponents)
ComputerComponents.belongsTo(ComponentInventory)

ListComponent.hasMany(ComputerComponents)
ComputerComponents.belongsTo(ListComponent)

module.exports = {
    Clients,
    Orders,
    ComputerModels,
    Branches,
    Workshops,
    ComponentInventory,
    ComputerComponents,
    ListComponent,
    Discounts
}