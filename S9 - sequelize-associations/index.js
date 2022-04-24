import { Sequelize, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize("associations", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

// 2 tables - users and orders
const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [4, 12]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: "-"
  }
}, {
  timestamps: false
})

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_details: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["userId"]
    }
  ]
})

User.findOne({where: { id: 1 }, include: [{model: Order}]}).then(res => res.toJSON()).then(console.log).catch(console.log)

User.hasOne(Order, {onDelete: 'CASCADE', unique: true})
Order.belongsTo(User)

// Order.create({
//   userId: 1,
//   order_details: "burger"
// }).then(console.log).catch(console.error)
// User.create({ username:  "tajammul", email: "test@test.com", age: 30 })
// .then(user => {
//   return user.createOrder({
//     order_details: "pizza"
//   })
// }).then(console.log).catch(console.error)

sequelize.sync({});
sequelize.authenticate().then(() => console.log("db authenticated!")).catch(err => console.log(err));