const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Images extends Model {}

Images.init(
  {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
    path: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'images',
  }
);
  module.exports = Images;

// module.exports = (sequelize, DataTypes) => {
//     const Image = sequelize.define("image", {
//       type: {
//         type: DataTypes.STRING,
//       },
//       name: {
//         type: DataTypes.STRING,
//       },
//       data: {
//         type: DataTypes.BLOB("long"),
//       },
//     });
  
//     return Image;
//   };