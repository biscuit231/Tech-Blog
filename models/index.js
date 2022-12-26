//import models
const Users = require('./Users');
// const Communities = require('./Communities');
const Posts = require('./Posts');
const Replys = require('./Replys');
// const Images = require('./Images');
//const Friends = require('./Friends');


//User and post relationship
Users.hasMany(Posts, {  
    foreignKey: 'post_author',
});

Posts.belongsTo(Users, {  
    foreignKey: 'post_author',
});

//user reply relationsho
Users.hasMany(Replys, {
    foreignKey: 'reply_author',
});

Replys.belongsTo(Users, {   
    foreignKey: 'reply_author',
}); 

//post reply relationship
Posts.hasMany(Replys, { 
    foreignKey: 'post_id',
});

Replys.belongsTo(Posts, {
    foreignKey: 'post_id',
});

//post image relationship

// Posts.hasOne(Images, {
//     foreignKey: 'post_id',
// });

// Images.belongsTo(Posts, {
//     foreignKey: 'post_id',
// });




// Posts.belongsTo(Communities, {
//   foreignKey: 'communities_id'
// });
// Communities.hasMany(Posts, {
//   foreignKey: 'post_id'
// });


// Replys.belongsTo(Posts, {
//   foreignKey: 'post_replys'
// });
// Posts.hasMany(Replys, {
//   foreignKey: 'replys_id'
// });


// Posts.belongsTo(Users, {
//   foreignKey: 'users_id'
// });
// Users.hasMany(Posts, {
//   foreignKey: 'post_id'
// });


// Replys.belongsTo(Users, {
//   foreignKey: ''
// });
// Users.hasMany(Replys, {
//   foreignKey: ''
// });

//user and community relationship
// Communities.hasMany(Users, {
//   foreignKey: 'users_id'
// });

// Users.belongsTo(Communities, {
//   foreignKey: 'communities_id'
// });



module.exports = {
    Users,
    // Communities,
    Posts,
    Replys,
   // Files,
    //Friends,
  };