const sequelize = require('../config/connection');
const { Replys } = require('../models');

const replyData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  await Replys.bulkCreate(replyData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();