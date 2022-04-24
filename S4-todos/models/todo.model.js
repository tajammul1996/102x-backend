// import { DataTypes } from "sequelize";
// // import sequelize from "../db-connection";
// import sequelize from "../db-connection.js";

import mongoose from "mongoose";

// const Todo = sequelize.define(
//   "todo",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [5, 15],
//       },
//       unique: true
//     },
//     description: {
//       type: DataTypes.STRING,
//       defaultValue: "na",
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String
})



const Todo = mongoose.model("Todo", TodoSchema)

export default Todo;
