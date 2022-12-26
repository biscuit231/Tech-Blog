const sequelize = require('../config/connection');
const { Users, Posts, Replys } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const replyData = require('./replyData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true

  });

  await Posts.bulkCreate(postData, {
    individualHooks: true,
    returning: true
  });

  await Replys.bulkCreate(replyData, {
    individualHooks: true,
    returning: true
  });


  

  process.exit(0);
};

seedDatabase();
