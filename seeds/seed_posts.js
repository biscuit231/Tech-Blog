const sequelize = require('../config/connection');
const { Posts } = require('../models');

const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  await Posts.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
