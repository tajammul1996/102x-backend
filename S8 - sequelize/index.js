/*  
 * bulkCreate (with raw: true)
 * where clause in sequelize
 * attributes
 * find methods - findAll, findOne, findByPk, findOrCreate
 * operators
 */

import { Sequelize, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize("access", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 20]
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: 'na'
  }
}, {
  timestamps: false,
});


// User.bulkCreate([
//   {username: "Johndoe", age: 30},
//   {username: "Janedoe", age: 21},
//   {username: "Davedoe", age: 25},
//   {username: "Alice", age: 30},
//   {username: "Bob", age: 21},
// ]).then(result => console.log(result))
//   .catch(err => console.log(err))


// select * from users where age>30

// User.findAll({ where:{age: 30}, attributes: ['username', 'age'], raw: true })
//   .then(result => console.log(result))
//   .catch(e => console.log(e))

User.findAll({raw: true, attributes: { exclude: ['address']}, where: {user_id: 1} })
  .then(result => console.log(result))
  .catch(e => console.log(e))

// User.findOne({where: { age: 21 }, raw: true })
//   .then(result => console.log(result))
//   .catch(err => console.log(err))


// User.findByPk(11, {raw: true})
//   .then(result => console.log(result))
//   .catch(err => console.log(err))

// age => 25

// User.findAll({
//   where: {
//     username: {
//       [Op.substring]: "ob",
//     },
//   },
//   raw: true,
// })
//   .then((result) => console.log(result))
//   .catch((e) => console.log(e));


// User.findAll({
//   where: {
//     [Op.and]: [{ age: 21 }, { username: "Johndoe" }],
//   }, raw: true
// })
//   .then((result) => console.log(result))
//   .catch((e) => console.log(e));


sequelize.sync({  });

sequelize.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.error("Unable to connect to the database:", err));