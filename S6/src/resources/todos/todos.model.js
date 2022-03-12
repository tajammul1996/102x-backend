const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/db-connection");

const Todo = sequelize.define('todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5,15]     
    }
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: "na"
  }
}, {
  timestamps: false
})

module.exports =  Todo;